
const args = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
const path = require('path');

const fs = require('fs');

const { prompt } = require('enquirer');
const { env = {} } = args;

// 不需要单独build的项目列表.
const excludedList = [
  'build', 
  'cfg', 
  'node_modules', 
  'src'
];

const rootProjects = ['config', 'common-deps'];
const getProjectsList = () => {
  return fs
    .readdirSync(path.resolve(__dirname))
    .filter(v => excludedList.indexOf(v) === -1 || !v.startsWith('.'))
    .concat(rootProjects);
};
const isRootProject = project => {
  return rootProjects.indexOf(project) !== -1;
}

const isCommonDeps = project => {
  return project === 'common-deps';
}

const getProject = () => {
  let { project } = env;

  const projects = getProjectsList();

  // 列表中找不到，说明输入错误.
  if (projects.indexOf(project) === -1) {
    project = '';
  }

  return project;
};

const getCmd = project => {
  const { production, cn, port } = env;

  // "start:config": "webpack-dev-server --config ./cfg/webpack.config.dev.js --port 8233",
  // "build:config": "webpack --env.production --config ./cfg/webpack.config.js",

  // "start:navbar": "cd ./navbar/ && webpack-dev-server --config ./cfg/webpack.base.spa.js --port 8235",
  // "build:navbar": "cd ./navbar/ && webpack --env.production --config ./cfg/webpack.base.spa.js",
  const webpack = production
    ? 'webpack --env.production'
    : 'webpack-dev-server';
  const langs = cn ? '--env.cn' : '';
  const isRoot = isRootProject(project);
  
  // config, deps
  if (isRoot) {
    const rootWebpackConfigPath = `./cfg/webpack.${production ? project : `${project}.dev`}.js`;

    const cmd = `${webpack} ${langs} --config ${rootWebpackConfigPath}`;
    return production ? cmd : `${cmd} --port ${port}`;
  }

  const cmd = `cd ./${project}/ && ${webpack} ${langs} --config ./cfg/webpack.base.spa.js`
  return production ? cmd : `${cmd} --port ${port}`;
};

const beforeBuild = async (project) => { };

const afterBuild = async () => { };

const run = async () => {
  const project = getProject();
  console.log('project', project);

  const execCmd = async project => {
    const cmd = getCmd(project);
    console.log('执行的环境是', env);
    console.log('执行的命令是', cmd);

    await beforeBuild(project);

    // 执行命令.
    shell.exec(cmd);

    await afterBuild();
  };

  if (project) {
    execCmd(project);
  } else {
    const projects = getProjectsList();

    prompt({
      type: 'autocomplete',
      name: 'PROJECT',
      message: 'Which project?',
      limit: 40,
      choices: projects
    }).then(response => {
      execCmd(response.PROJECT);
    });
  }
};

run();

// npm run build pwa
// npm run debug pwa

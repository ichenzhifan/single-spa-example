import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/selector/mapState';
import { mapDispatchToProps } from '../../redux/selector/mapDispatch';
import { Link } from '@reach/router';
import links from '../Route';

import { Provider } from 'react-redux';
import rootReducer from '../../redux/reducer';
import createStore from '../../redux/store';
const store = createStore(rootReducer);

import './index.scss';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    return (
      <Fragment>
        {
          this.state.hasError ? (
            <div className='root navbar'>
              Error
            </div>
          ) : (
              <div className='root navbar'>
                {
                  links.map((link) => {
                    return (
                      <Link
                        key={link.href}
                        className='primary-navigation-link'
                        to={link.href}
                      >
                        {link.name}
                      </Link>
                    )
                  })
                }
              </div>
            )
        }
      </Fragment>
    );
  }
}

export default props => {
  return <Provider store={store}>
    <App {...props} />
  </Provider>
};

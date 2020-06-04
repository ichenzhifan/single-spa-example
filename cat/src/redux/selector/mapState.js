import { createSelector } from 'reselect';
import {get} from 'lodash';

const todos = state => {
  console.log(state);
  return get(state, 'todo')
};
const getTodos = createSelector(todos, data => {
  return data;
});

export const mapStateToProps = state => ({
  todos: getTodos(state)
});
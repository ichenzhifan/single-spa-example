import { createSelector } from 'reselect';
import {get} from 'lodash';

const clock = state => get(state, 'clock');
const getClock = createSelector(clock, data => data);

export const mapStateToProps = state => ({
  clock: getClock(state)
});
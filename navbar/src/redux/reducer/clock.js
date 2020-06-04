import Immutable from 'immutable';
import { INCREAM, DECREAM } from '../constants/actionTypes';
import { guid } from '../../common/math';

const initState = 0;

const r = (state = initState, action) => {
  switch (action.type) {
    case INCREAM: {
      return state + 1;
    }
    case DECREAM: {
      return state - 1
    }
    default:
      return state;
  }
};

export default r;

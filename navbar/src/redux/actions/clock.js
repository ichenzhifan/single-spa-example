import { INCREAM, DECREAM } from '../constants/actionTypes';

const incream = () => {
  return {
    type: INCREAM
  };
};

const decream = () => {
  return {
    type: DECREAM
  };
};

export default {
  incream,
  decream
};

import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_REJECTED
} from '../actions/auth'

export default(state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return {...state, authenticated: true};
    case AUTHENTICATE_USER_REJECTED:
      return state;
    default:
      return state;
  }
};

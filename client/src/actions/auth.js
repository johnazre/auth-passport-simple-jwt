import axios from 'axios'

export const AUTHENTICATE_USER_PENDING = 'AUTHENTICATE_USER_PENDING'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_REJECTED = 'AUTHENTICATE_USER_REJECTED'

export const authUser = (credentials) => {
  return async (dispatch) => {
    dispatch({type: AUTHENTICATE_USER_PENDING})
    try {
      let auth = await axios.post(`http://localhost:8000/auth/signin`, credentials)
      console.log('authed', auth)
      dispatch({
        type: AUTHENTICATE_USER_SUCCESS,
        payload: auth.data
      })
    } catch(err) {
      console.log('err', err.message)
      dispatch({
        type: AUTHENTICATE_USER_PENDING,
        err
      })
    }
    // dispatch({
    //   type: AUTHENTICATE_USER_SUCCESS,
    //   payload: auth
    // })
  };
};

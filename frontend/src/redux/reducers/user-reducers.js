import * as actions from "../actions/user-constants"

export const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { loadingUser: true }
    case actions.USER_LOGIN_SUCCESS:
      return { loadingUser: false, userInfo: action.payload }
    case actions.USER_LOGIN_FAILURE:
      return { loadingUser: false, error: action.payload }
    case actions.USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const userRegisterReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return { loadingUser: true }
    case actions.USER_REGISTER_SUCCESS:
      return { loadingUser: false, userInfo: action.payload }
    case actions.USER_REGISTER_FAILURE:
      return { loadingUser: false, error: action.payload }
    case actions.USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const userProfileReducer = (state = { userDetails: null }, action) => {
  switch (action.type) {
    case actions.USER_DETAILS_REQUEST:
      return { ...state, loadingProfile: true }
    case actions.USER_DETAILS_SUCCESS:
      return { loadingProfile: false, userDetails: action.payload }
    case actions.USER_DETAILS_FAILURE:
      return { loadingProfile: false, errorProfile: action.payload }
    case actions.USER_LOGOUT:
      return { userDetails: null }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (
  state = { userProfile: null },
  action
) => {
  switch (action.type) {
    case actions.USER_UPDATE_REQUEST:
      return { loadingProfile: true }
    case actions.USER_UPDATE_SUCCESS:
      return {
        loadingProfile: false,
        success: true,
        userProfile: action.payload,
      }
    case actions.USER_UPDATE_FAILURE:
      return { loadingProfile: false, errorProfile: action.payload }
    case actions.USER_LOGOUT:
      return { userProfile: null }
    default:
      return state
  }
}

export const userVerifyReducer = (state = { isVerified: false }, action) => {
  switch (action.type) {
    case actions.USER_VERIFY_REQUEST:
      return { loading: true }
    case actions.USER_VERIFY_SUCCESS:
      return {
        loading: false,
        isVerified: action.payload.isVerified,
        message: action.payload.message,
      }
    case actions.USER_VERIFY_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

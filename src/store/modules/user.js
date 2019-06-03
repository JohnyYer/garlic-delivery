import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { status: '', userName: '' }

const getters = {
  isProfileLoaded: state => !!state.userName
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    const userName = localStorage.getItem('user-name')
    commit(USER_REQUEST)

    if (userName) {
      commit(USER_SUCCESS, userName)
    } else {
      commit(USER_ERROR)
      dispatch(AUTH_LOGOUT)
    }
  }
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, userName) => {
    state.status = 'success'
    state.userName = userName
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.userName = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

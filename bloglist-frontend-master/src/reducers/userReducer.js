import userService from '../services/user'

const initialState = []

const initUsersAction = (users) => {
    return {
        type: 'INIT_USERS',
        data: users
    }
}

export const initUsers = (token) => {
    return async dispatch => {
        userService.setToken(token)
        const users = token ? await userService.getAll() : []
        dispatch(initUsersAction(users))
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
  }
  
  export default reducer
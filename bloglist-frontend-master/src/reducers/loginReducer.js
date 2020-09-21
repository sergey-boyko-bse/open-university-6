import loginService from '../services/login'

const initialState = null

const loginAction = (user) => {
    return {
        type: 'LOGIN',
        data: user
    }
}

const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(loginAction(user))
    }
}

export const logoutUser = () => {
    return async dispatch => {     
        await loginService.logout()
        dispatch(logoutAction())
    }
}

export const initUser = () => {
    return async dispatch => {     
        const user = loginService.getUser()        
        if(user) {
            dispatch(loginAction(user))
        }
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
  }
  
  export default reducer
const initialState = {
    type: null,
    message: null,
    prevTimeoutId: null
}
  
const showNotificationAction = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: notification
    }
}

const setPrevClearNotificationAction = (prevTimeoutId) => {
    return {
      type: 'SET_PREV_CLEAR_NOTIFICATION',
      data: prevTimeoutId
    }
}

const clearNotificationAction = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const showNotification = (notification) => {
    return async dispatch => {      
      dispatch(showNotificationAction(notification))
    }
}

export const clearNotification = (timeout) => {
    return async dispatch => {
      const prevTimeoutId = setTimeout(() => {
        dispatch(clearNotificationAction())
      }, timeout * 1000)
      dispatch(setPrevClearNotificationAction(prevTimeoutId))
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                message: action.data.message,
                type: action.data.type
            }
        case 'SET_PREV_CLEAR_NOTIFICATION':
            if(state.prevTimeoutId) {
                window.clearTimeout(state.prevTimeoutId)
            }            
            return {
                ...state,
                prevTimeoutId: action.data
            }
        case 'CLEAR_NOTIFICATION':
            return initialState   
        default:
            return state
    }
  }
  
  export default reducer
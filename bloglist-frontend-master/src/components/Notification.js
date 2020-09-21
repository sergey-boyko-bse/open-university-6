import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification || !notification.message) {
        return null
    }

    return (
        <div className={`message message-${notification.type}`}>
            {notification.message}
        </div>
    )
}

export default Notification
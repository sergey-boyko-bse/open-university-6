import React from 'react'

const UserInfo = ({ user, logout }) => {
    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default UserInfo
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const Users = () => {
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => 
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{blogs.filter(x => x.user.id === user.id).length}</td>
                            </tr>
                        )
                    }                    
                </tbody>
            </table>
        </div>
    )
}

export default Users
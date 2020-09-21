import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom"
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { initUser, loginUser, logoutUser } from './reducers/loginReducer'
import './App.css'
import Container from '@material-ui/core/Container'

const App = () => {
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const login = async (credentials) => {
        dispatch(loginUser(credentials))
    }

    const logout = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        dispatch(initUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(initBlogs(user ? user.token : null))
        dispatch(initUsers(user ? user.token : null))
    }, [user, dispatch])

    const matchUser = useRouteMatch('/users/:id')
    const selectedUser = matchUser ? users.find(x => x.id === matchUser.params.id) : null
    const selectedUserBlogs = matchUser ? blogs.filter(x => x.user.id === matchUser.params.id) : null
    const matchBlog = useRouteMatch('/blogs/:id')
    const selectedBlog = matchBlog ? blogs.find(x => x.id === matchBlog.params.id) : null

    return (
        <Container>
            <Notification />            
            {user
                ? <div>
                    <Header user={user} logout={logout} />
                    <Switch>
                        <Route path="/users/:id">
                            <User user={selectedUser} blogs={selectedUserBlogs} />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/blogs/:id">
                            <Blog blog={selectedBlog} />
                        </Route>
                        <Route path="/">
                            <Blogs />
                        </Route>
                    </Switch>
                </div>
                : <div>
                    <h2>Log in to application</h2>
                    <LoginForm login={login} />
                </div>
            }            
        </Container>
    )
}

export default App
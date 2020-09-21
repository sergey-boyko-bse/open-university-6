import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}))

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await login({ username, password })
            setUsername('')
            setPassword('')
        } catch (error) {
            const notification = {
                message: 'Wrong username or password',
                type: 'error'
            }
            handleNotification(notification)
        }
    }

    const handleNotification = (notification) => {
        dispatch(showNotification(notification))
        dispatch(clearNotification(5))
    }

    return (
        <form className={classes.root} onSubmit={handleLogin}>
            <div>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput id="username" value={username} onChange={({ target }) => setUsername(target.value)} label="Username" />
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} label="password" />
                </FormControl>
            </div>
            <Button id="login-button" variant="outlined" color="primary" type="submit">login</Button>   
        </form>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

export default LoginForm
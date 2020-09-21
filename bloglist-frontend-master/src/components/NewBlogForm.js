import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
}))

const NewBlogForm = ({ onAddBlog }) => {
    const [ title, setTitle] = useState('')
    const [ author, setAuthor] = useState('')
    const [ url, setUrl] = useState('')

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleNotification = (notification) => {
        dispatch(showNotification(notification))
        dispatch(clearNotification(5))
    }

    const add = async (event) => {
        event.preventDefault()
        let notification
        try {
            const newBlog = { title, author, url }
            dispatch(createNewBlog(newBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            if(onAddBlog) {
                onAddBlog()
            }
            notification = {
                message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
                type: 'success'
            }
        } catch (error) {
            notification = {
                message: error.message,
                type: 'error'
            }            
        }
        handleNotification(notification)
    }

    return (
        <div>
            <form className={classes.root} onSubmit={add}>
                <div>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <OutlinedInput id="title" value={title} onChange={(event) => setTitle(event.target.value)} label="Title" />
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="author">Author</InputLabel>
                        <OutlinedInput id="author" value={author} onChange={(event) => setAuthor(event.target.value)} label="Author" />
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="url">Url</InputLabel>
                        <OutlinedInput id="url" value={url} onChange={(event) => setUrl(event.target.value)} label="Url" />
                    </FormControl>
                </div>
                <div>
                    <Button id="login-button" variant="outlined" color="primary" type="submit">Add</Button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm
import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { likeExistingBlog, deleteExistingBlog, addCommentToBlog } from '../reducers/blogReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

    const dispatch = useDispatch()

    const handleNotification = (notification) => {
        dispatch(showNotification(notification))
        dispatch(clearNotification(5))
    }

    const like = async () => {        
        let notification
        try {
            await dispatch(likeExistingBlog(blog))
            notification = {
                message: `${blog.title} liked`,
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

    const addComment = async (event) => {
        event.preventDefault()
        let notification
        const comment = event.target.comment.value
        event.target.comment.value = ''
        try {
            await dispatch(addCommentToBlog(blog, comment))
            notification = {
                message: `Comment ${comment} added`,
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

    const removeBlog = async (blogToRemove) => {
        if (window.confirm(`Remove blog ${blogToRemove.title}?`)) {
            let notification
            try {
                await dispatch(deleteExistingBlog(blogToRemove))
                notification = {
                    message: `${blogToRemove.title} deleted`,
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
    }

    const commentFormStyle = {
        display: 'flex',
        flexDirection: 'row'
    }

    if(!blog) {
        return null
    }

    return (
        <div className='blog'>
            <h2>{blog.title}</h2>
            <div>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>
                    {blog.likes} likes
                    <Button variant="outlined" color="primary" onClick={like}>Like</Button>
                </div>
                <div>added by {blog.user.name}</div>
            </div>
            <h2>comments</h2>
            <form style={commentFormStyle} onSubmit={addComment}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="comment">Comment</InputLabel>
                    <OutlinedInput id="comment" label="Comment" />
                </FormControl>
                <Button variant="outlined" color="primary" type="submit">Add comment</Button>
            </form>
            {blog.comments && 
                <ul>
                    {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
                </ul>
            }
        </div>
    )
}

export default Blog

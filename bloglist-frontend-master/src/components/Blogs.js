import React, { useRef } from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

const Blogs = () => {
    const blogFormRef = useRef()

    const onAddBlog = async () => {
        blogFormRef.current.toggleVisibility()
    }

    return (
        <div>
            <Togglable buttonLabel='create new' ref={blogFormRef}>
                <h2>create new</h2>
                <NewBlogForm onAddBlog={onAddBlog} />
            </Togglable>
            <BlogList />
        </div>
    )
}

export default Blogs
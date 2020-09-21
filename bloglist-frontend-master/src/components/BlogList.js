import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    const blogStyle = {
        paddingTop: 10
    }

    return (
        <div className='blog-list'>
            {blogs.map(blog =>
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            )}
        </div>
    )
}

export default BlogList
import blogService from '../services/blogs'

const initialState = []

const initBlogsAction = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

const createNewBlogAction = (newBlog) => {
    return {
        type: 'CREATE_NEW_BLOG',
        data: newBlog
    }
}

const likeBlogAction = (blog) => {
    return {
        type: 'LIKE_BLOG',
        data: blog
    }
}

const deleteBlogAction = (blog) => {
    return {
        type: 'DELETE_BLOG',
        data: blog
    }
}

const addCommentToBlogAction = (blog) => {
    return {
        type: 'COMMENT_BLOG',
        data: blog
    }
}

export const initBlogs = (token) => {
    return async dispatch => {
        blogService.setToken(token)
        const blogs = token ? await blogService.getAll() : []
        dispatch(initBlogsAction(blogs))
    }
}

export const createNewBlog = (newBlog) => {
    return async dispatch => {
        const createdBlog = await blogService.createOne(newBlog)
        dispatch(createNewBlogAction(createdBlog))
    }
}

export const likeExistingBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.updateOne(blog.id, { ...blog, likes: blog.likes + 1 })
        dispatch(likeBlogAction(updatedBlog))
    }
}

export const deleteExistingBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteOne(blog.id)
        dispatch(deleteBlogAction(blog))
    }
}

export const addCommentToBlog = (blog, comment) => {
    return async dispatch => {
        const updatedBlog = await blogService.updateOne(blog.id, { ...blog, comments: [...blog.comments, comment] })
        dispatch(addCommentToBlogAction(updatedBlog))
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_NEW_BLOG':
            return [ ...state, action.data ]
        case 'LIKE_BLOG':
        case 'COMMENT_BLOG':
            return state.map(x => x.id === action.data.id ? action.data : x)
        case 'DELETE_BLOG':
            return state.filter(x => x.id !== action.data.id)
        default:
            return state
    }
  }
  
  export default reducer
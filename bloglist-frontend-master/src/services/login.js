import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    const user = response.data
    window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
    )
    return user
}

const logout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
}

const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
    }

    return undefined
}

export default { login, logout, getUser }
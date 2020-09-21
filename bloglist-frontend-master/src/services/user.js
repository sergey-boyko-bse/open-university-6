import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data.sort((a, b) => b.likes - a.likes)
}

export default { getAll, setToken }
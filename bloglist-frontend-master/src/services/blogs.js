import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data.sort((a, b) => b.likes - a.likes)
}

const createOne = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const updateOne = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl }/${id}`, newObject)
    return response.data
}

const deleteOne = async id => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${ baseUrl }/${id}`, config)
    return response.data
}

export default { getAll, createOne, updateOne, deleteOne, setToken }
import axios from 'axios'
import Cookies from 'js-cookie'

const httpClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
})

httpClient.interceptors.request.use((config) => {
    const token = Cookies.get('authorization')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default httpClient

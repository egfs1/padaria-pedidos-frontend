import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://192.168.15.20:4000'
})
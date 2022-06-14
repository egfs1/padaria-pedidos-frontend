import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://192.168.15.20:4000'
})
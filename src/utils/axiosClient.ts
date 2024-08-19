import axios from 'axios'
import { baseURL } from './constants'

export const axiosClient = axios.create({ baseURL })

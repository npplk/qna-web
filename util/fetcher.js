import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api' // http://localhost:8080
    : `/api` // http://ec2-52-221-242-21.ap-southeast-1.compute.amazonaws.com/

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }

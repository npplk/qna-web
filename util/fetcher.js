import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api' // http://localhost:8080
    : `/api` // http://ec2-13-229-119-28.ap-southeast-1.compute.amazonaws.com

const publicFetch = axios.create({
  baseURL
})

export { publicFetch, baseURL }

import axios from 'axios'

export interface Response<T = any> {
  code: number;
  msg: string;
  data: T
}

const domain = 'https://tapi.gaming-panda.com'

const req = axios.create({
  baseURL: `${domain}/demo/gmp`,
  timeout: 10 * 1000,
})

req.interceptors.response.use(
  (response) => {
    const { data } = response
    if(data && data.code === 0) {
      return response
    } else {
      return Promise.reject(data)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default req
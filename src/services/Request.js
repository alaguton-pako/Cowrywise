import axios from 'axios'
export default async (method, endpoint, queryParams = {}) => {
  let res
  const instance = axios.create({
    baseURL: `https://api.unsplash.com/`
  })
  try {
    const url = `/${endpoint}`
    res = await instance[method](url, {
      params: queryParams
    })
  } catch (error) {
    if (error.response) {
      res = error.response
    }
  }
  return res
}

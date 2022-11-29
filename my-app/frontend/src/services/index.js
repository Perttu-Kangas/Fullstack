import axios from 'axios'
const baseUrl = '/api/'

const getVisits = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getVisits }
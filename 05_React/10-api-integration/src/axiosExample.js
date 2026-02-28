// Axios example (install first: npm i axios)
import axios from 'axios'

export async function fetchUsersWithAxios() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
}

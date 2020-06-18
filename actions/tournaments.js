import axios from 'axios'

export default async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/majors/${id}`) // eslint-disable-line no-undef

  return data
}

import axios from 'axios'

export default async () => {
  const { data } = await axios.get(`${API_BASE_URL}/majors/1`) // eslint-disable-line no-undef

  return data
}

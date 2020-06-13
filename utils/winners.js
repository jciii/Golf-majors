import Axios from "axios"

import axios from 'axios'

export const filteredWinners = (list, term) => list.filter(winner => (
  winner.nameFirst.toLowerCase().includes(term.toLowerCase())
))

export const retrieveMasters = async () => {
  const { data } = await axios.get('http://localhost:1337/api/masters')

  return data
}
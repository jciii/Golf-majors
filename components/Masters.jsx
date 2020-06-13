import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import { filteredWinners, retrieveMasters } from '../utils/winners'

export default () => {
  const [state, setState] = useState('')
  const [masters, setMasters] = useState([])
  const [filteredMastersWinners, setFilteredMastersWinners] = useState([])

  useEffect(() => {
    async function pullData() {
      const { data } = await axios.get('http://localhost:1337/api/masters')

      setMasters(data)
      setFilteredMastersWinners(data)
    }
    pullData()
  }, [])
  useEffect(() => {
    const filtered = filteredWinners(masters, state)
    setFilteredMastersWinners(filtered)
  }, [state])

  return (
    <>
      <div className="page">
        <div className="subtitle">Searchable List of Masters Winners from 1988 to Present</div>
        <Search term={state} setter={setState} />
        {
          filteredMastersWinners.map(master => (<div>{`${master.years.map(winner => (`${winner.winner.nameFirst} 
          ${winner.winner.nameLast}`))}`}</div>))
        }
        <button type="button" onClick={() => { setState('') }}>Clear</button>
      </div>
    </>
  )
}

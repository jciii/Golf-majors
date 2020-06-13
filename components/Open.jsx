import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default () => {
  const [state, setState] = useState('')
  const [opens, setOpen] = useState([])

  useEffect(() => {
    async function pullData() {
      const { data } = await axios.get('http://localhost:1337/api/open')

      setOpen(data)
    }
    pullData()
  }, [opens])

  return (
    <>
      <div className="page">
        <div className="subtitle">Searchable List of Open Champions from 1988 to Present</div>
        <input type="text" name="search" onChange={(event) => { setState(event.target.value) }} value={state} />
        {
          opens.map(open => (<div>{`${open.years.map(winner => (`${winner.winner.nameFirst} 
          ${winner.winner.nameLast}`))}`}</div>))
        }
        <button type="button" onClick={() => { setState('') }}>Clear</button>
      </div>
    </>
  )
}

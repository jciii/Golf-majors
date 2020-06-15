import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import { retrievePga } from '../utils/Winners'

export default () => {
  const [state, setState] = useState([])

  useEffect(() => {
    async function pullData() {
      const pgaData = await retrievePga()
      setState(pgaData)
    }
    pullData()
  }, [])

  return (
    <>
      <Page>
        <Title />
i am  dirty and broken
  {
          state.map(pga => (<div>{`${pga.years.map(champ => `Winner: ${champ.winner.nameFirst}
          ${champ.winner.nameLast}
            score: ${champ.score}
            course: ${champ.course} `)}`}</div>))
        }
      </Page>
    </>
  )
}

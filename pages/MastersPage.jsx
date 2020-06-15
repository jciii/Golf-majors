import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import { retrieveMasters } from '../utils/Winners'

export default () => {
  const [state, setState] = useState([])

  useEffect(() => {
    async function pullData() {
      const mastersData = await retrieveMasters()
      setState(mastersData)
    }
    pullData()
  }, [])

  return (
    <>
      <Page>
        <Title />

i am  dirty and broken
                {
          state.map(master => (<div>{`${master.years.map(champ =>
            `Winner: ${champ.winner.nameFirst} ${champ.winner.nameLast}
            score: ${champ.score}
            course: ${champ.course} `)}`}</div>))
        }
      </Page>
    </>
  )
}

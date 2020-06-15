import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import { retrieveUsOpen } from '../utils/Winners'

export default () => {
  const [state, setState] = useState([])

  useEffect(() => {
    async function pullData() {
      const usOpenData = await retrieveUsOpen()
      setState(usOpenData)
    }
    pullData()
  }, [])

  return (
    <>
      <Page>
        <Title />
i am  dirty and broken
                {
          state.map(usa => (<div>{`${usa.years.map(champ =>
            `Winner: ${champ.winner.nameFirst} ${champ.winner.nameLast}
            score: ${champ.score}
            course: ${champ.course} `)}`}</div>))
        }
      </Page>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { retriveMajors } from '../utils/Winners'
import Major from '../components/major'
import Page from '../components/Page'
import Title from '../components/Title'


export default () => {
  const [major, setMajor] = useState([])

  useEffect(() => {
    async function pullData() {
      const gotMajors = await retriveMajors()

      setMajor(gotMajors)
    }
    pullData()
  }, [])

  return (
    <>
      <Page>
        <Title />
        {
          major.map(tourny => (<Major key={tourny.id} nameMajor={tourny.major} tournyId={tourny.id} />))
        }
      </Page>
    </>
  )
}

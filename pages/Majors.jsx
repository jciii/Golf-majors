import React, { useEffect, useState } from 'react'
import Major from '../components/Major'
import Page from '../components/Page'
import Title from '../components/Title'
import retrieveMajors from '../utils/majors'

export default () => {
  const [major, setMajor] = useState([])

  useEffect(() => {
    async function pullData() {
      const gotMajors = await retrieveMajors()
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

import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Page from '../components/Page'
import Title from '../components/Title'
import Results from '../components/results'
import Search from '../components/Search'
import SubTitle from '../components/SubTitle'
import { retrieveMasters, filteredName } from '../utils/Winners'

export default () => {
  const [state, setState] = useState('')
  const [golfList, setGolfList] = useState([])
  const [filteredGolfers, setFilteredGolfersList] = useState([])

  useEffect(() => {
    async function pullData() {
      const mastersData = await retrieveMasters()
      setGolfList(mastersData)
      setFilteredGolfersList(mastersData)
    }
    pullData()
  }, [])

  useEffect(() => {

    const filtered = filteredName(golfList, state)
    setFilteredGolfersList(filtered)
  }, [state])

  return (
    <>
      <Page>
        <Title />
        <SubTitle />
        <Search term={state} setter={setState} />
        <Button state={setState} />
        {
          filteredGolfers.map(golf => (golf.years.map(champ => (<Results key={champ.id} id={champ.id} year={champ.year} firstName={champ.winner.nameFirst} lastName={champ.winner.nameLast} course={champ.course} score={champ.score} />))))
        }

      </Page>
    </>
  )
}

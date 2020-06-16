import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import Results from '../components/results'
import Search from '../components/Search'
import Button from '../components/Button'
import SubTitle from '../components/SubTitle'
import Error from '../components/Error'
import { retrieveUsOpen, filteredName } from '../utils/Winners'

export default () => {
  const [state, setState] = useState('')
  const [golfList, setGolfList] = useState([])
  const [filteredGolfers, setFilteredGolfersList] = useState([])

  useEffect(() => {
    async function pullData() {
      const usOpenData = await retrieveUsOpen()
      setGolfList(usOpenData)
      setFilteredGolfersList(usOpenData)
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
        <Button state={setState} listReset={setGolfList} />
        <br />
        ^^^^i am  dirty and broken ^^^^^
          {
          golfList
            ? (
              <>
                {filteredGolfers.map(golf => (golf.years.map(champ =>
                  (<Results key={champ.id} id={champ.id} year={champ.year} firstName={champ.winner.nameFirst} lastName={champ.winner.nameLast} course={champ.course} score={champ.score} />))))
                }
              </>
            )
            : <Error />
        }
      </Page>
    </>
  )
}


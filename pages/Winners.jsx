import React, { useEffect, useState } from 'react'
import GoBack from '../components/GoBack'
import Page from '../components/Page'
import Results from '../components/results'
import Search from '../components/Search'
import SubTitle from '../components/SubTitle'
import Title from '../components/Title'
import { retrieveYears, filterByGolfer } from '../utils/winners'

export default ({ location }) => {
  const [state, setState] = useState('')
  const [yearList, setYearList] = useState([])
  const [filteredYears, setFilteredYearList] = useState([])

  useEffect(() => {
    async function pullData() {
      const years = await retrieveYears(location)

      setYearList(years)
      setFilteredYearList(years)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterByGolfer(yearList, state)

    setFilteredYearList(filtered)
  }, [state])

  return (
    <>
      <Page>
        <Title />
        <SubTitle />
        <Search term={state} setter={setState} />
        {
          filteredYears.map(year => (
            <Results
              key={year.id}
              id={year.id}
              year={year.year}
              firstName={year.winner.nameFirst}
              lastName={year.winner.nameLast}
              course={year.course}
              score={year.score}
            />
          ))
        }
        <GoBack />
      </Page>
    </>
  )
}

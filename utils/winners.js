import fetchTournament from '../actions/tournaments'

export const getIdFromLocation = location => (location && location.pathname
  ? location.pathname.split('/winners/').pop()
  : ''
)

export const retrieveYears = async (location) => {
  const id = getIdFromLocation(location)

  const masters = await fetchTournament(id)

  return masters.years
}

export const filterByGolfer = (yearList, name) => yearList.filter(year => (
  year.winner.nameFirst.toLowerCase()
    .includes(name.toLowerCase())
) || year.winner.nameLast.toLowerCase()
  .includes(name.toLowerCase()))

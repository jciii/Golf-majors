import fetchMasters from '../actions/masters'
import fetchMajors from '../actions/majors'
import fetchOpens from '../actions/opens'
import fetchPga from '../actions/Pga'
import fetchUsOpens from '../actions/usOpens'

export const retriveMajors = async () => {
  const majors = await fetchMajors()

  return majors
}

export const retrieveMasters = async () => {
  const masters = await fetchMasters()

  return masters
}

export const retrieveOpens = async () => {
  const opens = await fetchOpens()

  return opens
}

export const retrievePga = async () => {
  const Pgas = await fetchPga()

  return Pgas
}

export const retrieveUsOpen = async () => {
  const UsOpens = await fetchUsOpens()

  return UsOpens
}

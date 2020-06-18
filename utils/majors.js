import fetchMajors from '../actions/majors'

export default async () => {
  const majors = await fetchMajors()

  return majors
}

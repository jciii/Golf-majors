import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Team = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`
const Link = styled(NavLink)`
  text-decoration: none;
`

export default ({ tournyId, nameMajor }) => (
  <>
    <Team key={tournyId}>
      <Link to={`/majors/${tournyId}`}>{`${nameMajor} ${tournyId}`}</Link>
    </Team>
  </>
)

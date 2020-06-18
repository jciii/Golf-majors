import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Tourn = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`

const Link = styled(NavLink)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  font-family: Helvetica, Arial, sans-serif;

  &:hover {
    text-decoration: none;
  }
  &.active {
    color: red;
  }
`

export default ({ tournyId, nameMajor }) => (
  <>
    <Tourn key={tournyId}>
      <Link to={`/winners/${tournyId}`}>{`${nameMajor}`}</Link>
    </Tourn>
  </>
)

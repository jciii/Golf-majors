import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


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

export default () => (
  <Link to="/">&lt;&lt; Back to the Tee Box</Link>
)

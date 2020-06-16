import React from 'react'
import Page from '../components/Page'
import styled from 'styled-components'

const Error = styled.div`
  font-size: 20px;
  text-align: center;
`

export default () => (
  <>
    <Page />
    <Error>Swing and a miss try a different first name...</Error>

  </>
)
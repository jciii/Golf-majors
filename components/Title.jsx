import React from 'react'
import styled from 'styled-components'
import Dude from './Dude'

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`
export default () => (
  <>
    <Dude />
    <Title> The Mens Golf Majors </Title>
  </>
)

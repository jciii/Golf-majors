import React from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

export default ({ term, setter }) => (
  <Input placeholder='First Names Only' type="text" name="search" value={term} onChange={event => setter(event.target.value)} />
)

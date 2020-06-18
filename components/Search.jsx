import React from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
  size: props.size || '1em',
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`
Button.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
}


export default ({ term, setter }) => (
  <>
    <Input
      placeholder="First Names Only"
      type="text"
      name="search"
      value={term}
      onChange={event => setter(event.target.value)}
    />
    <Button type="button" onClick={() => setter('')}>Clear</Button>
  </>
)

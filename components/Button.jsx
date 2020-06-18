import React from 'react'
import styled from 'styled-components'

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

export default ({ useState }) => (
  <>
    <Button type="button" onClick={(useState)}>Clear</Button>
  </>
)

// Cannot get it to reset state. further work needed

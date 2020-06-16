import React from 'react'
import styled from 'styled-components'



export default ({ id, year, firstName, lastName, course, score }) => (
  <p key={id}>
    {`Year: ${year}`} <br /> {`Winner: ${firstName} ${lastName}`}< br />  {`Course: ${course}`} <br /> {`score: ${score}`}

  </p>
)
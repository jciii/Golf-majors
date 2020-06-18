import React from 'react'
// import styled from 'styled-components'

export default (
  {
    id,
    year,
    firstName,
    lastName,
    course,
    score,
  }) => (
    <>
      <p key={id}>
        {`Year: ${year}`}
        <br />
        {`Winner: ${firstName} ${lastName}`}
        <br />
        {`Course: ${course}`}
        <br />
        {`score: ${score}`}
      </p>
    </>
  )

// Don't know Why esLint hates this spacing but it is bouncing back and forth...

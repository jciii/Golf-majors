import React from 'react'
import styled from 'styled-components'
import Dude from '../img/dude.jpg'

const Image = styled.img`
width: 85%;
border-radius: 10px;
margin: 15px;
verticle-align: middle;
`
export default () => (
  <>
    <Image src={Dude} alt="4 Major Trophies" />
  </>
)

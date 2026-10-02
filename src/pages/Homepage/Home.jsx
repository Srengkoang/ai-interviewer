import React from 'react'
import Container from './Container'
import Process from './Process'
import Start from './Start'
import Benefit from './Benefit'

const Home = () => {
  return (
    <>
      <Container>
        <h1>Home Page</h1>
      </Container>
      <Process />
      <Start />
      <Benefit />
    </>
  )
}

export default Home
import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../Components/Header/Header'
import { useLoaderData } from 'react-router-dom'
import TopRated from '../../Components/TopRated/TopRated';

function Home(props) {
  const arts=useLoaderData();

  return (
  <>
  <Header arts={arts}></Header>
  <TopRated arts={arts}></TopRated>
  </>
  )
}

Home.propTypes = {}

export default Home

import {React,useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Banner from './Banner'

function Header({arts}) {

  // const [index,setIndex]= useState(0);
  // const [bgImg,setBgImg]=useState('');

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % arts.length); 
  //       setBgImg(arts[index]);
  //     }, 10000); 
  
  //     return () => clearInterval(interval);
  //   }, [arts.length]);


  return (
  <div className='header h-svh p-8'>
      <Banner arts={arts}></Banner>
  </div>
  )
}

Header.propTypes = {}

export default Header

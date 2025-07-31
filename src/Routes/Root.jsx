import {React,useContext} from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import { AuthContext } from '../Authprovider';
import { IoMoon,IoSunnySharp  } from "react-icons/io5";
import star from '../../public/star.png';
import sunny from '../../public/sunny.png'

function Root(props) {

  const {setIsLoading,isLoading,themeToggle,setThemeToggle}=useContext(AuthContext);

  const themeStyle={
    backgroundImage:`url(${themeToggle?star:sunny})`
  }



const handleTheme=()=>{
  setThemeToggle(!themeToggle);
}

  return (
    <div className={`relative p-[2px] transition-all min-h-dvh duration-500 origin-bottom ${themeToggle?'bg-[var(--color-dark)] text-[var(--color-md-light)]':'bg-[var(--color-light)] text-[var(--color-md-dark)]'}`}>
          <div style={themeStyle} className={`theme-slider cursor-pointer right-4 top-4 rounded-lg transition-all duration-1000 h-[70px] bg-no-repeat bg-cover fixed border-2 `} onClick={handleTheme} >
            <span className={` h-4 text-xl flex ${themeToggle&&'translate-y-[calc(400%-1rem-6px)]'} py-1 rounded-lg  transition-all duration-500`}>
               {themeToggle?<IoMoon className='text-blue-300'/>:<IoSunnySharp className='text-yellow-300'/>}
              
              
             </span>
          </div>
      {
        isLoading && ' LLLLLLLLLLLLLLLLLLL'
      } 

 <Navbar themeToggle={themeToggle}></Navbar>
<Outlet></Outlet>

    </div>
  )
}

Root.propTypes = {}

export default Root

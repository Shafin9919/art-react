import {React,useContext} from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Authprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgProfile } from "react-icons/cg";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';

function Navbar({themeToggle}) {

const {user,userSignOut,isLoading}=useContext(AuthContext);

const handleSignOut=()=>{
  userSignOut().then(()=>
    toast('🦄 Wow so easy!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     
      })
  )
}

console.log(user)
  return ( 
<>

<nav className={`w-[90dvw] mx-auto flex items-center gap-16 p-1 transition-all duration-500 ${!themeToggle?'bg-[var(--color-md-light)] text-[var(--color-md-dark)]':'bg-[var(--color-md-dark)] text-[var(--color-dark)]'}  rounded-lg `}>
    <div className="logo-container w-fit">
      <NavLink to={'/'}><h2 style={{'--border-right':`${themeToggle?'black':'white'}`}} className='logo'>A&C</h2></NavLink>
    </div>
    <div className="nav-menu-container relative justify-between w-full flex items-center">
      
      <ul className="nav-menu relative mx-auto text-xl justify-between items-center flex gap-4">
        <li className="nav-menu-item"><NavLink style={{ '--pseudo-color': `${themeToggle?'black':'white'}` }} to='/'>Home</NavLink></li>
        <li className="nav-menu-item"><NavLink style={{ '--pseudo-color': `${themeToggle?'black':'white'}` }} to='/allarts'>All Arts and Crafts</NavLink></li>
        <li className="nav-menu-item"><NavLink style={{ '--pseudo-color': `${themeToggle?'black':'white'}` }} to='/addarts'>Add Craft Item</NavLink></li>
        <li className="nav-menu-item"><NavLink style={{ '--pseudo-color': `${themeToggle?'black':'white'}` }} to='/myarts'>My Art&Craft List</NavLink></li>
        
      </ul>
      
      <div className='flex w-fit justify-center mr-4 items-center gap-8'>



        {
          user?
          <div  className='flex w-fit justify-center mr-2 items-center gap-4'>
           <NavLink to={`/profile/${user?.uid}`}> <div className="tooltip" data-tip={`${user&&(user.displayName ||user.email)}`}>
          <button ><CgProfile className='text-4xl hover:text-white'/></button>
</div></NavLink>
          
            <NavLink to='/'>
            <button onClick={handleSignOut} className={`${themeToggle?'bg-[var(--color-light)] hover:bg-[var(--color-md-light)]':'hover:bg-[var(--color-md-light)]   bg-[var(--color-dark)] text-[var(--color-light)]'} rounded-lg px-6 py-3`}>Sign Out</button>
            </NavLink>
          </div>
         : 
          <div  className='flex w-fit justify-center mr-4 items-center gap-8'> 
          <NavLink to='/signin'>
          <button className={` ${themeToggle?'bg-[var(--color-dark)] text-[var(--color-light)] hover:bg-[var(--color-md-light)]':'hover:bg-[var(--color-md-light)]   bg-[var(--color-light)] text-[var(--color-md-dark)]'} rounded-lg px-6 py-3`}>Sign In</button>
          </NavLink>
         <NavLink to='/signup'> 
         <button  className={`${themeToggle?'bg-[var(--color-light)] hover:bg-[var(--color-md-light)]':'hover:bg-[var(--color-md-light)]   bg-[var(--color-dark)] text-[var(--color-light)]'} rounded-lg px-6 py-3`}>Sign up</button></NavLink></div>
        }
       
      </div>

    </div>
   


</nav>
</>
  )
}

Navbar.propTypes = {}

export default Navbar

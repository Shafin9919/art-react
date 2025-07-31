import {React,useContext} from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../../Authprovider';
import { useLocation } from 'react-router-dom';

function Modal({children,setShowModal,showModal,setReauthModalToggle}) {

const {isLoading,setIsLoading,themeToggle}=useContext(AuthContext);
const location=useLocation(); 


  const handleCloseClick=()=>{
    setShowModal(false);
    location.pathname==='/profile'&&setReauthModalToggle(false);
  }

  return (
    <div className='modal-conatiner'>

        
        <div className={`w-[calc(80vw-.5rem)] relative top-1/2 -translate-y-1/2 p-8 rounded-lg py-16 pt-20 mx-auto bg-white ${themeToggle&&'text-black'}`}>
        <button onClick={handleCloseClick} className='absolute hover:bg-black hover:text-white transition-all duration-500 top-5 right-10 text-2xl rounded-[30%] p-2 border-2 text-gray-500'>X</button>
        {children}
        </div>
        
        
        </div>

  )
}

Modal.propTypes = {}

export default Modal

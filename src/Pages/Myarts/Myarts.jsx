import React, { useContext, useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../../Authprovider'
import Artscard from '../../Components/ArtsCard/Artscard';

function Myarts(props) {
const {user}=useContext(AuthContext);
const [arts,setArts]=useState([]);


useEffect(()=>{
  fetch(`http://localhost:5000/userarts/${user.uid}`).then(res=>res.json()).then(data=>setArts(data));


},[])


  return (
 <div className='w-[90vw] mx-auto mt-20 pt-1 px-[5rem] '>

  <div className='flex justify-center'>
    <h2 className='text-4xl my-10 text-center border-b-2 w-fit p-3'>All arts added by you.</h2>
    </div>

<div className='grid grid-cols-3 gap-8 border-2 rounded-lg p-2 mx-auto'>
  {
    arts.map(art=> <Artscard art={art}></Artscard>)
  }
</div>

 </div>
  )
}

Myarts.propTypes = {}

export default Myarts

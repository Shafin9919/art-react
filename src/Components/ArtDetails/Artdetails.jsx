import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, useParams } from 'react-router-dom';
import ArtsRating from '../ArtsRating/ArtsRating';
import { AuthContext } from '../../Authprovider';

function Artdetails(props) {
    const {id}=useParams();
    const {user,loading}=useContext(AuthContext)
    const [art,setArts]=useState(!loading && useLoaderData() || {})
 
   

   const {
        _id,
        item_name,  
        item_image,
        subcategory,
        description,
        price ,
        customization,
        stockStatus,
        user_email,
        user_name,
        uploadedBy,
        artRating,
        ratedUsers} =art;
        const [avgRating,setAvgRating]=useState({
          rating: parseFloat(artRating/ratedUsers?.length || 0).toFixed(2),
          ratedCount: ratedUsers?.length,
        });



        const backGroundStyle={
           
             backgroundImage:  `url(${item_image})`,
             backgroundRepeat:'none',
             backgroundSize:'100% 100%',
             backgroundBlendMode:'saturation',
             backgroundColor:'rgba(0, 0, 0, 0.582)'
        }

   
  return (
   <div style={backGroundStyle} className=' p-12'>
    <div  className='mt-20 p-10 h-[calc(100svh-5.5rem)] w-[90vw] rounded-3xl border-2 flex justify-between mx-auto'>
       <div className='text-white border-2 rounded-3xl rounded-br-none rounded-tr-none border-r-0 p-8 w-1/2 h-full'>
       <h2 className=' text-white text-7xl '>{item_name || 'Castle'}</h2>
      <div className='flex flex-col space-y-3'>
        <p className='text-3xl'><span className='text-5xl font-semibold mr-3'>Type:</span>{subcategory}</p>
        <p className='art-description max-h-56 overflow-y-scroll text-2xl'><span className='text-xl font-semibold mr-3'>Description:</span>{description}</p>
        <p className='text-2xl'><span className='text-2xl font-semibold mr-3'>Customizability:</span>{customization.toUpperCase()}</p>
        <p className='text-2xl'><span className='text-2xl font-semibold mr-3'>Stock:</span>{stockStatus}</p>
        <p className='text-2xl'><span className='text-2xl font-semibold mr-3'>Price:</span>{price}$</p>
        <p className='text-2xl'><span className='text-2xl font-semibold mr-3'>Uploaded By:</span>{user_name}</p>    
        <p className='text-2xl'><span className='text-2xl font-semibold mr-3'>Contact email:</span>{user_email || 'Not provided by user'}</p>
        {art &&
          <>
          <div>Rating: <ArtsRating loading={loading} avgRating={avgRating} setAvgRating={setAvgRating} ratedUsers={ratedUsers || []} ratedBy={user?.uid} id={_id} artRating={artRating|| 0}></ArtsRating> </div>
          <div>Total User Ratings: { avgRating.rating} ({avgRating.ratedCount || 0})</div>
          </>

        }
      </div>
       
       </div>
   <div className=' w-1/2 rounded-lg py-0 p-3 overflow-hidden'>
   <img src={item_image} className='rounded-3xl w-full h-full' alt="" />
   </div>
   </div>
   
   </div>
  )
}

Artdetails.propTypes = {}

export default Artdetails

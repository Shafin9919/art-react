import React from 'react'
import PropTypes from 'prop-types'


function TopRatedArt({art}) {

    const {
       
        item_name,  
        item_image,
        subcategory,
        description,
        price ,
        customization,
        stockStatus,
        user_email,
        user_name,
        AverageRating} =art;
    
  return (
<>

  <div className="flex w-full h-full relative ">
<div className="relative h-full">
<div className="triangle absolute bg-[var(--color-md-dark)] w-32 top-[calc(0%-1rem)] left-[-1rem] rounded-tl-xl"
><span className='font-bold font-[vsans] text-[var(--color-light)]'>Top Rated</span>
</div>
</div>
    <div className='w-1/2 p-8 flex flex-col justify-center gap-2'>
      <h4 className='text-8xl font-bold'>{item_name}</h4>
      <h4 className='text-3xl'>Subcategory: {subcategory}</h4>
      <p>{description}</p>
      
      <p className='text-2xl'>User Rating: {AverageRating?.rating || 0} <span>({AverageRating?.ratedCount || 0})</span> </p>
    </div>

    <div className='w-1/2 h-full p-3'>
      <img className='h-full w-full rounded-xl' src={item_image} alt="" />
    </div>

  </div>
  

</>
  )
}

TopRatedArt.propTypes = {}

export default TopRatedArt

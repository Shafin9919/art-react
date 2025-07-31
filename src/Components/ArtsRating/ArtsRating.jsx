import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";


function ArtsRating({
  artRating,
  id,
  ratedBy,
  ratedUsers,
  loading,
  setAvgRating,avgRating}) {

    const [currentRating,setCurrentRating]=useState(ratedUsers.find(rating=>rating?.ratedBy===ratedBy)?.givenRating|| 0);
    const [hoveredRating,setHoveredRating]=useState(0);



    const handleClick = (rating) => {
        setCurrentRating(rating);
        
        const existingRating=ratedUsers.find(rated=>rated?.ratedBy===ratedBy);
        const updatedRating=existingRating ?
                            ratedUsers.map(rated=>rated.ratedBy===ratedBy?{...rated,givenRating:rating}:rated):
                            [...ratedUsers,{
                              givenRating:rating,
                              ratedBy:ratedBy,
                            }]

       setAvgRating({
        rating:(updatedRating.reduce((sum,rating)=>sum + rating.givenRating,0)/updatedRating.length).toFixed(2),
        ratedCount:updatedRating.length,
       })
        
       
       const artRatingUpdate={
          artRating: updatedRating.reduce((sum,rating)=>sum + rating.givenRating,0),
          // AverageRating: avgRating,
          AverageRating: {
            rating:(updatedRating.reduce((sum,rating)=>sum + rating.givenRating,0)/updatedRating.length).toFixed(2),
            ratedCount:updatedRating.length,
           },
          ratedUsers: updatedRating,
         };
 

         console.log(artRatingUpdate)
              fetch(`http://localhost:5000/userrating/${id}`,
           { method:'PUT',
             headers:{
               'content-type':'application/json'
             },
             body: JSON.stringify(artRatingUpdate)
           }
         )

      };




      const handleMouseEnter = (rating) => setHoveredRating(rating);
      const handleMouseLeave = () => setHoveredRating(0);

  return (
    <div className='flex gap-1'>
    {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          className={`text-xl cursor-pointer `}
          >
            <FaStar  className={`${starValue <= (hoveredRating || currentRating) ? "text-[gold]" : "text-[gray]"}`}/>
          </span>
        );
      })}</div>
  )
}

ArtsRating.propTypes = {}

export default ArtsRating

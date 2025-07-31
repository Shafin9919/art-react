import {React,useState,useRef} from 'react'
import PropTypes from 'prop-types'
import { Carousel } from '../Carousel/Carousel'
import TopRatedArt from '../TopRatedArt/TopRatedArt'




function TopRated({arts}) {
  const [topArts,setTopArts]=useState(arts.sort((b,a)=>a.AverageRating.rating-b.AverageRating.rating));
  console.log(topArts)


  return (
    <div className='w-[90vw] mx-auto my-10'>
      <h2 className='text-5xl font-[rawgly-regular] font-bold text-center py-8 rounded-xl border-2 border-[--color-md-dark] mb-6'>Top Rated Arts</h2>
    

    
 
      {/* h-[calc(100svh-100px)] */}
<div className=' p-4 flex border-2 border-[var(--color-md-dark)] rounded-xl h-[75svh]'>


<Carousel contentArray={arts} timer={10000}>
 
<TopRatedArt ></TopRatedArt>


</Carousel>
</div>










</div>
    
    
  )
}

TopRated.propTypes = {}

export default TopRated

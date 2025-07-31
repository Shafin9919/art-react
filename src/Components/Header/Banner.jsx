import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Artscard from '../ArtsCard/Artscard';
import {Carousel} from '../Carousel/Carousel';

function Banner({arts}) {



  return (
    <div className='banner flex justify-between gap-8 h-full mx-auto pt-16 px-[5rem]'>

<div className="banner-text p-4 mt-40 w-fit h-fit">
    <h1 className="banner-heading  w-fit font-[rawgly-regular] text-[6rem] font-bold ">
        Arts & Crafts
    </h1>

    <p className="banner-paragraph w-[50ch] text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime impedit officiis ad animi. Tempore, enim id maxime sapiente voluptatem facilis?
    </p>
</div>

<div className='p-8 flex flex-col items-center justify-center w-[40%]'>

<Carousel contentArray={arts} timer={10000}><Artscard ></Artscard></Carousel>

</div>
    </div>
  )
}

Banner.propTypes = {}

export default Banner

import {React,useState,useEffect,useRef, cloneElement} from 'react'
import PropTypes from 'prop-types'
import { SiElsevier } from 'react-icons/si';
import { FaArrowRight,FaArrowLeft  } from "react-icons/fa";

function Carousel({children,
                   contentArray,timer}) {

    const [index,setIndex]= useState(0);
    const intervalRef = useRef(null);


    useEffect(() => {
        // const interval = setInterval(() => {
        //   setIndex((prevIndex) => (prevIndex + 1) % contentArray?.length); 
          
        // }, timer); 
    
        // return () => clearInterval(interval);
        startTimer();
        // return () => clearInterval(intervalRef.current);
      }, [contentArray?.length]);

    const startTimer=()=>{
      if(!intervalRef.current){
        intervalRef.current=setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % contentArray?.length); 
          
        }, timer); 
      }
    }


          const stopTimer = () => {
            clearInterval(intervalRef.current);
            intervalRef.current=null;
          };




  return (
    <div 
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    
    className='w-full h-full flex flex-col justify-between '> 
   <div className='flex w-full h-[90%]'>
   { cloneElement(children,{art:contentArray[index]})}
   </div>

   
      <div className='flex mx-auto w-1/2 p-6 justify-between'>
<button onClick={()=>setIndex((prevIndex) => (prevIndex - 1 + contentArray?.length) % contentArray?.length)}>< FaArrowLeft/></button>
<button onClick={()=> setIndex((prevIndex) => (prevIndex + 1) % contentArray?.length)}><FaArrowRight/></button>
</div></div>
);

}

Carousel.propTypes = {
    // timer:PropTypes.number.isRequired,
    // contentArray:PropTypes.array.isRequired,
}

export  {Carousel}

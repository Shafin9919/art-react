import {React,useContext, useState} from 'react'
import PropTypes from 'prop-types'
import { useLoaderData,useLocation } from 'react-router-dom'
import Artscard from '../../Components/ArtsCard/Artscard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authprovider';
import { IoMdArrowDropdownCircle,IoMdArrowDropupCircle  } from "react-icons/io";
function Arts(props) {

  const loadedArts= useLoaderData();
  const [arts,setArts]=useState(loadedArts);
  const navigate=useNavigate()
  
const {setIsLoading,isLoading,themeToggle}=useContext(AuthContext);
const [dropdownToggle,setDropdownToggle]=useState(false);

// const categories=['Landscape Painting', 'Portrait Drawing', 'Watercolor Painting', 'Oil Painting', 'Charcoal Painting', 'Cartoon Drawing']


const categories = [...new Set(loadedArts.map(art => art.subcategory))];
const [category,setCategory]=useState()


console.log(arts)

const handleDropdown=()=>{
  setDropdownToggle(!dropdownToggle);
  console.log(dropdownToggle);
}

  

const onCatClick=(cat)=>{
 
  setArts(loadedArts.filter(art=>cat===art.subcategory));
}

  const handleClick=(id)=>{
    navigate(`/artdetails/${id}`);
    // navigate(`/artdetails/${id}`)
}
  return (
    <div onClick={()=>dropdownToggle&&setDropdownToggle(false)} className='w-[90vw]  py-2 mx-auto mt-20'>

      <h2 className='text-5xl font-bold text-center my-8'>All Arts In Our Collection</h2>

     

     <div className='w-[80vw] mx-auto border-2 '>

       <div className='text-2xl w-[250px] mx-auto my-4 text-center relative h-max   bg-[var(--color-dark)]  text-[var(--color-light)] rounded-lg rounded-b-none font-bold'>
        <h6 onClick={handleDropdown} className={`p-2 flex justify-center rounded-lg rounded-b-none items-center gap-2 ${themeToggle&&'bg-[var(--color-light)] text-[var(--color-md-dark)]'}`}>Sort By <span className={`transition-all duration-200 ease-in ${dropdownToggle && '-rotate-180'}`}><IoMdArrowDropdownCircle className='text-[var(--color-md-light'/></span> </h6>
      
        <ul  className={`${dropdownToggle?'dropdown-content menu h-max opacity-100':'h-0'}  w-full duration-300 ease-in-out transition-all opacity-0 overflow-hidden absolute ${themeToggle?'bg-[var(--color-md-dark)] ':'bg-[var(--color-md-light)] text-[var(--color-dark)]'} z-50 px-2 rounded-b-lg font-semibold`}>
        <li onClick={()=>setArts(loadedArts)} className='py-2 cursor-pointer border-black border-b-2'>All Painting</li>
          {categories.splice(0,categories.length-1).map(cat=><li onClick={()=>onCatClick(cat)} className='py-2 cursor-pointer border-black border-b-2'>{cat}</li>)}
          <li onClick={()=>onCatClick(categories[categories.length-1])} className='py-2 cursor-pointer border-black'>{categories[categories.length-1]}</li>
          
        </ul>

     
       </div>
     <div className=' grid grid-cols-3 w-[80vw] p-4 gap-8 mx-auto'>
    {  isLoading?'Loooooooooool':
        arts.map((art)=><Artscard handleClick={handleClick} key={art._id} art={art}></Artscard> )
      }
     </div>
     </div>

    </div>
  )
  //
}

Arts.propTypes = {}

export default Arts

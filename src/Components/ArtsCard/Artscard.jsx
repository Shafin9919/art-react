import {React,useState,useContext} from 'react'
import PropTypes from 'prop-types'
import { useNavigate,useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';
import ArtForm from '../ArtsForm/ArtForm';
import '../../index.css'
import { AuthContext } from '../../Authprovider';


function Artscard({art, 
    handleSubmit,handleDelete}) {
   
      const [showModal,setShowModal]=useState(false);
      const [id,setId]=useState('');
      const {themeToggle,
            user
          }=useContext(AuthContext);



      

      const navigate=useNavigate()
      const {pathname}=useLocation();
      
      const [checked, setChecked] = useState(art?.customization);
      
      const handleCheckChange = (e) => {
        setChecked(e.target.value); 
      };

      const handleClick=(id)=>{
        // pathname==='/allarts'||'/'? navigate(`/artdetails/${id}`):setShowModal(!showModal);
        if(pathname==='/allarts'|| pathname==='/'|| pathname==='/myarts'){
          navigate(`/artdetails/${id}`)
        }
        else if(pathname===`/profile/${user?.uid}`){
          setShowModal(!showModal)
        }
       setId(id);
      }
      

    const {
    _id,
    item_name,  
    item_image,
    subcategory,
    AverageRating} =art;

    
    console.log(AverageRating?.rating)
  return (
    <>
    <div onClick={()=>handleClick(_id)} className='artcard w-full h-full p-2 relative flex flex-col rounded-lg overflow-hidden'>
       <div className='w-full h-full relative overflow-hidden'>
       <img className='h-full w-full relative rounded-lg' src={`${item_image}`} alt="art_image" />
        <div className="slide-in-text absolute rounded-b-lg"> <h2 className='text-xl text-center font-bold p-4'>Click to {pathname===`/profile/${user?.uid}`?'update art':'view  full details'} </h2></div>
 
       </div>
        <div className='relative artcard-text '>
        <div className={` artcard-visible-text 
          ${themeToggle?'bg-[var(--color-dark)] text-[var(--color-light)]':'bg-[var(--color-light)] text-[var(--color-md-dark)]'}`}> 
        <h4 className='text-2xl font-semibold'>Name:{item_name? item_name:'Castle'}</h4>
    <p className='text-xl flex gap-2'><span className='text-xl'>Type:</span>{subcategory}</p>
    <div className='flex gap-2'>
    <p>User Rating: {AverageRating?.rating || 0}</p><span>({AverageRating?.ratedCount || 0})</span>
    </div>
    </div>
    
        </div>

       

    

    </div>

    {showModal? <Modal id={id} setShowModal={setShowModal} ><ArtForm id={id}  handleSubmit={handleSubmit} setShowModal={setShowModal} handleDelete={handleDelete} showModal={showModal} art={art} checked={checked} handleCheckChange={handleCheckChange}></ArtForm></Modal>:""}
    </>
  )
}

Artscard.propTypes = {}

export default Artscard

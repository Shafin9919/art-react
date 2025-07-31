import React, { useState,useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLoaderData,useNavigate,useLocation } from 'react-router-dom';
import Artscard from '../../Components/ArtsCard/Artscard';
import ArtForm from '../../Components/ArtsForm/ArtForm';
import Modal from '../../Components/Modal/Modal'
import { AuthContext } from '../../Authprovider';
import Swal from 'sweetalert2';
import '../../index.css'
function Addarts(props) {



const loadedArts=useLoaderData();
const [arts,setArts]=useState(loadedArts)

const {setIsLoading,isLoading,user}=useContext(AuthContext);


const handleAddSubmit=(e)=>{
  e.preventDefault();
  
  const form= new FormData(e.currentTarget);
  const item_name= form.get('item_name');
  const item_image=form.get('item_image');
  const subcategory =form.get('subcategory_name');
  const description=form.get('description');
  const price =form.get('price');
  const customization=form.get('customization');
  const stockStatus= form.get('stockStatus');
  const user_email=user.email;
  const user_name=user.displayName;
  const uploadedBy=user.uid;
  

  const item_info={
    item_name,  
    item_image,
    subcategory,
    description,
    price ,
    customization,
    stockStatus,
    user_email,
    user_name,
    uploadedBy};

    fetch('http://localhost:5000/addarts',
      { method:'POST',
       headers:{
         'content-type':'application/json'
       },   
     body: JSON.stringify(item_info)
   }).then(res=>res.json()).then(data=>
    {data && setIsLoading(false);
      if(data.insertedId){
        console.log(data)
        Swal.fire({
          title: "Added Successfully",
          text: "The item has been added successfully",
          icon: "success"
        });
        setArts([...arts,{...item_info,_id:data.insertedId}]);
      }
    });
e.currentTarget.item_name.value='';
e.currentTarget.item_image.value='';
e.currentTarget.description.value='';
e.currentTarget.item_name.value='';
e.currentTarget.price.value='';
e.currentTarget.stockStatus.value='';
e.currentTarget.user_email.value='';
e.currentTarget.user_name.value='';
e.currentTarget.subcategory_name.value='Select the subcategory of the Painting';
}




  return (
    <div className='w-[90vw] mx-auto mt-20 pt-1 px-[5rem] relative'>

  <h2 className='text-center p-4 my-8 w-fit mx-auto border-b-4 text-6xl font-bold '>Add Arts and Crafts</h2>
     
    <div className=' border-2 p-8'>
    <ArtForm handleSubmit={handleAddSubmit}></ArtForm>
    </div>

   {/* <div className='my-8'>
   <h2 className='text-5xl font-bold text-center'>Update or Remove Existing Arts</h2>

   <div className='grid grid-cols-3 gap-8 border-2 p-10 mx-auto'>
     {
        arts.map((art,idx)=><Artscard key={art?._id} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} art={art}></Artscard>)
      }
     </div>

   </div>   */}

   </div>
  )
}



Addarts.propTypes = {}

export default Addarts

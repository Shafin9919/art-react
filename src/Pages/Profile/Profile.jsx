import React, { useContext, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../Authprovider';
import Modal from '../../Components/Modal/Modal';
import '../../index.css'
import Swal from 'sweetalert2'
import Artscard from '../../Components/ArtsCard/Artscard';

function Profile(props) {
    const {themeToggle,
      updateUser,
      updatemail,user,
      isLoading,
      setIsLoading,
      reAuthenticate,
      verifyBeforeUpdateEmail}=useContext(AuthContext);

const [showModal,setShowModal]=useState(false);
const [updateModalToggle,setUpdateModalToggle]=useState(false);
const [reauthModalToggle,setReauthModalToggle]=useState(false);
const [updateInfo,setUpdateInfo]=useState({});
const [arts,setArts]=useState([]);


useEffect(()=>{
  fetch(`http://localhost:5000/userarts/${user.uid}`).then(res=>res.json()).then(data=>setArts(data));


},[])



const handleUpdateSubmit=(e,id)=>{
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

  const item_info={
    item_name,  
    item_image,
    subcategory,
    description,
    price ,
    customization,
    stockStatus,
    user_email,
    user_name};



    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
  
      if (result.isConfirmed) {

            fetch(`http://localhost:5000/updatearts/${id}`,
     { method:'PUT',
      headers:{
        'content-type':'application/json'
      },
    body: JSON.stringify(item_info)
  }).then(res=>res.json()).then(data=>{
    if(data.modifiedCount>0){
      Swal.fire(
        {
          title: "Save Successfully!",
          text: "Your file has been Saved.",
          icon: "success"
        }
      );
    }
     data && setIsLoading(false)});    
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }})}
const handleDelete=(id)=>{

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/delete/${id}`,
    { method:'DELETE',
     headers:{
       'content-type':'application/json'
     },
 }).then(res=>res.json())
 .then(data=>{
  data && setIsLoading(false)
if(data.deletedCount>0){
   Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      const remaining=arts.filter(rem=>rem._id!==id);
      setArts(remaining);
}})}});
}


const handleShowModal=()=>{
  setUpdateModalToggle(true)
    setShowModal(true);
}


const [loadedUser]=useLoaderData();



const {displayName,
    email,
    photoURL,
    metadata,
    phoneNumber,
    emailVerified,
    uid
    }=user;



    const handleReAuthenticate=(e)=>{
        e.preventDefault();

        const {newDisplayName,
          newPhotoURL,
          newEmail}=updateInfo;
      const form=new FormData(e.currentTarget);
      const password=form.get('password');
      reAuthenticate(newEmail,password).then(()=>{

        setIsLoading(true);

        (newEmail !== email) &&  verifyBeforeUpdateEmail(user,newEmail).then(()=>{

          Swal.fire({
            title: "Please Check Your New Email to Verify",
            text: "That thing is still around?",
            icon: "info"
          });
        
        });
       

            updateUser({
            displayName:newDisplayName,
            photoURL:newPhotoURL,});

            // (newEmail !== email) && updatemail(newEmail)

      }).then(()=>{

        setIsLoading(false);
    //   fetch(`http://localhost:5000/updateuser/${uid}`,{
//     method:'PUT',
//     headers:{
//       'content-type':'application/json'
//     },
//     body:JSON.stringify(user),
//   }).then(res=>res.json()).then(data=>{
//     setIsLoading(false);
//     console.log(data)})

// });

   });
     setReauthModalToggle(false);
    }

    

const handleProfileUpdateSubmit=(e)=>{
    e.preventDefault();
    const form= new FormData(e.currentTarget);
    const newDisplayName=form.get('username');
    const newPhotoURL=form.get('photoUrl')
    const newEmail= form.get('email');

setUpdateInfo({newDisplayName,
               newPhotoURL,
               newEmail})

setReauthModalToggle(true);
setShowModal(true);

}



  
  return (
    <div className='w-[90vw] flex flex-col justify-center py-2 mx-auto mt-20'>
     <div className='p-8  rounded-lg my-20 text-center '>
    <div className='profilePic-container rounded-[50%] p-1 bg-white mx-auto w-1/3 '> <img className='rounded-[50%]  aspect-square w-full mx-auto' src={`${photoURL}`} alt="profile photo" /></div>
       <div className='space-y-4 my-8'>
       <h2 className='text-5xl '>Name: <span>{displayName.toUpperCase()}</span></h2>
        <h2 className='text-3xl '>Email: <span>{email}</span></h2>
        <p className='text-2xl'>Profile Created: <span>{metadata.creationTime}</span></p>
        <p className='text-2xl'>Verification Status: <span>{emailVerified?'Verified':'Not Verified'}</span></p>
        <p className='text-2xl'>Phone: <span>{phoneNumber || '0000000'}</span></p>
       </div>
    
    <div  className=' flex justify-center gap-4'>
        <button onClick={handleShowModal} className='py-4 px-8 w-full rounded-lg font-bold bg-[var(--color-md-dark)] text-[var(--color-light)]'>Update Profile</button>
        <button className='py-4 px-8 w-full rounded-lg font-bold bg-red-500 text-white'>Delete Profile</button>
    </div>
     </div>


     <div className='my-8'>
   <h2 className='text-5xl font-bold text-center'>Update or Remove Existing Arts</h2>

   <div className='grid grid-cols-4 gap-8 border-2 p-2 mx-auto'>
     {
        arts.map((art,idx)=><Artscard key={art?._id} handleSubmit={handleUpdateSubmit} handleDelete={handleDelete} art={art}></Artscard>)
      }
     </div>

   </div>  



     {(updateModalToggle&&showModal) && <Modal showModal={showModal} setShowModal={setShowModal}>
        
        
     <div className=" w-full p-0  border-2 border-[var(--color-md-dark)] rounded-lg overflow-hidden mx-auto flex">
   
        <div className={`signIn-form w-full p-8 rounded-r-lg overflow-hidden ${themeToggle?'bg-[var(--color-md-dark)] text-[var(--color-dark)]':'bg-[var(--color-md-light)] text-[var(--color--md-dark)]'}`}>
        <form  onSubmit={handleProfileUpdateSubmit}>
        
        <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">Name:</span>
            </label>
            <input type="text" name="username" defaultValue={displayName} placeholder="name" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">PhotURL:</span>
            </label>
            <input type="text" name="photoUrl" defaultValue={photoURL} placeholder="Photo URL" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">Email</span>
            </label>
            <input type="email" name="email" defaultValue={email} placeholder="email" className="input input-bordered" required />
          </div>
       
  
          <div className='my-3 text-xl text-blue-300 font-semibold'>
          
          </div>
           
          <div className="form-control mt-6">
            <button className="btn bg-black px-4 py-2 text-white hover:bg-white hover:text-black">Submit</button>
          </div>
        </form>
        </div>
      </div>
        
{
  (reauthModalToggle && showModal) && <Modal setReauthModalToggle={setReauthModalToggle} showModal={showModal} setShowModal={setShowModal}>

 <div className={`signIn-form w-full p-8 rounded-lg overflow-hidden ${themeToggle?'bg-[var(--color-md-dark)] text-[var(--color-dark)]':'bg-[var(--color-md-light)] text-[var(--color--md-dark)]'}`}>
      <form  onSubmit={handleReAuthenticate}>
      

        <div className="form-control">
          <label className="label text-xl font-semibold">
            <span className="">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />  
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[var(--color-dark)] hover:bg-transparent">Submit</button>
        </div>
      </form>
      </div>


  </Modal>
}
        </Modal>}
    </div>
  )
}


Profile.propTypes = {}

export default Profile

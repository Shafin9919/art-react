import React, { useContext,useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../../Authprovider'

function ArtForm({handleSubmit,handleDelete,showModal,id,checked,handleCheckChange}) {

const [art,setArt]=useState({});
const {user}=useContext(AuthContext);
const [selectedValue, setSelectedValue] = useState('Select the subcategory of the Painting');
const [selectedStock,setSelectedStock]=useState('Select the stock status of the Painting');
useEffect(()=>{
    id && fetch(`http://localhost:5000/artdetails/${id}`).then(res=>res.json()).then(data=>setArt(...data));
  },[])


useEffect(()=>{
setSelectedValue(art?.subcategory);
setSelectedStock(art?.stockStatus);
},[art])

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handeStckChange=(e)=>{
    setSelectedStock(e.target.value)
  }

  return (
    <div>

        <form onSubmit={(e)=>handleSubmit(e,id)} className=' grid grid-cols-1 md:grid-cols-4 gap-6'>
    <label className='text-2xl' htmlFor="item_name">Item Name:</label>
    <input className='border-2 border-black rounded-md p-2' name='item_name' defaultValue={art?.item_name} type="text" />
    <label className='text-2xl' htmlFor="item_image">Item Image URL:</label>
    <input className='border-2 border-black rounded-md p-2' defaultValue={art?.item_image} name='item_image' type="text" />
    <label className='text-2xl' htmlFor="subcategory_name">subcategory Name:</label>
<select onChange={handleChange} name='subcategory_name' value={selectedValue} className="select border-2 outline-none border-black w-full max-w-xs">
<option disabled selected> Select the subcategory of the Painting</option>
<option className='bg-black text-white focus:bg-white ' value='Landscape Painting'>Landscape Painting</option>
<option className='bg-black text-white focus:bg-white ' value='Portrait Drawing'>Portrait Drawing</option>
<option className='bg-black text-white focus:bg-white ' value='Watercolor Painting'>Watercolor Painting</option>
<option className='bg-black text-white focus:bg-white ' value='Oil Painting'>Oil Painting</option>
<option className='bg-black text-white focus:bg-white ' value='Charcoal Painting'>Charcoal Painting</option>
<option className='bg-black text-white focus:bg-white ' value='Cartoon Drawing'>Cartoon Drawing</option>
</select>
    <label className='text-2xl row-span-2' htmlFor="description">Description:</label>
    <textarea className='border-2 border-black rounded-md p-2 row-span-2 appearance-none resize-none' defaultValue={art?.description} name='description' type="text"></textarea> 
    <label className='text-2xl' htmlFor="price">Price:</label>
    <input className='border-2 border-black rounded-md p-2' defaultValue={art?.price} name='price' type="text" />
    <label className='text-2xl ' htmlFor="customization">Customization:</label>
<div className=' flex gap-2 justify-center items-center'>
    <input   className='border-2  border-black rounded-md p-2' id='yes' defaultValue={'yes'} onChange={handleCheckChange} defaultChecked={checked==='yes'&& true} name='customization' type="radio"  />
    <label className='text-2xl mr-16' htmlFor="yes">Yes</label>
    <input   className='border-2 border-black rounded-md p-2' id='no' defaultValue={'no'} onChange={handleCheckChange} defaultChecked={checked==='no'&& true} name='customization' type="radio" />
    <label className='text-2xl' htmlFor="no">No</label>
</div>    

    <label className='text-2xl' htmlFor="stockStatus">Stock Status:</label>
    {/* <input className='border-2 border-black rounded-md p-2' defaultValue={art?.stockStatus} name='stockStatus' type="text" /> */}
    <select onChange={handeStckChange} name='stockStatus' value={selectedStock} className="select border-2 outline-none border-black w-full max-w-xs">
<option disabled selected> Select the stock status of the Painting</option>
<option className='bg-black text-white focus:bg-white ' value='In Stock'>In Stock</option>
<option className='bg-black text-white focus:bg-white ' value='Made to Order'>Made to Order</option>
<option className='bg-black text-white focus:bg-white ' value='Out of Stock'>Out of Stock</option>

</select>
   
    <label className='text-2xl' htmlFor="user_email">User Email:</label>
   <p name='user_email' className='text-xl text-[var(--color-light)] p-3 rounded-lg bg-[var(--color-dark)] text-center'>{user.email}</p>
    {/* <input className='border-2 border-black rounded-md p-2' defaultValue={art?.user_email} name='user_email' type="text" /> */}
    <label className='text-2xl' htmlFor="user_name">User Name:</label>
    <p name='user_name' className='text-2xl font-semibold text-[var(--color-light)] p-3 rounded-lg bg-[var(--color-dark)] text-center'>{user.displayName}</p>
    {/* <input className='border-2 border-black rounded-md p-2' defaultValue={art?.user_name} name='user_name' type="text" /> */}
  <button className='col-span-full btn text-white text-2xl font-bold bg-black'>Submit</button>
  
  </form>
  {showModal? <button onClick={()=>handleDelete(id)} className='w-full mt-4 btn text-white text-2xl font-bold bg-red-500'>Delete</button>:""}
  </div>
  )
}



ArtForm.propTypes = {}

export default ArtForm

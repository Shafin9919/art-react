import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { AuthContext } from '../../Authprovider';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import signInImg from '../../../public/signupimage.avif';

function Signup({state}) {

const {createUser, setIsLoading, user,themeToggle,updateUser,validateEmail}= useContext(AuthContext);
const location=useLocation();
const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();

    const form= new FormData(e.currentTarget);
    const userName=form.get('username');
    const photoUrl=form.get('photoUrl')
    const email= form.get('email');
    const password=form.get('password');
    createUser(email,password).then(result=> {

      validateEmail();
      updateUser({
        displayName:userName,
        photoURL: photoUrl,
      })
        .then(() => {
          setIsLoading(false);
        });
        const creationTime=result?.user?.metadata?.creationTime;

        
        fetch('http://localhost:5000/users',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({...result.user,displayName:userName,photoURL:photoUrl,creationTime:creationTime}),
        }).then(res=>res.json()).then(data=>console.log(data))

     
       navigate(location.state || '/');
    });
  }


  const signUpStyle={
    backgroundImage: `url('${signInImg}')`,
    backgroundSize:'100% 100%'
  }

  return (
    <div className='w-[90vw] mx-auto flex justify-center h-dvh items-center'>

    
    <div className=" w-full p-6 mt-20 border-2 border-[var(--color-md-dark)] rounded-lg overflow-hidden mx-auto flex">
    <div style={signUpStyle} className={`w-1/2 bg-[#102139] rounded-l-lg bg-blend-screen bg-no-repeat flex justify-center items-center`}>
          <h3 className='text-9xl h-full w-full font-[rawgly-regulars] flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-[2px] text-[#464E5E]'>Sign Up</h3>
        </div>
        <div className={`signIn-form w-1/2 p-8 rounded-r-lg overflow-hidden ${themeToggle?'bg-[var(--color-md-dark)] text-[var(--color-dark)]':'bg-[var(--color-md-light)] text-[var(--color--md-dark)]'}`}>
        <form  onSubmit={handleSubmit}>
        
        <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">Name:</span>
            </label>
            <input type="text" name="username" placeholder="name" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">PhotURL:</span>
            </label>
            <input type="text" name="photoUrl" placeholder="Photo URL" className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label text-xl font-semibold">
              <span className="">Password</span>
            </label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
           
           
          </div>
  
          <div className='my-3 text-xl text-blue-300 font-semibold'>
            <Link  to={'/signin'}>Don't have an account? Sign Up now!</Link>
          </div>
            <label className=" my-2 text-xl font-semibold">
              <a href="#" className="text-xl text-blue-500 hover:text-green-300">Forgot password?</a>
            </label>
          <div className="form-control mt-6">
            <button className="btn bg-black text-white hover:bg-white hover:text-black">Sign Up</button>
          </div>
        </form>
        </div>
      </div>
  
  
      </div>
  )
}

Signup.propTypes = {}

export default Signup

import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react';
import { AuthContext } from '../../Authprovider';
import signInImg from '../../../public/image.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Signin(props) {

  const {signIn, setIsLoading, user,themeToggle}= useContext(AuthContext);
  const location=useLocation();
  const navigate=useNavigate();
 

  console.log(location);

  const handleSubmit=(e)=>{
    e.preventDefault();

    const form= new FormData(e.currentTarget);

    const email= form.get('email');
    const password=form.get('password');

    console.log(email, password);

    signIn(email,password).then(result=> {
      setIsLoading(false);
       navigate(location.state || '/');
    });

    
  }


  const signInStyle={
    backgroundImage: `url('${signInImg}')`,
    backgroundSize:'100% 100%'
  }

  return (
    <div className='w-[90vw] mx-auto flex h-dvh justify-center items-center'>

    
{/* h-[calc(100%-8rem)] */}

  <div className=" w-full p-6 mt-20  border-2 border-[var(--color-md-dark)] rounded-lg overflow-hidden mx-auto flex">
  <div style={signInStyle} className={`w-1/2 bg-[#102139] rounded-l-lg bg-blend-screen bg-no-repeat flex justify-center items-center`}>
        <h3 className='text-9xl font-[rawgly-regular] h-full w-full flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-[2px] text-blue-950'>Sign In</h3>
      </div>
     
      <div className={`signIn-form w-1/2 p-8 rounded-r-lg overflow-hidden ${themeToggle?'bg-[var(--color-md-dark)] text-[var(--color-dark)]':'bg-[var(--color-md-light)] text-[var(--color--md-dark)]'}`}>
      <form  onSubmit={handleSubmit}>
      
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

        <div className='my-3 text-xl font-semibold'>
          <Link state={location.state} to={'/signup'}>Don't have an account? Sign Up now!</Link>
        </div>
          <label className="label text-xl font-semibold">
            <a href="#" className="text-xl text-blue-500 hover:text-green-300">Forgot password?</a>
          </label>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      </div>
    </div>


    </div>
  )
}

Signin.propTypes = {}

export default Signin

import React, { createContext, useEffect,  useState  } from 'react'
import PropTypes from 'prop-types'
import { createBrowserRouter } from 'react-router-dom'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile,EmailAuthProvider ,updateEmail,reauthenticateWithCredential  ,sendEmailVerification , onAuthStateChanged,signOut,verifyBeforeUpdateEmail } from "firebase/auth";
import { auth } from './firebase';



const AuthContext = createContext(null);

function Authprovider({children}) {

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser]= useState(null);
    
    const [themeToggle, setThemeToggle] = useState(() => {
      const savedTheme = localStorage.getItem('themeToggle');
      return savedTheme ? JSON.parse(savedTheme) : false;
    });
 
     
        const savedTheme = localStorage.getItem('themeToggle');
      
    
  
    ;
    useEffect(() => {
      savedTheme && setThemeToggle(JSON.parse(themeToggle));
      localStorage.setItem('themeToggle', JSON.stringify(themeToggle));
    }, [themeToggle]);


const createUser=(email ,password)=>{
    setIsLoading(true);
   return createUserWithEmailAndPassword(auth, email, password);

}

const validateEmail=()=>{
  const actionCodeSettings = {
    // URL the user will be redirected to after verification
    url: `http://localhost:5173/profile/auth.currentUser.uid`,
    handleCodeInApp: true, // Set to true if you want to handle the link in the app
  };

  return sendEmailVerification(auth.currentUser,actionCodeSettings);
}

const reAuthenticate=(email,password)=>{

  const credential = EmailAuthProvider.credential(
    user.email,password);
 return reauthenticateWithCredential(user,credential)
}


const updatemail=(updatedEmail)=>{
  return updateEmail(auth.currentUser,updatedEmail);
}
const updateUser=(updatedUser)=>{
      
  return updateProfile(auth.currentUser,updatedUser);
 }
const signIn=(email, password)=>{
    return signInWithEmailAndPassword(auth, email, password);
}

useEffect(()=>{

const unSubscribe=()=>{
    onAuthStateChanged(auth, currentUser => {
        
        setUser(currentUser);



        
        setIsLoading(false)
       
         
       
})}

return ()=>unSubscribe();

},[])

const userSignOut=()=>{
  return signOut(auth);
}


const authValue= {createUser,
  isLoading,setIsLoading ,
  signIn,
  user,
  themeToggle,setThemeToggle,
  updateUser,updatemail,
  validateEmail,reAuthenticate,verifyBeforeUpdateEmail,
  userSignOut};

 
  return (
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

Authprovider.propTypes = {}

export  {Authprovider , AuthContext}

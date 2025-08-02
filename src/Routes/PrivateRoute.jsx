import {React,useContext} from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../Authprovider'
import { useLocation,Navigate} from 'react-router-dom';

function PrivateRoute({children}) {

    const {user, isLoading}=useContext(AuthContext);
    const {pathname}=useLocation();
  
    if(isLoading){
     return <div>
        Loading
      </div>
    }
    
        
    
      if( user){
      return children;
      }
      else{
        return <Navigate state={pathname} to='/signin'></Navigate>;
      }
    }
    
    PrivateRoute.propTypes = {}
    
    export default PrivateRoute

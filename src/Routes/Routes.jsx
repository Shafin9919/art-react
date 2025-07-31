import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "./Root";
import Arts from "../Pages/Allarts/Arts";
import Signup from "../Pages/Signup/Signup";
import Signin from "../Pages/Signin/Signin";
import Addarts from "../Pages/Addarts/Addarts";
import Myarts from "../Pages/Myarts/Myarts";
import Artdetails from "../Components/ArtDetails/Artdetails";
import PrivateRoute from "./PrivateRoute";
import { data } from "autoprefixer";
import Profile from "../Pages/Profile/Profile";




export const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,

      children:[
        {
            
            path: '/',
            element: <Home></Home>,
            loader: ()=>fetch('http://localhost:5000/allarts')
        },

        {
            path: '/allarts',
            element: <Arts></Arts>,
            loader: ()=>fetch('http://localhost:5000/allarts').then(res=>res.json())
        },

        {
          path: '/addarts',
          element: <PrivateRoute> <Addarts></Addarts> </PrivateRoute> ,
          loader:()=>fetch('http://localhost:5000/allarts'),
        },
      {
        path: '/myarts',
        element: <PrivateRoute><Myarts></Myarts></PrivateRoute>
      },
      {
        path: '/artdetails/:id',
        element: <PrivateRoute><Artdetails></Artdetails></PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/artdetails/${params.id}`).then(res=>res.json()).then(data=>data.find(d=>params.id===d._id)),
      },
        {
            path:'/signup',
            element: <Signup></Signup>
        },
        {
            path: '/signin',
            element: <Signin></Signin>
        },
        {
          path:'/profile/:id',
          element: <PrivateRoute><Profile></Profile></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/user/${params.id}`).then(res=>res.json())
        }

      ]
    },
  ]);
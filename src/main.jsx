import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import { Authprovider } from './Authprovider';
import {RouterProvider} from "react-router-dom";
import { routes } from './Routes/Routes';
import { ToastContainer } from 'react-toastify';



ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Authprovider> <RouterProvider router={routes} /></Authprovider>
   <ToastContainer/>
  </StrictMode>
);

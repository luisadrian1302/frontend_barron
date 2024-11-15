import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

    const navigate = useNavigate();


    useEffect(() => {
    
      console.log("hola");
      
      localStorage.removeItem("token");
      window.location.href = "/login"

    },[])
    
  return (
    <div>jjj</div>
  )
}

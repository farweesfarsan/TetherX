import React from 'react';
import { FaHandsClapping } from "react-icons/fa6";
import { useFormData } from "../context/FormDataContext";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const {userData,getSellerData} = useFormData();
   const navigate = useNavigate();
  const onLogout = ()=>{
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className='absolute mt-[100px] ml-[370px] border-[4px] border-solid border-gray-600 box-border w-[600px] h-[270px]'>
      <div className='flex justify-center items-center flex-row mt-[20px] text-[40px] gap-6'>
         <FaHandsClapping 
           className='text-[40px] text-[#f8d04cf5]' 
         />
         <div className='coiny-regular'>Hello! {userData ? (userData.firstName) : 'null'} </div>
      </div>
      <div className='flex justify-center text-[20px]'>Are You sure! You want to logout</div>
      <div className=' flex flex-row mt-[20px] justify-center gap-4'>
         <Button  variant="contained" onClick={onLogout}>YES</Button>
         <Button  variant="outlined" onClick={()=>{
           navigate('/dashboard');
         }}>Cancel</Button>
      </div>
      
    </div>
  )
}

export default Logout
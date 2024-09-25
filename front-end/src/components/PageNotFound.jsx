import React from 'react';
import { TbCloudExclamation } from "react-icons/tb";
import BackImage from "../assets/tx501-1@2x.png";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const PagenotFound = () => {
  return (
    <div className='w-full overflow-hidden h-screen relative bg-background flex flex-row justify-center items-start box-border'> 
      <img
        src={BackImage}
        alt=''
        className='h-[680px] w-[1200px] absolute top-[-20px] opacity-40 objective-cover'
      />
      <div className="relative">
        
          <div className='absolute text-[80px] font-bold text-[#42d4c8] mt-[120px] ml-[140px]'>
             <TbCloudExclamation/>
          </div>
          <div className="ml-[45px] text-[24px] md:sm:lg:text-[140px] leading-9 text-[#42d4c8] mt-[250px] russo-one-regular">
            404
          </div>
          <div className='text-[#ffffff] text-[35px] ml-[130px] mt-[30px] dm-serif-text-regular'>
            Oops!!
          </div>
          <div className='uppercase text-[#ffffff] text-[40px] black-ops-one-regular'>
            Page not found
          </div>
          
          <div className='absolute w-[300px] mt-[1px] ml-[30px]'>
            <div className='shadow-[0px_4px_25px_rgba(130,_155,_239,_0.48)]  rounded-lg bg-gradient-to-r from-[#49c8b7] py-2  to-[#446ae8] flex items-center justify-center opacity-120 hover:cursor-pointer'>
                <span className='text-white flex items-center text-[15px] font-medium'>
                    BACK TO HOME <DoubleArrowIcon className='ml-1'/>
                </span>
            </div>
          </div>
          
      </div>    
    </div>
  )
}

export default PagenotFound;
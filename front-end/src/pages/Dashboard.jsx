import React, { useEffect, useMemo, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Profile from '../assets/pexels-julian-jagtenberg-103123.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LineChart from '../components/LineChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MdCurrencyRupee } from "react-icons/md";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { GiStarsStack } from "react-icons/gi";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Stars from '../assets/stars.png';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useFormData } from "../context/FormDataContext";
import PagenotFound from '../components/PageNotFound';

const Dashboard = () => {
  const navigate = useNavigate();
  // const [userData, setUserData] = useState();
  // const [walletId,setWalletId] = useState();
  const [rate,setRate] = useState(null);
  const [time,setTime] = useState(null);

  const {userData,getSellerData} = useFormData();

const dates = new Date(time * 1000); 

const year = dates.getUTCFullYear();
const month = dates.getUTCMonth() + 1; // Months are zero-based
const day = dates.getUTCDate();
const hours = dates.getUTCHours();
const minutes = dates.getUTCMinutes();
const seconds = dates.getUTCSeconds();

const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} UTC`;

// const getCookieValue = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      setRate(response.data.rates.LKR);
      setTime(response.data.time_last_updated);
    } catch (error) {
      console.log('Error fetching the exchange rate', error);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  
  getSellerData();
  // Disable scrolling when the component is mounted
  document.body.classList.add('no-scroll');

  // Enable scrolling when the component is unmounted
  return () => {
    document.body.classList.remove('no-scroll');
  };
}, []);

  return (
    <div>
      {userData ? (
          
          <>
          <div className="flex items-center ml-[600px] mt-[-17px]">
    
              <div className="ml-[450px] shadow-[0px_4px_31px_rgba(130,_155,_239,_0.48)] rounded-full bg-gradient-to-r from-[#49c8b7] to-[#446ae8] flex items-center justify-center py-1 px-2 opacity-80">
                <NotificationsNoneIcon className="text-white"/>
                <div className='flex flex-col items-start justify-start pt-[5px] px-0 pb-0'>
                  <a className='[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[14px]'>15</a>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <div className='w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-slate-400 rounded-full'>
                  <img src={Profile} alt="Profile_Image" className='w-full h-full rounded-full object-cover' />
                </div>
                <p className='ml-[10px]'>{userData ? (userData.firstName) : 'null'}</p>
              </div>
            </div>
    
          <div className='ml-[250px] mt-[-20px] text-[#cecdcd] uppercase font-medium text-sm'>
             WALLETS
              <div className="flex space-x-2 mt-1">
                 <div className="border-box hover:border-blue-500 hover:cursor-pointer">
                   <div className='inner-box'>
                     <span className='white-text mr-2 text-[10px]'>1.9678</span>
                     <span className='gray-text text-[8px]'>USD</span>
                </div>
                <AttachMoneyIcon className='icon text-[24px]' />
                <span className='text-[8px] text-[#38bb4e]'>
                    <TrendingUpIcon className='icon ml-6 text-[16px]' />+12.5%
                </span>
            </div>
    
            <div className="border-box hover:border-blue-500 hover:cursor-pointer">
                <div className='inner-box'>
                    <span className='white-text text-[10px]'>23.234</span>
                    <span className='gray-text text-[8px] ml-[8px]'>LKR</span>
                </div>
                <MdCurrencyRupee className='icon text-[24px]' />
                <span className='text-[8px] text-[#af3e3e]'>
                    <TrendingDownIcon className='icon ml-6 text-[16px]' />-5.23%
                </span>
            </div>
    
            <div className='shadow-[0px_4px_25px_rgba(130,_155,_239,_0.48)] rounded-lg bg-gradient-to-r from-[#49c8b7] to-[#446ae8] flex items-center justify-center py-1 px-2 opacity-80 hover:cursor-pointer'>
                <span className='text-white flex items-center text-[10px]'>
                    UPGRADE YOUR PACKAGE <DoubleArrowIcon className='ml-1' />
                </span>
            </div>
        </div>
    </div>
    <div className='mt-3 ml-[200px]'> {/* Reduced the margin-top to decrease the gap */}
            <div className='mt-[-4px] ml-[50px] mb-[-60px]'> {/* Added negative margin-bottom */}
              <div className='text-[#d3d2d2] text-[10px]'>
                USD TO LKR CONVERSION CHART
              </div>
              <div>
               
                <span className=' text-[#79bdf5]'>1 USD</span>
                 = {rate} 
                 <span className= ' text-[#79bdf5]'>LKR</span>
                 </div>
              <div className='text-[#d3d2d2] text-[10px]'> Last update - {formattedDate}</div> 
            </div>
          </div>
    <div className='mt-[-130px] ml-[200px]'>
    <LineChart />
    </div>
    
        <div className='absolute top-[70px] left-[920px] w-[424px] h-[235px]'>
            <div className='absolute top-[0px] left-[0px] uppercase font-medium opacity-[0.5] text-sm'>
              Your Package
            </div>
            <div className='absolute top-[33px] left-[0px] w-[424px] h-[202px] text-background-dash'>
               <div className='absolute top-[0px] left-[0px] bg-[#183350] border-[0.5px] border-solid border-gray-600 box-border w-[424px] h-[170px]'>
               <div className='flex flex-row items-start justify-start py-[120px] pl-[60px]'>
               <div className='relative tracking-[1.25px] leading-[16px] uppercase font-medium bg-[#829BEF] text-white px-4 py-2 rounded-md w-[300px] text-center'>
                  Renew This Package
              </div>
             </div>
               </div>
                
              <div className='absolute top-[105.8px] left-[15.8px] border-gray-600 border-t-[2px] border-solid box-border w-[390.5px] h-[0.5px]'/>
                
                </div>
               <div className='absolute top-[65px] left-[32px] w-[182px] h-[45px] text-xs'>
                 <div className='absolute top-[36px] left-[0px] tracking-[1.25px] leading-[16px] capitalize opacity-[0.65]'>
                    100$ for 30,000 LKR
                 </div>
                 <div className=' relative top-[0px] left-[0px] text-5xl  tracking-[1.25px] leading-[16px] capitalize font-medium'>
                     GOLD MEMBER
                 </div>
               </div>
               {/* <GiStarsStack
                className='absolute top-[59px] left-[301px] w-[89px] h-[57px] object-cover text-[#FFDF00]'
               />      */}
               <img
                 src={Stars}
                 alt="stars"
                 className='absolute top-[59px] left-[301px] w-[89px] h-[57px] object-cover'
               />
          </div>
          <div className='absolute top-[290px] left-[920px] w-[424px] h-[235px]'>
      <div className='top-[0px] left-[0px] uppercase font-medium opacity-[0.5] text-sm'>
        Recent Requests
      </div>
      <div className='top-[33px] left-[0px] w-[424px] flex flex-col items-start justify-start gap-2 text-xs'>
        <div className='self-stretch rounded bg-[#183350] w-full flex flex-row items-start justify-start p-2 relative gap-2'>
          <AccountBoxIcon className='text-white w-16 relative rounded-sm h-[60px] object-cover z-[0]' />
          <div className='flex flex-col items-start justify-start gap-[1.5] z-[1]'>
            <div className='relative font-medium'>Nadeesha Gamage</div>
            <div className='relative text-3xs text-gray-400'>
              <span>Request</span>
              <span className='font-medium text-m3-white'>40 $</span>
              <span className='whitespace-pre-wrap '>from you. Request ID is #987134</span>
            </div>
          </div>
          <div className='w-[100px] absolute !m-[0] top-[8px] left-[310px] text-3xs text-gray-400 inline-block z-[2]'>
            JUL 24 | 03:10 PM 
          </div>
          <div className='!m-[0] absolute top-[40px] left-[354px] rounded-sm border-success border-[2px] border-solid border-[#258b4d] flex flex-row items-center justify-center py-1 px-3 z-[3] text-success'>
            <div className='relative leading-[130%] font-medium text-[#258b4d]'>Accept</div>    
          </div>
          <div className='!m-[0] absolute top-[44px] left-[282px] rounded flex flex-row items-center justify-center py-1 px-3 z-[4] text-text-headings'>
            <div className='relative leading-[130%] font-medium '>Medium</div>
          </div>
        </div>
    
        <div className='self-stretch rounded bg-[#183350] w-full flex flex-row items-start justify-start p-2 relative gap-2'>
          <AccountBoxIcon className='text-white w-16 relative rounded-sm h-[60px] object-cover z-[0]' />
          <div className='flex flex-col items-start justify-start gap-[1.5] z-[1]'>
            <div className='relative font-medium'>Pavan Silva</div>
            <div className='relative text-3xs text-gray-400'>
              <span>Request</span>
              <span className='font-medium text-m3-white'>40 $</span>
              <span className='whitespace-pre-wrap '>from you. Request ID is #760981</span>
            </div>
          </div>
          <div className='w-[100px] absolute !m-[0] top-[8px] left-[310px] text-3xs text-gray-400 inline-block z-[2]'>
            JUL 24 | 05:45 PM 
          </div>
          <div className='!m-[0] absolute top-[40px] left-[354px] rounded-sm border-success border-[2px] border-solid border-[#258b4d] flex flex-row items-center justify-center py-1 px-3 z-[3] text-success'>
            <div className='relative leading-[130%] font-medium text-[#258b4d]'>Accept</div>    
          </div>
          <div className='!m-[0] absolute top-[44px] left-[282px] rounded flex flex-row items-center justify-center py-1 px-3 z-[4] text-text-headings'>
            <div className='relative leading-[130%] font-medium '>Medium</div>
          </div>
        </div>
    
        <div className='self-stretch rounded bg-[#183350] w-full flex flex-row items-start justify-start p-2 relative gap-2'>
          <AccountBoxIcon className='text-white w-16 relative rounded-sm h-[60px] object-cover z-[0]' />
          <div className='flex flex-col items-start justify-start gap-[1.5] z-[1]'>
            <div className='relative font-medium'>Farwees Farsan</div>
            <div className='relative text-3xs text-gray-400'>
              <span>Request</span>
              <span className='font-medium text-m3-white'>40 $</span>
              <span className='whitespace-pre-wrap '>from you. Request ID is #123456</span>
            </div>
          </div>
          <div className='w-[100px] absolute !m-[0] top-[8px] left-[310px] text-3xs text-gray-400 inline-block z-[2]'>
            JUL 23 | 02:30 PM 
          </div>
          <div className='!m-[0] absolute top-[40px] left-[354px] rounded-sm border-success border-[2px] border-solid border-[#258b4d] flex flex-row items-center justify-center py-1 px-3 z-[3] text-success'>
            <div className='relative leading-[130%] font-medium text-[#258b4d]'>Accept</div>    
          </div>
          <div className='!m-[0] absolute top-[44px] left-[282px] rounded flex flex-row items-center justify-center py-1 px-3 z-[4] text-text-headings'>
            <div className='relative leading-[130%] font-medium '>Medium</div>
          </div>
        </div>
        <div className='self-stretch rounded bg-[#183350] w-full flex flex-row items-start justify-start p-2 relative gap-2'>
          <AccountBoxIcon className='text-white w-16 relative rounded-sm h-[60px] object-cover z-[0]' />
          <div className='flex flex-col items-start justify-start gap-[1.5] z-[1]'>
            <div className='relative font-medium'>Farwees Farsan</div>
            <div className='relative text-3xs text-gray-400'>
              <span>Request</span>
              <span className='font-medium text-m3-white'>40 $</span>
              <span className='whitespace-pre-wrap '>from you. Request ID is #123456</span>
            </div>
          </div>
          <div className='w-[100px] absolute !m-[0] top-[8px] left-[310px] text-3xs text-gray-400 inline-block z-[2]'>
            JUL 23 | 02:30 PM 
          </div>
          <div className='!m-[0] absolute top-[40px] left-[354px] rounded-sm border-success border-[2px] border-solid border-[#258b4d] flex flex-row items-center justify-center py-1 px-3 z-[3] text-success'>
            <div className='relative leading-[130%] font-medium text-[#258b4d]'>Accept</div>    
          </div>
          <div className='!m-[0] absolute top-[44px] left-[282px] rounded flex flex-row items-center justify-center py-1 px-3 z-[4] text-text-headings'>
            <div className='relative leading-[130%] font-medium '>Medium</div>
          </div>
        </div>
        {/* Repeat this structure for each request */}
          </div> 
        </div> 
    
        <div className='uppercase text-[12px] absolute top-[420px] left-[270px] font-medium text-gray-400'>Recent Transaction</div>
        <div className='ml-[300px] mt-[-240px]'>
          <div className='mt-[-110px] ml-[-50px]'>
              <div className='w-[620px] bg-[#19303f]'>
               <table className='w-full text-[12px] rounded-[7px]'>
                 <thead className='bg-gray-600'>
                   <tr className='text-[#47b5d1]'>
                     <th className='px-4 py-1 text-center'>Id</th>
                     <th className='px-4 py-1 text-center'>Date</th>
                     <th className='px-4 py-1 text-center'>Seller</th>
                     <th className='px-4 py-1 text-center'>Account (USD)</th>
                     <th className='px-4 py-1 text-center'>Account (LKR)</th>
                     <th className='px-4 py-1 text-center'>Status</th>
                   </tr>
                 </thead>
                <tbody className='text-gray-200'>
                   <tr>
                     <td className='px-4 py-2 text-center'>#1234</td>
                     <td className='px-4 py-2 text-center'>08.06.2024</td>
                     <td className='px-4 py-2 text-center'>Jenny Bell</td>
                     <td className='px-4 py-2 text-center'>30 USD</td>
                     <td className='px-4 py-2 text-center'>90,000 LKR</td>
                     <td className='px-4 py-2 text-center'>
                     <span className="bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md">
                      Active</span>
                        
                     </td>
                   </tr>
    
                   <tr>
                     <td className='px-4 py-2 text-center'>#1235</td>
                     <td className='px-4 py-2 text-center'>08.06.2024</td>
                     <td className='px-4 py-2 text-center'>Jenny Bell</td>
                     <td className='px-4 py-2 text-center'>30 USD</td>
                     <td className='px-4 py-2 text-center'>90,000 LKR</td>
                     <td className='px-4 py-2 text-center'>
                      <span className='bg-[#CD853F] bg-opacity-[0.4] text-[#e2953c] py-1 px-2 rounded-md shadow-md'>
                         Pending
                      </span>
                     </td>
                    </tr>
    
                    <tr>
                     <td className='px-4 py-2 text-center'>#1236</td>
                     <td className='px-4 py-2 text-center'>08.06.2024</td>
                     <td className='px-4 py-2 text-center'>Jenny Bell</td>
                     <td className='px-4 py-2 text-center'>30 USD</td>
                     <td className='px-4 py-2 text-center'>90,000 LKR</td>
                     <td className='px-4 py-2 text-center'>
                       <span className='bg-[#B22222] bg-opacity-[0.4] text-[#e03b3b] py-1 px-2 rounded-md shadow-md'>
                            Declined
                       </span>
                     </td>
                    </tr>
    
                     <tr>
                      <td className='px-4 py-2 text-center'>#1236</td>
                      <td className='px-4 py-2 text-center'>08.06.2024</td>
                      <td className='px-4 py-2 text-center'>Jenny Bell</td>
                      <td className='px-4 py-2 text-center'>30 USD</td>
                      <td className='px-4 py-2 text-center'>90,000 LKR</td>
                      <td className='px-4 py-2 text-center'>
                       <span className="bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md">
                          Active
                       </span>
                      </td>
                      </tr>
    
                      <tr>
                      <td className='px-4 py-2 text-center'>#1236</td>
                      <td className='px-4 py-2 text-center'>08.06.2024</td>
                      <td className='px-4 py-2 text-center'>Jenny Bell</td>
                      <td className='px-4 py-2 text-center'>30 USD</td>
                      <td className='px-4 py-2 text-center'>90,000 LKR</td>
                      <td className='px-4 py-2 text-center'>
                       <span className="bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md">
                          Active
                       </span>
                      </td>
                      </tr>
               </tbody>
            </table>
          </div>
              </div>
             </div>
             </>

      ):(
        <PagenotFound/>
      )}
      
       </div>
     
  );
}

export default Dashboard;
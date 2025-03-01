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
import { FaDollarSign, FaHourglassHalf, FaCrown } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import Stars from '../assets/stars.png';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useFormData } from "../context/FormDataContext";
import PagenotFound from '../components/PageNotFound';
import {message} from 'antd';
import { Table } from "antd";
const { Column } = Table;


const Dashboard = () => {
  const navigate = useNavigate();
  const [rate,setRate] = useState(null);
  const [time,setTime] = useState(null);
  const [requests, setRequests] = useState([]);
  const [buyerBreakdown, setBuyerBreakdown] = useState([]);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [totalTransactionAmount, setTotalTransactionAmount] = useState(0);

  
    

  const {userData,getSellerData} = useFormData();

const dates = new Date(time * 1000); 

const year = dates.getUTCFullYear();
const month = dates.getUTCMonth() + 1; // Months are zero-based
const day = dates.getUTCDate();
const hours = dates.getUTCHours();
const minutes = dates.getUTCMinutes();
const seconds = dates.getUTCSeconds();

const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} UTC`;


useEffect(() => {
  fetchRequests();
},[]);

const fetchRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }
    const response = await axios.get("http://localhost:3001/getRequests", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Format the createdAt field
    const formattedData = response.data.data.map(request => ({
      ...request,
      formattedDate: new Date(request.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    }));

    setRequests(formattedData);
  } catch (error) {
    console.error("Error fetching requests:", error);
    setRequests([]);
  }
};

useEffect(() => {
  console.log("Updated requests state:", requests);
}, [requests]);  // This runs whenever requests state updates
 // Log whenever requests update

 


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


useEffect(() => {
  const fetchPerformanceData = async () => {
    try {
      const token = localStorage.getItem('token');
               if(!token){
                console.log("Token not found");
                return
              }
      const response = await axios.get('http://localhost:3001/getTotalTransactionInfo',{
        headers:{ Authorization:`Bearer ${token}`}
      });
       console.log("Performance data",response.data);
      if (response.data.success) {
        setBuyerBreakdown(response.data.buyerBreakdown);
        setTotalPendingAmount(response.data.totalPendingAmount);
        setTotalTransactionAmount(response.data.totalTransactionAmount);
      }

      console.log("Buyer Breakdown",buyerBreakdown);
      console.log("total pending amount",totalPendingAmount);
      console.log("totla transaction amount",totalTransactionAmount);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  fetchPerformanceData();
}, []);
  return (
    <div>
      {userData ? (
          
          <>
          <div className="flex items-center ml-[600px] mt-[-17px]">
              <div className="flex items-center ml-[500px]">
                <div className='w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-slate-400 rounded-full'>
                  <img src={Profile} alt="Profile_Image" className='w-full h-full rounded-full object-cover' />
                </div>
                <p className='ml-[10px]'>{userData ? (userData.firstName +' '+ userData.lastName) : 'null'}</p>
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
              
               <img
                 src={Stars}
                 alt="stars"
                 className='absolute top-[59px] left-[301px] w-[89px] h-[57px] object-cover'
               />
          </div>
          <div className='absolute top-[290px] left-[920px] w-[424px] h-[235px]'>
      <div className='top-[0px] left-[0px] uppercase font-medium opacity-[0.5] text-sm'>
        Recent Requests from Buyers
      </div>

      <div className='top-[33px] left-[0px] w-[424px] flex flex-col items-start justify-start gap-2 text-xs'>
{requests.length > 0 ? (
  requests.map((req, index) => (
    <div key={index} className='self-stretch rounded bg-[#183350] w-full flex flex-row items-start justify-start p-2 relative gap-2'>
       <AccountBoxIcon className='text-white w-16 relative rounded-sm h-[60px] object-cover z-[0]' />
       <div className='flex flex-col items-start justify-start gap-[1.5] z-[1]'>
       <p className='relative font-medium'>From: {req.user?.firstName} {req.user?.lastName}</p>
       <p className='whitespace-pre-wrap absolute top-[20px]'>Req id: {req._id}</p>
       <div className='relative text-3xs text-gray-400'>
       <span>Request Amount:</span>
       <span className='font-medium text-m3-white'>{req.amount}$</span>
       
       </div>
       </div>
       <div className='w-[200px] absolute !m-[0] top-[8px] left-[230px] text-3xs text-gray-400 inline-block z-[2]'>
       {req.formattedDate}
            </div>
            <div
              className={`!m-[0] absolute top-[40px] left-[335px] rounded-sm border-[2px] border-solid flex flex-row items-center justify-center py-1 px-3 z-[3] ${
              req.status === 'Pending' ? 'border-[#FFA500] text-[#FFA500]' : 
              req.status === 'Accepted' ? 'border-[#258b4d] text-[#258b4d]' : 
              req.status === 'Rejected' ? 'border-[#FF0000] text-[#FF0000]' : ''
             }`}
            >
  <div className="relative leading-[130%] font-medium">
    {req.status}
  </div>
  </div>
      
       </div>
       ))
       ) : (
        <p>No requests found</p>
      )}  
          </div> 
        </div> 
        <div className='uppercase text-[12px] absolute top-[420px] left-[270px] font-medium text-gray-400'>Performance & Sales History</div>
            <div className='absolute top-[450px] left-[250px] grid grid-cols-1 sm:grid-cols-3 gap-2 p-2'>
            <div className="bg-green-100 shadow-lg rounded-lg p-3 flex items-center justify-between">
             <div>
               <h2 className="text-[20px] font-semibold text-gray-700">Total Sales</h2>
               <p className="text-[17px] font-bold text-green-600">$ {totalTransactionAmount}</p>
               <p className="text-[15px] text-gray-500">+12% from last month</p>
             </div>
                <FcSalesPerformance className="text-green-500 text-8xl" />
             </div>
  
             <div className="bg-orange-100 shadow-lg rounded-lg p-3 flex items-center justify-between">
             <div>
               <h2 className="text-[20px] font-semibold text-gray-700">Pending Requests</h2>
               <p className="text-[17px] font-bold text-orange-600">$ {totalPendingAmount}</p>
               <p className="text-[15px] text-gray-500">Processing transactions</p>
             </div>
             <FaHourglassHalf className="text-orange-500 text-4xl" />
           </div>
          

         {buyerBreakdown.length > 0 ? (
           <div>
             {buyerBreakdown.map((buyer) => (
              <div key={buyer.userId} className='bg-blue-100 shadow-lg rounded-lg p-3 flex items-center justify-between'>
                <div>
                 <h2 className="text-[20px] font-semibold text-gray-700">Top Buyer</h2>
                 <p className="text-[17px] font-bold text-blue-600">{buyer.name}</p>
                 <p className="text-[15px] font-bold text-blue-600">Saled Amount: ${buyer.totalSpent}</p>
                </div>
                  <FaCrown className="text-yellow-500 text-4xl" />
                </div>
               ))}
             </div>
      ) : (
        <p>No buyer data available.</p>
      )}      
   </div>  
        </>
      ):(
        <PagenotFound/>
      )}
      
       </div>
     
  );
}

export default Dashboard;
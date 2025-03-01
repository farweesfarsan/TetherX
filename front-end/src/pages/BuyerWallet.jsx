import React, { useEffect, useState } from 'react';
import { useFormData } from "../context/FormDataContext";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Profile from '../assets/pexels-julian-jagtenberg-103123.jpg';
import Gift from '../assets/gift-box.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PagenotFound from '../components/PageNotFound';
import TransferModel from '../components/TransferModel';
import DepositModel from '../components/DepositModel';
import axios from "axios";
import {message} from 'antd';

const Wallet = () => {
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [balanceLKR, setBalanceLKR] = useState(0);
  const [activeSection, setActiveSection] = useState('Overview'); // State to track active section

  const { userData, getSellerData } = useFormData();
  const [showTrnsferFund, setShowTrnsferFund] = React.useState(false);
  const [depositFund,setDepositFund] = React.useState(false);
  const [buttenText,setButtonText] = React.useState("USE IT");
  const [loading, setLoading] = useState(false);
  const [depositInfo,setDepositInfo] = useState([]);
  // const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check localStorage on component mount
    const storedButtonText = localStorage.getItem("buttonText");
    if (storedButtonText) {
      setButtonText(storedButtonText);
    }
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found");
            return;
        }

        const response = await axios.post(
            "http://localhost:3001/wallet/addHundredDollers",
            {},
            { headers: { Authorization: `Bearer ${token}` } } // Pass headers separately
        );

        
         if (response.status === 200){
          setButtonText("Got 100USD");
          localStorage.setItem("buttonText", "Get 100 USD");
          // setSuccessMessage("You got 100USD successfully!");
          message.success(response.data.message);
      }

        
    } catch (error) {
        console.error("Error adding 100 USD:", error);
        // setSuccessMessage("There was an issue. Please try again.");
        
      if (error.response && error.response.status === 400) {
          message.error(error.response.data.message || "Bad Request");
      } else {
          message.error("There was an issue. Please try again.");
      }
        
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    getSellerData();
    fetchDepositInfo();
  }, []);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setBalanceUSD(userData.balanceUSD);
        setBalanceLKR("0");
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };
    fetchWalletData();
  }, [userData]);

  const fetchDepositInfo = async ()=>{
    try {
      const token = localStorage.getItem("token");
      if(!token){
        console.log("Token not found");
        return
      }
    
      const response = await axios.get("http://localhost:3001/getDepositedData",{
        headers:{ Authorization:`Bearer ${token}`}
      });
      console.log("deposit info",response.data);
    
      const changedData = response.data.data.map(request=>({
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
      setDepositInfo(changedData);
      console.log("Updated deposit info",depositInfo);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setDepositInfo([]);
    }    
  };
  
  useEffect(() => {
    console.log("Updated depositInfo state:", depositInfo);
  }, [depositInfo]);
  

  return (
    <div>
      {userData ? (
        <>
          {/* Header Section */}
          <div className='flex justify-between items-center ml-[250px]'>
            <div className='text-[25px]'>
              My Wallet
            </div>
            <div className="flex items-center mr-[120px]">
              <div className="shadow-[0px_4px_31px_rgba(130,_155,_239,_0.48)] rounded-full bg-gradient-to-r from-[#49c8b7] to-[#446ae8] flex items-center justify-center py-1 px-2 opacity-80 ">
                <NotificationsNoneIcon className="text-white" />
                <div className='flex flex-col items-start justify-start pt-[5px] px-0 pb-0'>
                  <a className='[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[14px]'>15</a>
                </div>
              </div>
              <div className="flex items-center ml-[20px]">
                <div className='w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-slate-400 rounded-full'>
                  <img src={Profile} alt="Profile_Image" className='w-full h-full rounded-full object-cover' />
                </div>
                <p className='ml-[10px]'>{userData.firstName}</p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className='ml-[800px] flex flex-row gap-10 mt-[30px] text-[15px] cursor-pointer'>
            <div
              className={`bg-gray-700 px-3 py-1 rounded-md hover:text-[#458ab3] ${activeSection === 'Overview' ? 'text-[#458ab3]' : ''}`}
              onClick={() => setActiveSection('Overview')}
            >
              Overview
            </div>
            <div
              className={`bg-gray-700 px-3 py-1 rounded-md hover:text-[#458ab3] ${activeSection === 'Transfer' ? 'text-[#458ab3]' : ''}`}
              onClick={() => setShowTrnsferFund(true)}
            >
              Transfer
            </div>
            <div
              className={`bg-gray-700 px-3 py-1 rounded-md hover:text-[#458ab3] ${activeSection === 'Deposit' ? 'text-[#458ab3]' : ''}`}
              onClick={() => setDepositFund(true)}
            >
              Deposit
            </div>
            <div
              className={`bg-gray-700 px-3 py-1 rounded-md hover:text-[#458ab3] ${activeSection === 'Withdraw' ? 'text-[#458ab3]' : ''}`}
              onClick={() => setActiveSection('Withdraw')}
            >
              Withdraw
            </div>
          </div>

          {/* Conditionally Rendered Sections */}
          {activeSection === 'Overview' && (
            <>
              <div className='bg-gray-700 px-12 py-12 ml-[250px] mt-[30px] w-[1000px]'>
                <div className='mt-[-30px] ml-[-30px] font-medium text-[15px]'>Available Balance</div>
                <div className='flex flex-row'>
                  <div className='font-medium text-[40px] ml-[-30px]'>{balanceUSD.toFixed(4)}</div>
                  <div className='mt-[25px] ml-[20px] font-medium'>USDT</div>
                </div>
                <div className=' absolute ml-[-30px] mt-[10px] text-gray-300'>{balanceLKR} LKR</div>

                <div className='ml-[750px] mt-[-70px] text-[20px] font-medium'>Wow! You Will Get</div>
                <div className='ml-[720px] text-[30px] font-medium'><span className='text-[#3e67c0]'>FREE</span><span className='ml-[10px]'>100USDT</span></div>
                <div className=' absolute w-[200px] mt-[1px] ml-[720px]'>
                  <div className='shadow-[0px_4px_25px_rgba(130,_155,_239,_0.48)] rounded-lg bg-gradient-to-r from-[#49c8b7] py-2 to-[#446ae8] flex items-center justify-center opacity-80 hover:cursor-pointer'>
                    <span className='text-white flex items-center text-[15px] font-medium' onClick={handleClick} disabled={loading}>
                    {buttenText}
                    </span>
                    
                  </div>
                </div>
                <div className='absolute ml-[550px] mt-[-90px]'>
                  <img
                    src={Gift}
                    className='w-[150px] h-[150px]'
                  />
                </div>
              </div>

              <div className='ml-[250px] text-[12px] mt-[20px] text-[#888686] uppercase font-medium'>
                Deposits History
              </div>
              <div className='absolute mt-[10px] ml-[250px] border-[0.5px] border-solid border-gray-600 box-border w-[1000px] h-[270px]'>
                <div className='ml-[20px] mt-[5px]'>
                  <span>All</span> <KeyboardArrowDownIcon className='absolute mt-[-5px]' />
                </div>
                <div className='absolute mt-[10px] bg-[#183350] ml-[30px] border-[0.5px] border-solid border-gray-600 box-border w-[940px] h-[220px] '>
                <table className='w-full text-[12px] rounded-[7px]'>
                 <thead className='bg-gray-600'>
                   <tr className='text-[#47b5d1]'>
                     <th className='px-4 py-1 text-center'>Id</th>
                     <th className='px-4 py-1 text-center'>Date</th>
                     <th className='px-4 py-1 text-center'>Reciever</th>
                     <th className='px-4 py-1 text-center'>Account (USD)</th>
                     <th className='px-4 py-1 text-center'>Status</th>
                   </tr>
                 </thead>
                 <tbody>
         {depositInfo.length > 0 ? (
      depositInfo.map(deposit => (
        <tr key={deposit._id}>
          <td >{deposit._id}</td>
          <td>{deposit.formattedDate}</td>
          <td>{deposit.receiverName}</td>
          <td>{deposit.amount} $</td>
          <td>{deposit.status}</td>
        </tr>
      ))
    ) : (
      <p>No deposits available</p>
    )}
  </tbody>
            </table>
                </div>
              </div>
            </>
          )}

          {showTrnsferFund && (
            <TransferModel
            showTrnsferFund={showTrnsferFund}
            setShowTrnsferFund={setShowTrnsferFund}
            />
          )}

          {depositFund && (
            <DepositModel
            depositFund={depositFund}
            setDepositFund={setDepositFund}
            />
          )}

          {activeSection === 'Transfer' && (
            <div className='px-12 py-12 ml-[250px] mt-[-20px] w-[1000px]'>
              <p className='text-white'>New Transaction</p>
            </div>
          )}

          {activeSection === 'Deposit' && (
            <div className='px-12 py-12 ml-[250px] mt-[-20px] w-[1000px]'>
              <p className='text-white'>Deposit Section</p>
            </div>
          )}
        </>
      ) : (
        <PagenotFound />
      )}
    </div>
  );
}

export default Wallet;
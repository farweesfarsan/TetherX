// import { Button, Input, message } from 'antd';
// import React, { useEffect,useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import { FaUserLarge } from "react-icons/fa6";
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import { useFormData } from "../context/FormDataContext";

// const Transaction = () => {
//   const {sellers} = useFormData();
//   const [balanceUSDAmount,setBalanceUSDAmount] = useState();
//   const [sellersName,setSellersName] = useState();

//   useEffect(()=>{

//    const fetchAllSellerData = async () =>{
//          try {
//            setBalanceUSDAmount(sellers.balanceUSD);
//            setSellersName(sellers.sellerDetails.firstName); 
//          } catch (error) {
//             console.error('Error fetching wallet data:', error);
//          }
//    };
//      fetchAllSellerData();
//   },[sellers]);
//   return (
//     <>
//      <div className='ml-[20%] text-[20px]'>
//       Sellers

//       <div className='flex items-center gap-3 mt-[3%]'>
//       <Input
//         prefix={<SearchIcon className='text-[#9c9c9c]' />}
//         placeholder="Type to Search"
//         className='w-[30%] h-[35px] bg-[#183350] text-white border-none focus:outline-none'
//         style={{ 
//           backgroundColor: '#183350',  // Set default background color
//            color: 'white'               // Set text color to white
//         }}
//           onChange={(e) => setQuery(e.target.value)}
//           onMouseLeave={(e) => e.target.style.backgroundColor = '#183350'} // Maintain background when mouse leaves
//          />
        

//         <Button
//           className='w-[100px] h-[35px] flex justify-center items-center bg-[#829BEF] border-none text-[18px] font-medium'
//         >
//           Search
//         </Button>
//       </div>  
//     </div>

// <div className='ml-[300px] flex relative gap-4 mt-10 flex-wrap'>
//  <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">Farwees Farsan</div>
//    <div className='absolute top-0 left-0 bg-[#c08833] text-[12px] justify-center items-center flex px-2 rounded-md'>Top Seller</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">David Warner</div>
//    <div className='absolute top-0 left-0 bg-[#c08833] text-[12px] justify-center items-center flex px-2 rounded-md'>Top Seller</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">Kane Willomson</div>
//    <div className='absolute top-0 left-0 bg-[#c08833] text-[12px] justify-center items-center flex px-2 rounded-md'>Top Seller</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">Peter Parker</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex"><span>Cameron Green</span></div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">Mahindra Singh Doni</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex"><span>Christopher Nolan</span></div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex"><span>Thanos</span></div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex">Allen</div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex"><span>Jack Sparrow</span></div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>302 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
// <div className="bg-gray-800 pl-[320px] pt-[220px] relative">
//    <div className="absolute top-10 left-[120px] gap-3 flex"><span>Same Anderson</span></div>
//    <div className="text-[80px] absolute top-10 left-5">
//       <FaUserLarge />
//    </div>
//   <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//      <CurrencyExchangeIcon />
//      <span>240 LKR</span><span className='text-[#a3a2a2] text-[30px]'>|</span>
//      <div className='flex flex-col text-[#3065aa]'><span>MAX:80</span><span>USD</span></div> 
//   </div>
//   <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//      <span className='text-[#2fa85d]'>32 Completed</span>
//      <span className='text-[#b63434]'>5 Declined</span>
//   </div>
//   <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//     <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold">
//          Send Request
//     </button>
//   </div>

// </div>
  
// </div>

//       {/* <div className='ml-[300px] flex relative gap-4 mt-10 flex-wrap'>
        
//         {[...Array(12)].map((_, index) => (
//           <div key={index} className='bg-gray-800 flex justify-start items-center w-[300px] h-[200px] p-4'>
//             <div className='text-[40px]'>
//               <FaUserLarge />
//             </div>
//           </div>
//         ))}
//       </div> */}
//     </>
    

    
//   );
// };

// export default Transaction;



// import { Button, Input } from 'antd';
// import React, { useEffect, useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import { FaUserLarge } from "react-icons/fa6";
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import { useFormData } from "../context/FormDataContext";
// import RequestModel from '../components/RequestModel';

// const BuyerTransaction = () => {
//   const { sellers } = useFormData();
//   const [sellerData, setSellerData] = useState([]);
//   const [query, setQuery] = useState(""); 
//   const [requestModel, setRequestModel] = useState(false);

//   useEffect(() => {
//     const fetchAllSellerData = () => {
//       try {
//         console.log("Sellers data in Transaction:", sellers);
//         const sellerDetail = sellers.map(seller => ({
//           first_name: seller.sellerDetails?.firstName || "N/A",
//           last_name: seller.sellerDetails?.lastName || "L/A",
//           balanceUSD: seller.balanceUSD || 0
//         }));
//         setSellerData(sellerDetail);
//       } catch (error) {
//         console.error("Error fetching seller data:", error);
//       }
//     };
//     fetchAllSellerData();
//   }, [sellers]);

//   return (
//     <>
//       <div className={`ml-[20%] text-[20px] ${requestModel ? "blur-sm" : ""}`}>
//         Sellers
//         <div className='flex items-center gap-3 mt-[3%]'>
//           <Input
//             prefix={<SearchIcon className='text-[#9c9c9c]' />}
//             placeholder="Type to Search"
//             className='w-[30%] h-[35px] bg-[#183350] text-white border-none focus:outline-none'
//             style={{ backgroundColor: '#183350', color: 'white' }}
//             onChange={(e) => setQuery(e.target.value)} 
//             onMouseLeave={(e) => e.target.style.backgroundColor = '#183350'}
//           />
//           <Button className='w-[100px] h-[35px] flex justify-center items-center bg-[#829BEF] border-none text-[18px] font-medium'>
//             Search
//           </Button>
//         </div>
//       </div>

//       <div className={`ml-[300px] flex relative gap-4 mt-10 flex-wrap ${requestModel ? "blur-sm" : ""}`}>
//         {sellerData.map((seller, index) => (
//           <div key={index} className="bg-gray-800 pl-[320px] pt-[220px] relative">
//             <div className="absolute top-10 left-[120px] gap-3 flex">{seller.first_name} {seller.last_name}</div>
//             <div className='absolute top-0 left-0 bg-[#c08833] text-[12px] justify-center items-center flex px-2 rounded-md'>Top Seller</div>
//             <div className="text-[80px] absolute top-10 left-5">
//               <FaUserLarge />
//             </div>
//             <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//               <CurrencyExchangeIcon />
//               <span>{seller.balanceUSD} USD</span>
//               <span className='text-[#a3a2a2] text-[30px]'>|</span>
//               <div className='flex flex-col text-[#3065aa]'>
//                 <span>MAX: 80</span>
//                 <span>USD</span>
//               </div>
//             </div>
//             <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
//               <span className='text-[#2fa85d]'>Completed</span>
//               <span className='text-[#b63434]'>Declined</span>
//             </div>
//             <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
//               <button className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold cursor-pointer"
//                onClick={() => setRequestModel(true)}
//               >
//                 Send Request
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {requestModel && (
//         <RequestModel
//           requestModel={requestModel}
//           setRequestModel={setRequestModel}
//         />
//       )}
//     </>
//   );
// };

// export default BuyerTransaction;


import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import { FaUserLarge } from "react-icons/fa6";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useFormData } from "../context/FormDataContext";
import RequestModel from '../components/RequestModel';

const BuyerTransaction = () => {
  const { sellers } = useFormData();
  const [sellerData, setSellerData] = useState([]);
  const [query, setQuery] = useState(""); 
  const [requestModel, setRequestModel] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // New state to store selected sellerId

  useEffect(() => {
    const fetchAllSellerData = () => {
      try {
        const sellerDetail = sellers.map(seller => ({
          first_name: seller.sellerDetails?.firstName || "N/A",
          last_name: seller.sellerDetails?.lastName || "L/A",
          balanceUSD: seller.balanceUSD || 0,
          userId: seller.userId // Include sellerId here
        }));
        setSellerData(sellerDetail);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };
    fetchAllSellerData();
  }, [sellers]);

  const handleSendRequest = (userId) => {
    setSelectedUserId(userId); // Set selected sellerId
    setRequestModel(true);
  };

  return (
    <>
      <div className={`ml-[20%] text-[20px] ${requestModel ? "blur-sm" : ""}`}>
        Sellers
        <div className='flex items-center gap-3 mt-[3%]'>
          <Input
            prefix={<SearchIcon className='text-[#9c9c9c]' />}
            placeholder="Type to Search"
            className='w-[30%] h-[35px] bg-[#183350] text-white border-none focus:outline-none'
            style={{ backgroundColor: '#183350', color: 'white' }}
            onChange={(e) => setQuery(e.target.value)} 
            onMouseLeave={(e) => e.target.style.backgroundColor = '#183350'}
          />
          <Button className='w-[100px] h-[35px] flex justify-center items-center bg-[#829BEF] border-none text-[18px] font-medium'>
            Search
          </Button>
        </div>
      </div>

      <div className={`ml-[300px] flex relative gap-4 mt-10 flex-wrap ${requestModel ? "blur-sm" : ""}`}>
        {sellerData.map((seller, index) => (
          <div key={index} className="bg-gray-800 pl-[320px] pt-[220px] relative">
            <div className="absolute top-10 left-[120px] gap-3 flex">{seller.first_name} {seller.last_name}</div>
            <div className='absolute top-0 left-0 bg-[#c08833] text-[12px] justify-center items-center flex px-2 rounded-md'>Top Seller</div>
            <div className="text-[80px] absolute top-10 left-5">
              <FaUserLarge />
            </div>
            <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
              <CurrencyExchangeIcon />
              <span>{seller.balanceUSD} USD</span>
              <span className='text-[#a3a2a2] text-[30px]'>|</span>
              <div className='flex flex-col text-[#3065aa]'>
                <span>MAX: 80</span>
                <span>USD</span>
              </div>
            </div>
            <div className="absolute top-[130px] left-[120px] text-[14px] flex gap-4">
              <span className='text-[#2fa85d]'>Completed</span>
              <span className='text-[#b63434]'>Declined</span>
            </div>
            <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 mt-2 flex justify-center items-center">
              <button
                className="bg-[#829BEF] px-[100px] py-3 text-center whitespace-nowrap rounded-md text-[15px] font-bold cursor-pointer"
                onClick={() => handleSendRequest(seller.userId)} // Pass sellerId when clicked
              >
                Send Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {requestModel && (
        <RequestModel
          requestModel={requestModel}
          setRequestModel={setRequestModel}
          userId={selectedUserId} // Pass selected sellerId to RequestModel
        />
      )}
    </>
  );
};

export default BuyerTransaction;

// import React, { useEffect, useState } from 'react';
// import { Button, Input } from 'antd';
// import { FaUserLarge } from "react-icons/fa6";
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import { useFormData } from "../context/FormDataContext";
// import RequestModel from '../components/RequestModel';

// const BuyerTransaction = () => {
//   const { sellers } = useFormData();
//   const [sellerData, setSellerData] = useState([]);
//   const [query, setQuery] = useState(""); 
//   const [requestModel, setRequestModel] = useState(false);

//   useEffect(() => {
//     const fetchAllSellerData = () => {
//       const sellerDetail = sellers.map(seller => ({
//         first_name: seller.sellerDetails?.firstName || "N/A",
//         last_name: seller.sellerDetails?.lastName || "N/A",
//         balanceUSD: seller.balanceUSD || 0,
//       }));
//       setSellerData(sellerDetail);
//     };
//     if (sellers.length > 0) fetchAllSellerData();
//   }, [sellers]);

//   return (
//     <>
//       <div className={`ml-[20%] text-[20px] ${requestModel ? "blur-sm" : ""}`}>
//         Sellers
//         <div className='flex items-center gap-3 mt-[3%]'>
//           <Input
//             placeholder="Type to Search"
//             onChange={(e) => setQuery(e.target.value)}
//             style={{ backgroundColor: '#183350', color: 'white' }}
//             className='w-[30%] h-[35px] bg-[#183350] text-white border-none'
//           />
//           <Button className='w-[100px] h-[35px] bg-[#829BEF]'>
//             Search
//           </Button>
//         </div>
//       </div>

//       <div className={`ml-[300px] flex relative gap-4 mt-10 flex-wrap ${requestModel ? "blur-sm" : ""}`}>
//         {sellerData.map((seller, index) => (
//           <div key={index} className="bg-gray-800 pl-[320px] pt-[220px] relative">
//             <div className="absolute top-10 left-[120px] gap-3 flex">
//               {seller.first_name} {seller.last_name}
//             </div>
//             <div className='absolute top-0 left-0 bg-[#c08833] px-2 rounded-md'>Top Seller</div>
//             <div className="text-[80px] absolute top-10 left-5">
//               <FaUserLarge />
//             </div>
//             <div className="absolute top-[80px] left-[120px] flex items-center gap-2">
//               <CurrencyExchangeIcon />
//               <span>{seller.balanceUSD} USD</span>
//               <div className='flex flex-col text-[#3065aa]'>
//                 <span>MAX: 80 USD</span>
//               </div>
//             </div>
//             <div className="absolute top-[130px] left-[120px]">
//               <button onClick={() => setRequestModel(true)}>Send Request</button>
//             </div>
//           </div>
//         ))}
//         <RequestModel requestModel={requestModel} setRequestModel={setRequestModel} />
//       </div>
//     </>
//   );
// };

// export default BuyerTransaction;
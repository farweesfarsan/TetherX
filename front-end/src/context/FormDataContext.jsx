import React, { createContext,useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [verifyCode,setVerifyCode] = useState("")
  const [userData, setUserData] = useState();
  const [sellerName,setSellerName] = useState();
  // const[sellerData,setSellerData] = useState();
  const [sellers,setSellers] = useState([]);
  const navigate = useNavigate();
  const [selectedRole,setSelectedRole] = useState(null);

  const handleCreateAccount = async (values) => {
    setFormData(values);
    console.log("Form data saved:", values.email);
    try {
      await sendEmail(values.email);
      console.log("Email sent successfully");
      navigate('/step-three'); // Corrected navigation path
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleBuyerAccount = async (values) =>{
    setFormData(values);
    console.log("Form data saved:",values.email);
    try {
      await sendEmail(values.email);
      console.log("Email sent successfully");
      navigate('/step-three-buyer');
    } catch (error) {
      console.error("Error sending email",error);
    }
  };

  const submitFormData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/addSeller", formData);
      console.log("Form data submitted successfully:", response.data);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
  };

  const submitFormDatForBuyer = async ()=>{
    try {
      const response = await axios.post("http://localhost:3001/addNewBuyers",formData);
      console.log("Buyer Form Data subitted successfully",response.data);
      
      return response.data;
    } catch (error) {
      if(error.response) {
        console.error("Error response data:", error.response.data);
      }else if (error.request){
        console.error("Error request:",error.request);
      }else{
        console.error("Error Message",error.message);
      }
      throw error;
    }
    

    return response.data;
  }

  const sendEmail = async (email) => {
    try {
      const response = await axios.post("http://localhost:3002/api/sendEmail", { email });
      console.log("Email sent successfully:", response.data);
      console.log(response.data.code);
      setVerifyCode(response.data.code);
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  

  const getSellerData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUserData(response.data);
    } catch (error) {
      console.log('Error fetching seller data', error.response ? error.response.data : error.message);
    }
  };

  const verifyAccount = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Payload sent to API:", payload);
  
      const response = await axios.post(
        'http://localhost:3001/verify-account', 
        payload, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Response from API:", response.data);
      
      // Set the seller name to the context state if verification is successful
      if (response.data.success) {
        setSellerName(response.data.data.sellerName); // Assuming setSellerName is a context setter
      }
      
      return response.data; // Return only the response data
    } catch (error) {
      console.error("Error verifying account:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : { error: error.message };
    }
  };

  const transferFunds = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3001/transfer-fund', payload);
      console.log("Received transfer response:", response.data);
      
      return response.data; // Make sure you're returning response.data, not response itself
    } catch (error) {
      console.error("Error during transfer:", error.response ? error.response.data : error.message);
      return error.response.data; // Ensure proper error handling
    }
  };

  const getAllUserTransaction = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        'http://localhost:3001/get-all-transactions-by-user',
        { _id: userId }, // Pass userId here
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in headers
        }
      );
      console.log("Transaction data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : error.message;
    }
  };

  const getSevenDaysTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData ? userData.userId : localStorage.getItem("userId"); // Retrieve userId
      if (!userId) {
        throw new Error("User ID is missing");
      }
  
      const { data } = await axios.post(
        'http://localhost:3001/get-last-seven-days-transactions',
        { _id: userId }, // Use the userId here
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Seven Days Transaction details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : error.message;
    }
  };

  const getTodayTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData ? userData.userId : localStorage.getItem("userId"); // Retrieve userId
      if (!userId) {
        throw new Error("User ID is missing");
      }
  
      const { data } = await axios.post(
        'http://localhost:3001/get-today-transaction',
        { _id: userId }, // Use the userId here
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Seven Days Transaction details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : error.message;
    }
  };

  // const updateBalanceUSD = (newBalance) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     userData: {
  //       ...prevState.userData,
  //       balanceUSD: newBalance,
  //     },
  //   }));
  // };

  // const updateBalanceUSD = (newBalance) => {
  //   console.log("Updating balanceUSD to:", newBalance); // Log new balance
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     userData: {
  //       ...prevState.userData,
  //       balanceUSD: newBalance,
  //     },
  //   }));
  // };

  const updateBalanceUSD = (newBalance) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      balanceUSD: newBalance,
    }));
  };
  


  const DepositFunds = async({token,amount,userId})=>{
    try {
      const {data} = await axios.post('http://localhost:3001/deposit-fund',{token,amount,userId});
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  const getSellerRequest = async ()=>{
    try { 
        const token = localStorage.getItem("token");
        const userId = userData ? userData.userId : localStorage.getItem("userId");

        if(!userId){
          throw new Error("User Id is missing");
        }

        const {data} = await axios.post('http://localhost:3001/get-all-request-from-user',

          {
           headers : { Authorization: `Bearer ${token}`},
          }
        );
        console.log("all seller requests",data);
        return data;
    } catch (error) {
       return error.response.data;
    }
  }

  
  

  const sendRequest = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:3001/send-request-to-seller', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
      
    } catch (error) {
      // handleError(error);
      console.error("Error sending request:", error);
    }
  };

  // const getRequests = async () => {
  //   try {
  //     const token = localStorage.getItem('token'); // Fetch token from local storage or cookies
  //     const response = await axios.get('http://localhost:3001/getRequests', {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the token for authentication
  //       },
  //     });
  
  //     if (response.data.success) {
  //       console.log('Requests:', response.data.requests);
  //       return response.data.requests; // Return the data to use in the component
  //     } else {
  //       console.error('Error fetching requests:', response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching requests:', error.response?.data || error.message);
  //   }
  // };
  
  const getAllSellersDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/sellers");
      console.log("Sellers fetched successfully:", response.data.sellersWithBalance);
      setSellers(response.data.sellersWithBalance); // Use sellersWithBalance from API response
    } catch (error) {
      console.log("Error fetching sellers", error.response ? error.response.data : error.message);
    }
  };

  
   useEffect(() => {
     getAllSellersDetails();
  }, []);

  const updateRequestStatus = async (request)=>{
    try {
        const token = localStorage.getItem('token');
        const {data} = await axios.post('http://localhost:3001/update-request-status',request,
        {

          headers: {Authorization:`Bearer ${token}`}

        });
        return data;

    } catch (error) {
      return error.response.data;
    }
  }

  
  return (
    <FormDataContext.Provider value={{formData,handleCreateAccount,setUserData,submitFormData,verifyCode,getSellerData,userData,sellerName,verifyAccount,transferFunds,getAllUserTransaction,getSevenDaysTransaction,getTodayTransaction,DepositFunds,updateBalanceUSD,submitFormDatForBuyer,handleBuyerAccount,getSellerRequest,sendRequest,getAllSellersDetails,sellers,updateRequestStatus
    }}>
      {children}
    </FormDataContext.Provider>
  );
};

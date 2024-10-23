import React, { createContext,useState,useContext } from 'react';
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
  const navigate = useNavigate();

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
      const response = await axios.get("http://localhost:3001/user",{
          headers:{Authorization:`Bearer ${token}`}
        });
        console.log("User Bio are",response);
        setUserData(response.data);
        // setSellerData(response.data);
        
        
    } catch (error) {
      console.log('Error fetching seller data', error.response ? error.response.data : error.message);
    }
  };

  const verifyAccount = async (payload) => {
    try {
      console.log("Payload sent to API:", payload); // Log payload to check if the correct data is sent
      const response = await axios.post('http://localhost:3001/verify-account', payload);
      console.log("Response from API:", response.data.data); // Log the full response
      setSellerName(response.data.data.sellerName);
      console.log("seller Name is",sellerName);
      return response.data; // Return response data, not the whole response object
    } catch (error) {
      console.error("Error verifying account:", error.response ? error.response.data : error.message);
      return error.response.data;
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

  const updateBalanceUSD = (newBalance) => {
    setFormData((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        balanceUSD: newBalance,
      },
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

  return (
    <FormDataContext.Provider value={{formData,handleCreateAccount,submitFormData,verifyCode,getSellerData,userData,sellerName,verifyAccount,transferFunds,getAllUserTransaction,getSevenDaysTransaction,getTodayTransaction,DepositFunds,updateBalanceUSD}}>
      {children}
    </FormDataContext.Provider>
  );
};

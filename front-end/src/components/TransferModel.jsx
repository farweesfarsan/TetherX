// // import { Modal, Form } from 'antd';
// // import React from 'react';
// // import { useSelector } from 'react-redux';
// // import { useDispatch } from 'react-redux';
// // import { ShowLoading, HideLoading } from '../redux/loadersSlice'; // Correctly import the actions
// // import { useFormData } from '../context/FormDataContext';
// // // import Box from '@mui/material/Box';
// // // import TextField from '@mui/material/TextField';
// // // import FormControl from '@mui/material/FormControl';
// // // import InputLabel from '@mui/material/InputLabel';
// // // import InputAdornment from '@mui/material/InputAdornment';
// // // import Input from '@mui/material/Input';
// // import Stack from '@mui/material/Stack';
// // import TextField from '@mui/material/TextField';

// // const TransferModel = ({ showTrnsferFund, setShowTransferFund }) => {
// //   const [isVerified, setIsVerified] = React.useState('');
// //   const { user } = useSelector((state) => state.users);
// //   const { verifyAccount } = useFormData();
// //   const [form] = Form.useForm(); // Initialize form properly
// //   const dispatch = useDispatch();

// //   const handleVerifyAccount = async () => {
// //     try {
// //         dispatch(ShowLoading());
// //         const receiverId = form.getFieldValue("receiver"); // Make sure receiver ID is correct
// //         console.log("Receiver ID from form:", receiverId); // Log form value
    
// //         const response = await verifyAccount({
// //             receiver: receiverId // Send the correct user ID to the server
// //         });
    
// //         dispatch(HideLoading());
    
// //         if (response.success) { // Check response.success directly
// //             console.log("Account verification successful:", response); // Log for debugging
// //             setIsVerified('true');
// //         } else {
// //             console.log("Account verification failed:", response); // Log for debugging
// //             setIsVerified('false');
// //         }
// //     } catch (error) {
// //         dispatch(HideLoading());
// //         console.error("Error during account verification:", error);
// //         setIsVerified('false');
// //     }
// // };


// //   return (
// //     <Modal
// //       title="Transfer Funds"
// //       open={showTrnsferFund}
// //       onCancel={() => setShowTransferFund(false)}
// //       footer={null}
// //     >
// //       <Form layout="vertical" form={form}>
// //        <div className="flex items-center gap-2">
        
// //        {/* <Form.Item label="Account" name="receiver">
// //         <input 
// //           type="text" 
// //           className="py-3 px-5 border-[1px] border-solid w-full box-border" 
// //         />
// //       </Form.Item> */}
// //       <Form.Item label="Account" name="receiver">
// //        <TextField
// //         hiddenLabel
// //         id="filled-hidden-label-small"
// //         variant="filled"
// //         size="small"
// //         className='w-[300px]'
// //        />
// //       </Form.Item>
// //         <button
// //           className="p-[3px] relative mt-[-3px] hover:cursor-pointer"
// //           type="button"
// //           onClick={handleVerifyAccount}
// //         >
// //           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
// //           <div className="px-8 py-3 relative group transition duration-200 text-white hover:bg-transparent">
// //             Verify
// //           </div>
// //         </button> 
// //       </div>

// //       {isVerified === 'true' && (
// //         <div className='bg-[#25a725] p-2 rounded-md'>
// //           <h1 className="text-sm">Account Verified</h1>
// //         </div>
// //       )}

// //       {isVerified === 'false' && (
// //         <div className='bg-[#aa2d33] p-2 rounded-md'>
// //           <h1 className="text-sm">Invalid Account</h1>
// //         </div>
// //       )}

// //       {/* <Form.Item label="Amount" name="account">
// //         <input 
// //           type="text" 
// //           className="py-3 px-5 border-[1px] border-solid w-full box-border" 
// //         />
// //       </Form.Item> */}
// //       <Form.Item
// //        label="Amount"
// //        name="amount"
// //        rules={[
// //         {
// //          required: true,
// //          message: 'Please input your amount',
// //         },
// //         {
// //       // Check if user and balanceUSD exist before validation
// //       validator: (_, value) => {
// //         if (user && user.balanceUSD !== undefined) {
// //           return value > user.balanceUSD ? Promise.reject('Insufficient Balance') : Promise.resolve();
// //         } else {
// //           return Promise.reject('Unable to load user balance');
// //         }
// //       },
// //     },
// //   ]}
// // >
// //   <input
// //     type="text"
// //     className="py-3 px-5 border-[1px] border-solid w-full box-border"
// //   />
// // </Form.Item>

// //       <Form.Item label="Description" name="description">
// //         <textarea 
// //           className="py-3 px-5 border-[1px] border-solid w-full box-border" 
// //           rows="3"
// //         />
// //       </Form.Item>
// //     </Form>
// //     </Modal>
// //   );
// // };

// // export default TransferModel;

// import { Modal, Form, message } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ShowLoading, HideLoading } from '../redux/loadersSlice';
// import { SetWalletData } from '../redux/usersSlice';
// import { useFormData } from '../context/FormDataContext';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';

// const TransferModel = ({ showTrnsferFund, setShowTrnsferFund }) => {
//   const dispatch = useDispatch();
//   const { userData, getSellerData, verifyAccount } = useFormData();
//   const walletData = useSelector((state) => state.users.walletData);
//   const { user } = useSelector((state) => state.users);

//   const [form] = Form.useForm();
//   const [isVerified, setIsVerified] = useState(null);

//   const transferFunds = async (payload) => {
//     try {
//       const data = await axios.post('http://localhost:3001/transfer-fund', payload);
//       console.log("Received data's are", data);
//       return data;
//     } catch (error) {
//       return error.response.data;
//     }
//   };

//   useEffect(() => {
//     getSellerData();
//   }, [getSellerData]);

//   useEffect(() => {
//     const fetchWalletData = async () => {
//       try {
//         dispatch(ShowLoading());
//         const balance = userData.balanceUSD;
//         console.log("Balance is", balance);
//         dispatch(SetWalletData(balance));
//         dispatch(HideLoading());
//       } catch (error) {
//         console.error("Error fetching wallet data:", error);
//         dispatch(HideLoading());
//       }
//     };
//     fetchWalletData();
//   }, [getSellerData, dispatch]);

//   const handleVerifyAccount = async () => {
//     try {
//       const receiverId = form.getFieldValue("receiver");
//       if (!receiverId) {
//         message.error("Receiver ID is empty!");
//         return;
//       }
//       const response = await verifyAccount({ receiver: receiverId });
//       if (response.success) {
//         setIsVerified(true);
//       } else {
//         setIsVerified(false);
//       }
//     } catch (error) {
//       setIsVerified(false);
//     }
//     dispatch(HideLoading());
//   };

//   const onFinish = async (values) => {
//     if (!user || !user._id) {
//       message.error("User not found or not authenticated.");
//       return;
//     }

//     try {
//       dispatch(ShowLoading());
//       const payload = {
//         ...values,
//         senders: user._id, // Ensure user._id exists before using
//         references: values.references || 'no-reference',
//         status: "success",
//         amount: values.amount,
//         receiver: values.receiver,
//       };

//       const response = await transferFunds(payload);
//       if (response.success) {
//         setShowTrnsferFund(false);
//         message.success(response.message);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       console.error("Error in fund transfer:", error);
//       message.error(error?.response?.message || "An error occurred while transferring funds.");
//     } finally {
//       dispatch(HideLoading());
//     }
//   };

//   return (
//     <Modal
//       title="Transfer Funds"
//       open={showTrnsferFund}
//       onCancel={() => setShowTrnsferFund(false)}
//       footer={null}
//     >
//       <Form layout="vertical" form={form} onFinish={onFinish}>
//         <div className="flex items-center gap-2">
//           <Form.Item label="Account" name="receiver">
//             <TextField
//               hiddenLabel
//               variant="filled"
//               size="small"
//               className="w-[300px]"
//             />
//           </Form.Item>
//           <button
//             className="p-[3px] relative mt-[-3px] hover:cursor-pointer"
//             type="button"
//             onClick={handleVerifyAccount}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
//             <div className="px-8 py-3 relative group transition duration-200 text-white hover:bg-transparent">
//               Verify
//             </div>
//           </button>
//         </div>

//         {isVerified === true && (
//           <div className="bg-[#25a725] p-2 rounded-md">
//             <h1 className="text-sm">Account Verified</h1>
//           </div>
//         )}

//         {isVerified === false && (
//           <div className="bg-[#aa2d33] p-2 rounded-md">
//             <h1 className="text-sm">Invalid Account</h1>
//           </div>
//         )}

//         <Form.Item
//           label="Amount"
//           name="amount"
//           rules={[
//             { required: true, message: 'Please input the amount' },
//             {
//               validator: (_, value) => {
//                 if (value && walletData !== undefined) {
//                   return value > walletData
//                     ? Promise.reject(new Error('Insufficient Balance'))
//                     : Promise.resolve();
//                 }
//                 return Promise.reject(new Error('Unable to load wallet balance'));
//               },
//             },
//           ]}
//         >
//           <input
//             type="number"
//             className="py-3 px-5 border-[1px] border-solid w-full box-border"
//           />
//         </Form.Item>

//         <Form.Item label="Reference" name="references">
//           <textarea
//             className="py-3 px-5 border-[1px] border-solid w-full box-border"
//             rows="3"
//           />
//         </Form.Item>

//         <div className="flex justify-end gap-1">
//           <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white transition duration-200">
//             Cancel
//           </button>

//           {isVerified && (
//             <button
//               className="shadow-[inset_0_0_0_2px_#616467] text-[#616467] px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#000] hover:text-white transition duration-200"
//               type="submit"
//             >
//               Transfer
//             </button>
//           )}
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// export default TransferModel;


import { Modal, Form, message } from 'antd';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/loadersSlice';
import { SetWalletData } from '../redux/usersSlice';
import { useFormData } from '../context/FormDataContext';
import TextField from '@mui/material/TextField';

  const TransferModel = ({ showTrnsferFund, setShowTrnsferFund }) => {
  const dispatch = useDispatch(); 
  const { userData,getSellerData,verifyAccount,transferFunds} = useFormData();
  const walletData = useSelector((state) => state.users.walletData);
  const { user } = useSelector((state) => state.users);

  // Initialize form reference
  const [form] = Form.useForm();

  const [isVerified, setIsVerified] = React.useState(null);


  useEffect(() => {
    getSellerData();
    
  }, []);

  useEffect(()=>{
    transferFunds();
  }, []);

 

  // Fetch wallet data on component mount
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        dispatch(ShowLoading());
        const balance = userData.balanceUSD;
        console.log("balance is",balance);
        dispatch(SetWalletData(balance)); // Save wallet data in Redux
        dispatch(HideLoading());
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        dispatch(HideLoading());
      }
    };

    fetchWalletData();
  }, [getSellerData, dispatch]);

  // Function to verify account
  const handleVerifyAccount = async () => {
    try {
      const receiverId = form.getFieldValue("receiver"); // Check if form gets the value
      if (!receiverId) {
        console.error("Receiver ID is empty!");
        return;
      }
      console.log("Receiver ID:", receiverId);

      const response = await verifyAccount({ receiver: receiverId }); 

      dispatch(HideLoading());

      if (response.success) {
        // isVerifiedRef.current = 'true'; // Update the ref if account is verified
        setIsVerified('true');
      } else {
        // isVerifiedRef.current = 'false'; // Update the ref if verification fails
        setIsVerified('false');
      }
    } catch (error) {
      dispatch(HideLoading());
      // isVerifiedRef.current = 'false'; // Update the ref in case of error
      setIsVerified('false');
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
  
      // Ensure payload is correct
      const payload = {
        ...values,
        sender: user._id ,
        references: values.references,
        status: "success",
        amount: values.amount,  // Make sure to use actual form value for amount
        receiver: values.receiver ,  // Use actual receiver from form
      };
      

      // Make sure transferFunds is properly handling the payload
      const response = await transferFunds(payload);
      console.log("Transfer response:", response); 
  
      if (response.success) {
        setShowTrnsferFund(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
  
      dispatch(HideLoading());
    } catch (error) {
      console.error("Error in fund transfer:", error);  // Log the full error for debugging
      message.error(error?.response?.message || "An error occurred while transferring funds.");
      dispatch(HideLoading());
    }
  };

  return (
    <Modal
      title="Transfer Funds"
      open={showTrnsferFund}
      onCancel={() => setShowTrnsferFund(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="flex items-center gap-2">
          <Form.Item label="Account" name="receiver">
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              className="w-[300px]"
            />
          </Form.Item>
          <button
            className="p-[3px] relative mt-[-3px] hover:cursor-pointer"
            type="button"
            onClick={handleVerifyAccount}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-3 relative group transition duration-200 text-white hover:bg-transparent">
              Verify
            </div>
          </button>
        </div>

        {/* Display verification status */}
        {isVerified === 'true' && (
          <div className="bg-[#25a725] p-2 rounded-md">
            <h1 className="text-sm">Account Verified</h1>
          </div>
        )}

        {isVerified === 'false' && (
          <div className="bg-[#aa2d33] p-2 rounded-md">
            <h1 className="text-sm">Invalid Account</h1>
          </div>
        )}

        {/* Amount field with dynamic validation */}
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: 'Please input the amount',
            },
            {
              validator: (_, value) => {
                if (value && walletData !== undefined) {
                  return value > walletData
                    ? Promise.reject(new Error('Insufficient Balance'))
                    : Promise.resolve();
                }
                return Promise.reject(new Error('Unable to load wallet balance'));
              },
            },
          ]}
        >
          <input
            type="number"
            className="py-3 px-5 border-[1px] border-solid w-full box-border"
          />
        </Form.Item>

        <Form.Item label="Reference" name="references">
          <textarea
            className="py-3 px-5 border-[1px] border-solid w-full box-border"
            rows="3"
          />
        </Form.Item>
        <div className='flex justify-end gap-1'>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
         Cancel
       </button>
       {isVerified == 'true' &&
        <button className="shadow-[inset_0_0_0_2px_#616467] text-[#616467] px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#000] hover:text-white dark:text-neutral-200 transition duration-200" type='submit'>
        Transfer
      </button>
        
        }
        </div>
      </Form>
    </Modal>
  );
};

export default TransferModel;
// import { Form, message, Modal } from 'antd';
// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import { useFormData } from '../context/FormDataContext'; // For context-related data
// import { useDispatch } from 'react-redux';
// import { HideLoading, ShowLoading } from '../redux/loadersSlice';
// import axios from 'axios'; // Assuming you'll use axios for API calls

// const DepositModel = ({ depositFund, setDepositFund }) => {
//   const [form] = Form.useForm();
//   const [amount, setAmount] = useState(0); // State to hold the deposit amount
//   const [isReadyForCheckout, setIsReadyForCheckout] = useState(false); // State to manage StripeCheckout
//   const { user,userData,DepositFunds } = useFormData(); // Get relevant data from the context
//   const dispatch = useDispatch();
  
  
//   // Define the function that will make the deposit API call
//   // const DepositFunds = async ({ token, amount }) => {
//   //   try {
//   //     const response = await axios.post('http://localhost:3001/deposit-fund', { token, amount });
//   //     console.log('Deposit API response:', response.data); // Debugging API response
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error response:', error.response ? error.response.data : error.message); // Better error logging
//   //     if (error.response) {
//   //       console.log('Server response status:', error.response.status); // Check status
//   //       console.log('Server response headers:', error.response.headers); // Check headers
//   //     }
//   //     throw new Error('Failed to process the deposit.');
//   //   }
//   // };
  
//   const onToken = async (token) => {
//     console.log('Token:', token);
//     console.log('Amount:', amount); // Ensure this logs the correct amount
//     console.log('UserId:', userData.userId); // Log userId to check if it's available
  
//     try {
//       dispatch(ShowLoading());
//       const response = await DepositFunds({
//         token,
//         amount, // Use the state amount
//         userId: userData.userId, // Make sure userId is passed correctly
//       });
//       dispatch(HideLoading());
      
//       if (response.success) {
//         // Update the balance locally without page reload
//         const updatedBalance = userData.balanceUSD + amount;
//         // Update in context or Redux, depending on where you manage state
//         userData.balanceUSD = updatedBalance;
//         // Alternatively, dispatch an action to update Redux store if needed
//         // dispatch(UpdateBalance(updatedBalance));
  
//         setDepositFund(false);
//         message.success('Deposit successful!'); // Show success message
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       console.error('Error during deposit:', error.response?.data || error.message);
//       message.error(error.message);
//     }
//   };

//   const handleCancel = () => {
//     setDepositFund(false);
//   };

//   const handleFormSubmit = () => {
//     // Validate form and set amount before opening StripeCheckout
//     form.validateFields()
//       .then((values) => {
//         setAmount(values.amount); // Set the correct amount
//         setIsReadyForCheckout(true); // Allow the checkout to proceed
//       })
//       .catch((error) => {
//         console.error('Form validation failed:', error);
//         setIsReadyForCheckout(false); // Prevent checkout if validation fails
//       });
//   };

//   return (
//     <div>
//       <Modal
//         title="Deposit"
//         open={depositFund}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <div className='flex-col gap-1'>
//           <Form
//             layout='vertical'
//             form={form}
//           >
//             <Form.Item
//               label='Amount'
//               name='amount'
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input amount',
//                 }
//               ]}
//             >
//               <input type='number' />
//             </Form.Item>
//             <div className='flex justify-end gap-1'>
//               <button
//                 className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>

//               {isReadyForCheckout && (
//                 <StripeCheckout
//                   token={onToken}
//                   currency='USD'
//                   amount={amount * 100} // Stripe expects amount in cents
//                   shippingAddress
//                   stripeKey="pk_test_51QBWJ3GKXk4jNXnZqww3UcGVGECG0pOYd8tkiDiAFmP6oQVwVc52QcO7TlsJTA6MbJHmumV4Fj9Pz1InoipTebx200wL6sS9xi"
//                 >
//                   <button
//                     className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
//                   >
//                     Confirm & Pay
//                   </button>
//                 </StripeCheckout>
//               )}

//               {!isReadyForCheckout && (
//                 <button
//                   className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
//                   onClick={handleFormSubmit} // Validate and set amount before showing StripeCheckout
//                 >
//                   Deposit
//                 </button>
//               )}
//             </div>
//           </Form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default DepositModel;

import { Form, message, Modal } from 'antd';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useFormData } from '../context/FormDataContext'; // For context-related data
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector for balanceUSD from Redux
import { HideLoading, ShowLoading } from '../redux/loadersSlice';
import { updateBalanceUSD } from '../redux/usersSlice'; // Import updateBalanceUSD action
import axios from 'axios';

const DepositModel = ({ depositFund, setDepositFund }) => {
  const [form] = Form.useForm();
  const [amount, setAmount] = useState(0); // State to hold the deposit amount
  const [isReadyForCheckout, setIsReadyForCheckout] = useState(false); // State to manage StripeCheckout
  const { userData, DepositFunds } = useFormData(); // Get relevant data from the context
  const dispatch = useDispatch();
  
  // Fetch balanceUSD from Redux store
  const balanceUSD = useSelector((state) => state.users.user?.balanceUSD || 0); 

  const onToken = async (token) => {
    console.log('Token:', token);
    console.log('Amount:', amount); // Ensure this logs the correct amount
    console.log('UserId:', userData.userId); // Log userId to check if it's available
  
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({
        token,
        amount, // Use the state amount
        userId: userData.userId, // Ensure userId is passed correctly
      });
      dispatch(HideLoading());
      
      if (response.success) {
        // Update balanceUSD in Redux store
        const updatedBalance = balanceUSD + amount;
        dispatch(updateBalanceUSD(updatedBalance)); // Dispatch action to update Redux store

        setDepositFund(false);
        message.success('Deposit successful!'); // Show success message
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error('Error during deposit:', error.response?.data || error.message);
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setDepositFund(false);
  };

  const handleFormSubmit = () => {
    // Validate form and set amount before opening StripeCheckout
    form.validateFields()
      .then((values) => {
        setAmount(values.amount); // Set the correct amount
        setIsReadyForCheckout(true); // Allow the checkout to proceed
      })
      .catch((error) => {
        console.error('Form validation failed:', error);
        setIsReadyForCheckout(false); // Prevent checkout if validation fails
      });
  };

  return (
    <div>
      <Modal
        title="Deposit"
        open={depositFund}
        onCancel={handleCancel}
        footer={null}
      >
        <div className='flex-col gap-1'>
          <Form
            layout='vertical'
            form={form}
          >
            <Form.Item
              label='Amount'
              name='amount'
              rules={[
                {
                  required: true,
                  message: 'Please input amount',
                }
              ]}
            >
              <input type='number' />
            </Form.Item>
            <div className='flex justify-end gap-1'>
              <button
                className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                onClick={handleCancel}
              >
                Cancel
              </button>

              {isReadyForCheckout && (
                <StripeCheckout
                  token={onToken}
                  currency='USD'
                  amount={amount * 100} // Stripe expects amount in cents
                  shippingAddress
                  stripeKey="pk_test_51QBWJ3GKXk4jNXnZqww3UcGVGECG0pOYd8tkiDiAFmP6oQVwVc52QcO7TlsJTA6MbJHmumV4Fj9Pz1InoipTebx200wL6sS9xi" // Replace with your actual Stripe key
                >
                  <button
                    className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                  >
                    Confirm & Pay
                  </button>
                </StripeCheckout>
              )}

              {!isReadyForCheckout && (
                <button
                  className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                  onClick={handleFormSubmit} // Validate and set amount before showing StripeCheckout
                >
                  Deposit
                </button>
              )}
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default DepositModel;


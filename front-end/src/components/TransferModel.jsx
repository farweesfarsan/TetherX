
import { Modal, Form, message,Input,Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/loadersSlice';
import { SetWalletData,SetUser } from '../redux/usersSlice';
import { useFormData } from '../context/FormDataContext';


const TransferModel = ({ showTrnsferFund, setShowTrnsferFund }) => {
  const dispatch = useDispatch(); 
  const { userData, getSellerData, verifyAccount, transferFunds , sellerName} = useFormData();
  const walletData = useSelector((state) => state.users.walletData);
  const { user } = useSelector((state) => state.users);

  // Initialize form reference
  const [form] = Form.useForm();

  const [isVerified, setIsVerified] = React.useState(null);
  
  useEffect(() => {
    transferFunds();
  }, []);

  useEffect(()=>{
    const fetchWalletData = ()=>{
      try {
        dispatch(ShowLoading());
        const balance = userData.balanceUSD;
        console.log("balance is",balance);
        dispatch(SetWalletData(balance));
        dispatch(HideLoading());
      } catch (error) {
        console.error("Error fetching walletdata",error);
        dispatch(HideLoading());
      }
    };
    fetchWalletData();
  },[getSellerData(),dispatch]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(ShowLoading());
  
        // Fetch user data only once
        await getSellerData(); // This sets userData from context
        
        if (userData?.userId) {
          dispatch(SetUser(userData.userId)); // Store userId in Redux
        } else {
          console.error("No userId found in seller data.");
        }
  
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        console.error("Error fetching user data", error);
      }
    };
  
    // Call it only once when component mounts
    if (!userData?.userId) {
      fetchUserData();
    }
  }, [dispatch, getSellerData, userData]);  // Removed `userData` from dependencies to prevent loop
  // Function to verify account
  const handleVerifyAccount = async () => {
    try {
      const receiverId = form.getFieldValue("receiver");
  
      if (!receiverId) {
        message.error("Receiver ID is required.");
        return;
      }
  
      dispatch(ShowLoading());
      const response = await verifyAccount({ receiver: receiverId });

      if (response.success) {
        setIsVerified(true); // Change to boolean true
        message.success("Account verified");
      
      } else {
        setIsVerified(false); // Change to boolean false
        message.error(response.message || "Account verification failed");
      }
  
      dispatch(HideLoading());
    } catch (error) {
      console.error("Error in account verification:", error);
      message.error("Failed to verify account");
      setIsVerified(false);
      dispatch(HideLoading());
    }
  };

  

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values); // Log form values
  
      // Check if account is verified
      if (!isVerified) {
        message.error("Account verification is required.");
        return;
      }
  
      // Check if userId is available
      if (!userData?.userId) {
        message.error("Sender details (userId) are missing.");
        return;
      }
  
      // Prepare payload for transfer
      const payload = {
        sender: userData.userId,  // Use the userId from fetched userData
        receiver: values.receiver,  // Receiver's ID
        amount: values.amount,  // Transfer amount
        references: values.references,  // Reference note
        status: "success",  // Status of transaction 
      };
  
      console.log("Payload:", payload);  // Log the payload to check its content
  
      const response = await transferFunds(payload); // Call the transfer API
  
      // Handle response
      if (response.success) {
        setShowTrnsferFund(false);
        message.success("Transfer successful");
      } else {
        message.error(response.message || "Transfer failed");
      }
  
      dispatch(HideLoading());
    } catch (error) {
      console.error("Error in fund transfer:", error);
      message.error(error?.response?.message || "An error occurred during the transfer.");
      dispatch(HideLoading());
    }
  };

  return (
    <Modal
      title="Transfer Funds"
      open={showTrnsferFund}
      onCancel={() => setShowTrnsferFund(false)}
      footer={null} 
      className="modal-custom-bg custom-modal" 
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="flex items-center gap-2">
        <Form.Item
        label={<span style={{ color: 'white' }}>Account</span>}
         name="receiver"
          rules={[{ required: true, message: "Please enter the receiver ID" }]}
         >
       
        <Input type="string" className="py-3 px-5 border-[1px] border-solid w-[470px] box-border"/>
       </Form.Item>
          
        </div>

        
        {isVerified === true && (
          <div className="text-[#2a9942] mt-[-30px]">
            <h1 className="text-sm"><span className='text-[#ffffff]'>Account Holder :{" "}</span>{sellerName}</h1>
          </div>
        )}

        {isVerified === false && (
          <div className="bg-[#aa2d33] p-2 rounded-md">
            <h1 className="text-sm">Invalid Account</h1>
          </div>
        )}

        {/* Amount field with dynamic validation */}
        <Form.Item
         label={<span style={{ color: 'white' }}>Amount</span>}
          name="amount"
          
          rules={[
            { required: true, message: "Please enter an amount" },
            {
              validator: (_, value) => {
                if (!value || walletData === undefined) {
                  return Promise.reject(new Error("Unable to load wallet balance"));
                }
                if (value > walletData) {
                  return Promise.reject(new Error("Insufficient balance"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <input type="number" className="py-3 px-5 border-[1px] border-solid w-full box-border" />
             
        </Form.Item>

        <Form.Item
         label={<span style={{ color: 'white' }}>Reference</span>}
         name="references"
         rules={[{ required: true, message: "Please provide a reference" }]}
        >
        <textarea
         className="py-3 px-5 border-[1px] border-solid w-full box-border"
         rows="3"
        />
         </Form.Item>

        <div className="flex justify-end gap-1">
          <button
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            onClick={handleVerifyAccount}
          >
            Verify
          </button>

          {isVerified === true && (
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-[#616467] px-12 py-4 rounded-md tracking-widest uppercase font-bold bg-transparent hover:bg-[#000] hover:text-white dark:text-neutral-200 transition duration-200"
              type="submit"
            >
              Transfer
            </button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default TransferModel;

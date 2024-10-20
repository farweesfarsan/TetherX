import { Form, Modal } from 'antd';
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const DepositModel = ({ depositFund, setDepositFund, reloadData }) => {
  const [form] = Form.useForm();
  const [amount, setAmount] = useState(0); // State to hold the deposit amount
  const [isReadyForCheckout, setIsReadyForCheckout] = useState(false); // State to manage StripeCheckout

  const onToken = (token) => {
    // Card details and amount logging
    console.log('Token:', token);
    console.log('Amount:', amount); // Log the correct amount
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
                  stripeKey="pk_test_51QBWJ3GKXk4jNXnZqww3UcGVGECG0pOYd8tkiDiAFmP6oQVwVc52QcO7TlsJTA6MbJHmumV4Fj9Pz1InoipTebx200wL6sS9xi"
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
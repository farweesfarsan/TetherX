
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, message, Input } from 'antd';
import { ShowLoading, HideLoading } from '../redux/loadersSlice';
import { useFormData } from '../context/FormDataContext';

const RequestModel = ({ requestModel, setRequestModel, userId }) => {
  const dispatch = useDispatch();
  const { userData, sendRequest } = useFormData();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const payload = {
        sender: userData.userId,
        receiver: userId,
        amount: values.amount,
        description: values.description,
        status: "success",
      };
      console.log("Submitting payload:", payload);
  
      const response = await sendRequest(payload);
  
      if (typeof response === "string") {
        message.error(response || "Request failed");
      } else if (response.success) {
        setRequestModel(false);
        message.success("Request sent successfully!");
      }
    } catch (error) {
      console.error("Error occurred in onFinish:", error);
      message.error("An error occurred during the request.");
    }
  };

  return (
    <Modal
      title="Request Funds"
      open={requestModel}
      onCancel={() => setRequestModel(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter an amount" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please provide a reference" }]}>
          <Input.TextArea rows="3" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <button type="submit" className="btn-primary">
            Send
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default RequestModel;


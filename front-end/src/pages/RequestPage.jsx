import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';
import { ShowLoading, HideLoading } from '../redux/loadersSlice';
import axios from 'axios';
import { useFormData } from "../context/FormDataContext";

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const { userData, updateRequestStatus, getSellerData, setUserData } = useFormData();

  const getAllRequests = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      const userId = userData.userId;

      const response = await axios.post(
        "http://localhost:3001/get-all-request-from-user",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("User id is", userId);
      console.log("All Requests are", response.data);

      if (response.data.success) {
        setRequests(response.data.data || []);
      } else {
        message.error(response.data.message || "Failed to fetch requests");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      message.error("An error occurred while fetching requests.");
    } finally {
      dispatch(HideLoading());
    }
  };

  const updateStatus = async (record, status) => {
    try {
      dispatch(ShowLoading());
      const response = await updateRequestStatus({
        ...record,
        status
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getAllRequests();
        getSellerData();
        console.log("User data details",userData);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(response.message);
    }
  };

  
  useEffect(() => {
    getAllRequests();
    getSellerData();
  }, []);

  useEffect(() => {
    console.log("Updated userData:", userData); // Log the entire userData object
  }, [userData]);
  const columns = [
    {
      title: 'Request ID',
      dataIndex: '_id'
    },
    {
      title: 'Buyer ID',
      dataIndex: ['sender', 'buyers', '_id'],
      key: 'sender',
    },
    {
      title: 'Buyer Name',
      dataIndex: ['sender', 'buyers', 'firstName']
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let statusClass = '';
        if (status === 'Pending') {
          statusClass = 'bg-[#CD853F] bg-opacity-[0.4] text-[#e2953c] py-1 px-2 rounded-md shadow-md cursor-pointer';
        } else if (status === 'Accepted') {
          statusClass = 'bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md cursor-pointer';
        } else if (status === 'Rejected') {
          statusClass = 'bg-[#B22222] bg-opacity-[0.4] text-[#e03b3b] py-1 px-2 rounded-md shadow-md cursor-pointer';
        }
        return <span className={statusClass}>{status}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        if (record.status === 'Pending') {
          return (
            <div className='flex gap-1'>
              <h1
                className='text-sm cursor-pointer bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md'
                onClick={() => updateStatus(record, 'Accepted')}
              >
                Accept
              </h1>
              <h1
                className='text-sm cursor-pointer bg-[#B22222] bg-opacity-[0.4] text-[#e03b3b] py-1 px-2 rounded-md shadow-md'
                onClick={() => updateStatus(record, 'Rejected')}
              >
                Reject
              </h1>
            </div>
          );
        }
      },
    }
  ];

  return (
    <div className='ml-[20%] text-[20px]'>
      <div className='border-[0.5px] border-solid border-gray-600 box-border w-full h-full flex justify-center items-center custom-table-container'>
        <Table
          columns={columns}
          dataSource={requests}
          pagination={false}
          className="w-[95%] h-full mt-[2%] custom-table"
          rowClassName={() => 'custom-row'}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
};

export default RequestPage;
import { Button, Input, message } from 'antd';
import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FaFilter } from "react-icons/fa";
import { Table } from 'antd';
import { useFormData } from "../context/FormDataContext";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';
import moment from 'moment/moment';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { render } from '@testing-library/react';

const Transaction = () => {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const { getAllUserTransaction, getSevenDaysTransaction,getTodayTransaction ,userData } = useFormData();
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.users);

  // Fetch all transactions (default)
  const getData = async () => {
    try {
      const loggedUserId = userData ? userData.userId : localStorage.getItem("userId");
      if (!loggedUserId) {
        throw new Error("User ID is missing");
      }

      console.log("Calling getAllUserTransaction with user ID:", loggedUserId); // Log before API call

      dispatch(ShowLoading());
      const response = await getAllUserTransaction(loggedUserId); // Fetch all transactions
      console.log("Response from getAllUserTransaction:", response); // Log the API response

      if (response.success) {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching transactions:", error.message);
      message.error(error.message);

      console.log("Error in getAllUserTransaction:", error); // Log any error
    }
  };

  // Fetch 7 days transactions
  const getSevenDaysData = async () => {
    try {
      const loggedUserId = userData ? userData.userId : localStorage.getItem("userId");
      if (!loggedUserId) {
        throw new Error("User ID is missing");
      }

      console.log("Calling getSevenDaysTransaction with user ID:", loggedUserId); // Log before API call

      dispatch(ShowLoading());
      const response = await getSevenDaysTransaction(loggedUserId); // Fetch last 7 days transactions
      console.log("Response from getSevenDaysTransaction:", response); // Log the API response

      if (response.success) {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching 7 days transactions:", error.message);
      message.error(error.message);

      console.log("Error in getSevenDaysTransaction:", error); // Log any error
    }
  };

  const getTodayData = async () => {
    try {
      const loggedUserId = userData ? userData.userId : localStorage.getItem("userId");
      if (!loggedUserId) {
        throw new Error("User ID is missing");
      }

      console.log("Calling getTodayTransaction with user ID:", loggedUserId); // Log before API call

      dispatch(ShowLoading());
      const response = await getTodayTransaction(loggedUserId); // Fetch last 7 days transactions
      console.log("Response from getTodayTransaction:", response); // Log the API response

      if (response.success) {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching today transactions:", error.message);
      message.error(error.message);

      console.log("Error in getTodayTransaction:", error); // Log any error
    }
  };

  

  // Handle menu click for filtering transactions
  const handleMenuClick = (key) => {
    switch (key) {
      case '0':
        getData(); // Fetch all transactions
        break;
      case '1':
        getSevenDaysData(); // Fetch 7 days transactions
        break;
      case '3':
        getTodayData();
        break;
      default:
        message.warning('Unknown item clicked');
        break;
    }
  };

  const items = [
    {
      label: 'All',
      key: '0',
      onClick: () => handleMenuClick('0')
    },
    {
      type:'divider',
    },
    {
      label: '7 Days',
      key: '1',
      onClick: () => handleMenuClick('1')
    },
    {
      type: 'divider',
    },
    {
      label: 'Today',
      key: '3',
      onClick: () => handleMenuClick('3')
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY | hh:mm:ss A");
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Transaction Id",
      dataIndex: "_id",
    },
    {
       title:"Receiver",
       dataIndex:"receiverName"
    },
    {
      title: "Type",
      type: 'type',
      render: (text, record) => {
        if (record.receiver == userData.userId) { 
          return "Credit"; 
        } else if (record.sender == userData.userId)  { 
          return "Debit"; 
        } 
      }
    },
    {
      title: "Reference",
      dataIndex: "references",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status === "success" ? (
          <span className="bg-[#3CB371] bg-opacity-[0.4] text-[#47df86] py-1 px-3 rounded-md shadow-md">
            Success
          </span>
        ) : (
          <span>{record.status}</span>
        );
      },
    },
  ];

  const filteredData = data.filter((transaction) => {
  return (
    (transaction.receiverName && transaction.receiverName.toLowerCase().includes(query.toLowerCase())) ||
    (transaction.references && transaction.references.toLowerCase().includes(query.toLowerCase())) ||
    (transaction._id && transaction._id.toLowerCase().includes(query.toLowerCase()))
  );
});

  useEffect(() => {
    getData(); // Fetch all transactions by default when the component loads
  }, []);
  console.log(query);

  return (
    <div className='ml-[20%] text-[20px]'>
      Transaction

      <div className='flex items-center gap-3 mt-[3%]'>
      <Input
        prefix={<SearchIcon className='text-[#9c9c9c]' />}
        placeholder="Type to Search"
        className='w-[30%] h-[35px] bg-[#183350] text-white border-none focus:outline-none'
        style={{ 
          backgroundColor: '#183350',  // Set default background color
           color: 'white'               // Set text color to white
        }}
          onChange={(e) => setQuery(e.target.value)}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#183350'} // Maintain background when mouse leaves
         />
        

        <Button
          className='w-[100px] h-[35px] flex justify-center items-center bg-[#829BEF] border-none text-[18px] font-medium'
        >
          Search
        </Button>

        <div className='ml-auto flex items-center gap-3'>
          <FaFilter className='text-[24px] text-[#ffffff]' />
          <p className='text-[20px] text-[#9c9c9c]'>Filter</p>

          <Dropdown className='cursor-pointer' menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className='text-[17px] text-[#829BEF] border-[2px] border-solid border-[#09dee6] box-border rounded-md px-2 py-3 '>
                Click me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>

      <div className='border-[0.5px] border-solid border-gray-600 box-border w-full h-full flex justify-center items-center custom-table-container'>
        <Table
          columns={columns}
          // dataSource={data}
          dataSource={filteredData}
          className="w-[95%] h-full mt-[2%] custom-table"
          rowClassName={() => 'custom-row'}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Transaction;

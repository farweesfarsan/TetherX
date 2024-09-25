import React from 'react';
import { Table } from 'antd';
import TransferModel from '../components/TransferModel';

const Transaction = () => {
  const [showTrnsferFund, setShowTrnsferFund] = React.useState(false);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Transaction Id",
      dataIndex: "transaction_id",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div className="ml-60 p-4">
      <div className="flex gap-2 ml-[700px]">
        <button className="px-12 py-4 rounded-md bg-[#d7241e] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#d7241e] transition-colors duration-200">
          Deposit
        </button>
        <button
          className="px-12 py-4 rounded-md bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
          onClick={() => setShowTrnsferFund(true)}
        >
          Transfer
        </button>
      </div>

      <Table columns={columns} dataSource={[]} className="mt-10" />

      {showTrnsferFund && (
        <TransferModel
          showTrnsferFund={showTrnsferFund}
          setShowTrnsferFund={setShowTrnsferFund}
        />
      )}
    </div>
  );
};

export default Transaction;

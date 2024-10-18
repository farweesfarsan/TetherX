import { Modal } from 'antd'
import React from 'react'

const DepositModel = ({showDepositModel,setShowDepositModel,reloadData}) => {
  return (
    <div>
       <Modal
        title="Deposit"
        open={showDepositModel}
        onCancel={()=>setShowDepositModel(false)}
       >
           
       </Modal>
    </div>
  )
}

export default DepositModel
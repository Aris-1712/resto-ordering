import React from 'react'
import {Modal} from 'antd';
const DeleteModal=(props)=>{
return(
<Modal title="Basic Modal" visible={props.isModalVisible} onOk={()=>props.handleOk()} onCancel={()=>props.handleCancel()}>
        <p>Are you sure you ant to delete {props.val} {props.cat} ?</p>
      </Modal>
)
}

export default DeleteModal
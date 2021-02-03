import React, { useEffect, useState } from 'react'
import {Modal} from 'antd';
import { Input } from 'antd';
const SingleInputModal=(props)=>{
const [val,setVal]=useState('')
useEffect(()=>{
setVal(props.val)
},[props.val])
    return(
        <Modal title="Edit Category" visible={props.isModalVisible} onOk={()=>props.handleOk(val)} onCancel={()=>props.handleCancel()}>
        <Input onChange={(e)=>{setVal(e.target.value)}} value={val} placeholder={props.placeholder} />
      </Modal>
    )
}

export default SingleInputModal
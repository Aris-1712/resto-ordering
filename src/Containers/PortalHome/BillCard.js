import React, { useState } from 'react'
import { Card, Typography, Button, Tag, Modal } from 'antd'
import BillSummary from './BillSummary'
const BillCard=(props)=>{
    const [modal,setModal]=useState(false)
    return(
        <Card size="small" title={props.orderid} style={{ width: 300 }}>
                     <Button onClick={()=>{setModal(true)}} type="dashed">View Bill</Button>
                    <Modal title="Basic Modal" visible={modal} onOk={()=>{setModal(false)}} onCancel={()=>{setModal(false)}}>
                        <BillSummary data={props.data}></BillSummary>
                    </Modal>
                </Card>
    )

}

export default BillCard
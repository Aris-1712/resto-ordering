import React, { useState } from 'react'
import { Card, Typography, Button, Tag, Modal } from 'antd'
import BillSummary from './BillSummary'
const BillCard = (props) => {
    const [modal, setModal] = useState(false)
    return (
        <Card size="small" title={`Table No : ${props.table}`} style={{ width: 350 }}>
            <Button onClick={() => { setModal(true) }} type="dashed">View Bill</Button>
            <Modal title={`Table No : ${props.table}`} visible={modal} onOk={() => { setModal(false) }} onCancel={() => { setModal(false) }}>
                <BillSummary data={props.data}></BillSummary>
            </Modal>
        </Card>
    )

}

export default BillCard
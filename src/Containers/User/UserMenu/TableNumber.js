import React, { useEffect, useState } from 'react'
import { Modal, Typography, Input, Button } from 'antd';
import { IoRestaurant } from 'react-icons/io5'
const TableNumber = (props) => {
    const [visible, setVisible] = useState(true)
    const [table, setTable] = useState(parseInt(localStorage.getItem('table_number')))
    useEffect(()=>{
        if(localStorage.getItem('table_number')!==null){
            setVisible(false)
        }
    },[])
    return (
        <Modal closable={false} visible={visible} footer={
            <div>
                <Button
                    onClick={() => {
                        if (table) {
                            localStorage.setItem('table_number', table)
                            setVisible(false)
                        }
                        else {
                            return
                        }
                    }}>
                    Confirm
                    </Button>
            </div>
        }>
            <div style={{ textAlign: "center" }}>
                <IoRestaurant style={{ fontSize: 100 }}></IoRestaurant>
                <br></br>
                <br></br>
                <Typography.Text strong style={{ fontSize: 20 }}>Select Table No. : </Typography.Text>
                <Input value={table} onChange={(e) => { setTable(e.target.value) }} style={{ width: 100 }} type="number" placeholder="Table No." />
            </div>
        </Modal>
    )
}

export default TableNumber
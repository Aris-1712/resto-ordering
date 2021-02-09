import React from 'react'
import ClosedOrders from './ClosedOrders'
import OpenOrders from './OpenOrders'
import { Divider } from 'antd';
import FinalBill from './FinalBill';
const Dashboard = (props) => {

    return (
        <div style={{ display: "flex", height: "100%" }}>

            <OpenOrders></OpenOrders>
            <Divider style={{ background: "gray" }} type="vertical" />

            <ClosedOrders></ClosedOrders>
            <Divider style={{ background: "gray" }} type="vertical" />
            <FinalBill></FinalBill>
            
        </div>
    )

}

export default Dashboard
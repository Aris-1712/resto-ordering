import React from 'react'
import { List, Typography, Divider } from 'antd';
const BillSummary=(props)=>{
return(
<List
      header={<div style={{fontWeight:700}}>Bill Summary</div>}
      footer={<div style={{display:"flex",justifyContent:"flex-end"}}>₹{props.data.reduce((pre,curr)=>{
          return parseFloat((curr.qty*curr.price)+pre)
      },0)}</div>}
      bordered
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
         <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
             <div>{item.item} <Typography.Text mark>x{item.qty}</Typography.Text></div>
             <div >₹{parseFloat(item.qty*item.price)}</div>
         </div>
        </List.Item>
      )}
    />
)
}

export default BillSummary
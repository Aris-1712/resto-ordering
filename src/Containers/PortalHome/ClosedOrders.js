import { Card,Typography,Button ,Tag } from 'antd'
import useSelection from 'antd/lib/table/hooks/useSelection'
import React, { useEffect, useState } from 'react'
import firebase from '../../Global/firebase'
const { Text,Title } = Typography;
const ClosedOrders=(props)=>{
const [open,setOpen]=useState([])
useEffect(()=>{
firebase.firestore().collection("Order_Items").where("companyid",'==',localStorage.getItem("company_id")).where("served","==",true).onSnapshot((snap)=>{
   let temp=[]
    snap.forEach((ele)=>{
        console.log(ele.data())
        temp.push(ele.data())
   })
   setOpen([...temp])
})
},[])   
return(<div>
    <Title level={3}>Closed Orders</Title>
    {open.map((ele)=>{
        return(
            <Card size="small" title={`Table: ${ele.table_number}`}/*  extra={<a href="#">More</a>} */ style={{ width: 350,marginBottom:20 }}>
      {Object.keys(ele.order).map((ele2)=>{
          
          return(
              <>
              {ele.order[ele2].customization===false?<div><Text strong>{ele.order[ele2].name} <span><Text mark>x{ele.order[ele2].count}</Text></span></Text></div>:<>
              {ele.order[ele2].customItems.map((ele3)=>{
                  if(ele3.qty>0){
                  return(
                    <div><Text strong>{ele3.name} <span><Text mark>x{ele3.qty}</Text></span></Text></div>
                  )
                }
              })}
              </>}
              </>
          )
      })}
      <div><Text type="success">Price:{ele.total}</Text></div>
      <div><Tag color="#13A413">Served!</Tag></div>
      <div>
      </div>
    </Card>
        )
    }).reverse()
   
    }
</div>)
}

export default ClosedOrders
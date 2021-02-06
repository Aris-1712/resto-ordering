import {Modal,Typography} from 'antd'
import React, { useEffect, useState } from 'react'

const { Title , Text} = Typography;
const OrderSummary=(props)=>{
    const [order,setOrder]=useState({})
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        setOrder({...props.order})
    },[props.order])
    useEffect(()=>{
        if(Object.keys(order).length!==0){
            let temp=0
            Object.keys(order).map((ele)=>{
                if(order[ele].customization){
                    order[ele].customItems.map((ele2)=>{
                        temp=temp+parseFloat(ele2.price*ele2.qty)
                       
                    })
                }else{
                    temp=temp+parseFloat(order[ele].price*order[ele].count)
                    
                }
            })
            setTotal(temp)
        }
    },[order])
    return(
        <Modal  onCancel={()=>props.handelCancel()} title="Order Summary" visible={props.visible}>
        {Object.keys(order).map((ele)=>{
            console.log(ele)
            return(
                <>
            {!order[ele].customization?<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:9,borderBottom:"1px solid #F18F01",padding:10}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                <Text  style={{fontSize:16,fontWeight:600}} ><span style={{marginRight:5}}>{order[ele].type==='veg'?<img src={`${process.env.PUBLIC_URL}/veg.jpg`} style={{ width: 15 }}></img>:<img src={`${process.env.PUBLIC_URL}/nonveg.jpg`} style={{ width: 15 }}></img>}</span>{order[ele].name}</Text>
                <Text type="secondary">₹ {order[ele].price}</Text>
                </div>
                <Title level={4}>₹ {parseFloat(order[ele].price*order[ele].count)}</Title>
            </div>
            :
            <>
            {order[ele].customItems.map((ele2)=>{return(
            <>{ele2.qty>0?<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F18F01",padding:10}}>
            <div style={{display:"flex",flexDirection:"column"}}>
            <Text   style={{fontSize:16,fontWeight:600}}><span style={{marginRight:5}}>{order[ele].type==='veg'?<img src={`${process.env.PUBLIC_URL}/veg.jpg`} style={{ width: 15 }}></img>:<img src={`${process.env.PUBLIC_URL}/nonveg.jpg`} style={{ width: 15 }}></img>}</span>{ele2.name}</Text>
            <Text type="secondary">₹ {ele2.price}</Text>
            </div>
            <Title level={4}>₹ {parseFloat(ele2.price*ele2.qty)}</Title>
        </div>:null}</>)})}</>}
            </>
            )
        })}
        <div style={{padding:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}> <Title level={4}>Total</Title>
        <Title level={4}>₹ {total}</Title>
        </div>
        </Modal>
    )
}

export default OrderSummary
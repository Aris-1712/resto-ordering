import {  Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from '../../Global/firebase'
import BillCard from './BillCard';
const { Text,Title } = Typography;
const FinalBill = (props) => {
    const [orderid, setOrderid] = useState([])
    const [final, setFinal] = useState({})
    const [modal, setModal] = useState(false)
    useEffect(() => {
        firebase.firestore().collection("Orders").where("companyid", '==', localStorage.getItem("company_id")).where("closed", "==", true).onSnapshot((snap) => {
            let temp = []
            snap.forEach((ele) => {

                temp.push(ele.id)
            })
            setOrderid([...temp])
        })
    }, [])
    useEffect(() => {
        if (orderid.length !== 0) {
           const getData=async()=>{
            let obj = {}
            for (const ele of orderid) {
                let temp = []
                
              await  firebase.firestore().collection("Order_Items").where("orderid", '==', ele).get().then((res) => {
                    let total = 0
                    res.forEach((result) => {
                        Object.keys(result.data().order).forEach((elem) => {
                            if (result.data().order[elem].customization === true) {
                                result.data().order[elem].customItems.forEach((eleC) => {
                                    let data = {}
                                    data.item = eleC.name
                                    data.qty = eleC.qty
                                    data.price = eleC.price
                                    data.type = result.data().order[elem].type
                                    data.orderid = ele
                                    data.table_number=result.data().table_number
                                    if(data.qty===0){
                                        return
                                    }
                                    temp.push(data)
                                })

                            } else {
                                let data = {}
                                data.item = result.data().order[elem].name
                                data.qty = result.data().order[elem].count
                                data.price = result.data().order[elem].price
                                data.type = result.data().order[elem].type
                                data.orderid = ele
                                data.table_number=result.data().table_number
                                temp.push(data)
                            }

                        })
                    })
                })
            obj={...obj,[ele]:[...temp]}
        }
        setFinal({...obj})
    }
    getData()
   
    }
    }, [orderid])
    return (
        <div>
            <Title level={3}>Bill Requests</Title>
            {Object.keys(final).map(ele => {
                return (
                    <BillCard table={final[ele][0].table_number} orderid={ele} data={final[ele]}></BillCard>

                )
            })}
        </div>
    )
}

export default FinalBill
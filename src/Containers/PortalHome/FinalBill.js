import { Card, Typography, Button, Tag, Modal } from 'antd'
import useSelection from 'antd/lib/table/hooks/useSelection'
import React, { useEffect, useState } from 'react'
import firebase from '../../Global/firebase'
import BillCard from './BillCard';
import BillSummary from './BillSummary';
const { Text } = Typography;
const FinalBill = (props) => {
    const [orderid, setOrderid] = useState([])
    const [final, setFinal] = useState({})
    const [modal,setModal]=useState(false)
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

            orderid.forEach((ele) => {
                let temp = []
                firebase.firestore().collection("Order_Items").where("orderid", '==', ele).get().then((res) => {
                    let total = 0
                    res.forEach((result) => {

                        total = total + result.data().total
                        console.log(result.data())
                        Object.keys(result.data().order).forEach((elem) => {
                            if (result.data().order[elem].customization === true) {
                                result.data().order[elem].customItems.forEach((eleC) => {
                                    let data = {}
                                    data.item = eleC.name
                                    data.qty = eleC.qty
                                    data.price = eleC.price
                                    data.type = result.data().order[elem].type
                                    data.orderid = ele
                                    temp.push(data)
                                })              

                            } else {
                                let data = {}
                                data.item = result.data().order[elem].name
                                data.qty = result.data().order[elem].count
                                data.price = result.data().order[elem].price
                                data.type = result.data().order[elem].type
                                data.orderid = ele
                                temp.push(data)
                            }

                        })
                    })
                  
                    setFinal({...final, [ele]: [...temp] })
                 
                })
                
                
            })
        }
    }, [orderid])
    return (
        <div>
            {Object.keys(final).map(ele => {
                return(
                    <BillCard orderid={ele} data={final[ele]}></BillCard>
                    
                )
            })}
        </div>
    )
}

export default FinalBill
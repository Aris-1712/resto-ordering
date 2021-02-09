import { Card, Empty } from 'antd';
import { Typography, Modal } from 'antd';
import { Tooltip, Tag, Button } from 'antd';
import { FiPlus } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../Global/Actions'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import OrderSummary from './OrderSummary';
import firebase from '../../../Global/firebase'
import {toast} from 'react-toastify'
import TableNumber from './TableNumber';
const { Title } = Typography;
const UserMenu = (props) => {
    const [category, setCategory] = useState([])
    const [meals, setMeals] = useState([])
    const [order, setOrder] = useState({})
    const [customModal, setCustomModal] = useState(false)
    const [customObj, setCustomObj] = useState({})
    const [orderSummaryModal, setOrderSummaryModal] = useState(false)
    useEffect(() => {
        localStorage.setItem('company_id', props.match.params.id)
        if (localStorage.getItem("orderid") === null) {
            firebase.firestore().collection("Orders").add({
                companyid: props.match.params.id,closed:false
            }).then((data) => {
                localStorage.setItem("orderid", data.id)
            }).catch((err)=>{
                console.log(err)
            })
        }
        props.getCategory()
        props.getMeals()
    }, [])
    useEffect(() => {
        setCategory([...props.category])
        setMeals([...props.meals])
    }, [props.category, props.meals])

    const onAddItem = (obj) => {
        if (obj.id in order) {
            let temp = { ...order[obj.id] }
            temp.count = temp.count + 1
            setOrder({ ...order, [obj.id]: { ...temp } })
        } else {
            setOrder({ ...order, [obj.id]: { ...obj, count: 1 } })
        }
    }
    const onAddCustomItem = (ind) => {
        let temp = { ...order }

        if (!(customObj.id in temp)) {
            let tempObj = { ...customObj }
            tempObj.customItems.forEach(element => {
                element.qty = 0
            });
            tempObj.customItems[ind].qty = 1
            setOrder({ ...order, [customObj.id]: { ...tempObj } })
        }
        else {
            let tempObj = { ...order[customObj.id] }
            if ("qty" in tempObj.customItems[ind]) {
                tempObj.customItems[ind].qty = tempObj.customItems[ind].qty + 1
                setOrder({ ...order, [customObj.id]: { ...tempObj } })
            }
            else {
                tempObj.customItems[ind].qty = 1
            }

        }
    }
    const onRemoveCustomItem = (ind) => {
        let temp = { ...order }
        temp[customObj.id].customItems[ind].qty = temp[customObj.id].customItems[ind].qty - 1
        setOrder({ ...temp })
    }
    const onRemoveItem = (obj) => {

        if (obj.id in order) {
            let temp = { ...order }
            if (temp[obj.id].count === 1) {
                delete temp[obj.id]
                setOrder({ ...temp })
            } else {
                temp[obj.id].count = temp[obj.id].count - 1
                setOrder({ ...temp })
            }
        }
    }
    return (
        <div style={{ padding: 50 }}>
             <Button size="middle" danger onClick={()=>{
            firebase.firestore().collection("Orders").doc(localStorage.getItem("orderid")).update({closed:true}).then((res)=>{
                localStorage.clear()
                toast.success("Thank you. Do visit us again.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
        }}>Checkout ?</Button>
            <div onClick={() => { setOrderSummaryModal(true) }} style={{ position: "fixed", cursor: "pointer", zIndex: 9, bottom: 0, right: 0, margin: 35, borderRadius: 50, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center", background: "#F18F01" }}>
                <FiPlus style={{ fontSize: 25 }}></FiPlus>
            </div>
            {category.map((ele) => {
                return (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Title level={4}>{ele.name}</Title>

                        </div>
                        <hr></hr>
                        <br></br>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            {meals.filter((ele2) => {
                                if (ele2.category === ele.id) {
                                    return true
                                }
                            }).map((ele3) => {
                                return (<div>
                                    <Card size="small" title={<Title level={5}>{ele3.name}</Title>}
                                        extra={ele3.customization ? <AiOutlinePlus onClick={() => {
                                            setCustomObj({ ...ele3 })
                                            setCustomModal(true)
                                        }} style={{ marginTop: 7 }}></AiOutlinePlus> : <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 50 }}>
                                                <button disabled={ele3.id in order ? false : true} onClick={() => { onRemoveItem(ele3) }} style={{ background: "transparent", border: "none" }}><AiOutlineMinus style={{ marginTop: 7 }}></AiOutlineMinus></button>
                                                {ele3.id in order ? order[ele3.id].count : 0}
                                                <button style={{ background: "transparent", border: "none" }} onClick={() => { onAddItem(ele3) }}><AiOutlinePlus style={{ marginTop: 7 }}></AiOutlinePlus></button>
                                            </div>}
                                        style={{ width: 300, marginRight: 30, height: 170, marginBottom: 20 }}>
                                        {ele3.type === 'veg' ? <div style={{ marginBottom: 10 }}><img src={`${process.env.PUBLIC_URL}/veg.jpg`} style={{ width: 20 }}></img><span style={{ marginLeft: 10 }}>Veg</span></div> : <div style={{ marginBottom: 10 }}><img src={`${process.env.PUBLIC_URL}/nonveg.jpg`} style={{ width: 20 }}></img><span style={{ marginLeft: 10 }}>Non-Veg</span></div>}
                                        {ele3.customization ? <Tooltip placement="right" title={<div style={{ display: "flex", flexDirection: "column" }}>{
                                            ele3.customItems.map((ele4) => {
                                                return (
                                                    <p>{ele4.name}-₹{ele4.price}</p>
                                                )
                                            })
                                        }</div>}><Tag style={{ marginBottom: 10 }} color="#f50">Customization Available</Tag></Tooltip> : <Tag style={{ marginBottom: 10 }} color="#2db7f5">No Customization</Tag>}
                                        {ele3.customization ? <Title level={4}>Starts at: ₹{ele3.customItems.reduce((ini, curr) => {
                                            console.log(curr.price, ini)
                                            if (curr.price < ini) {
                                                return curr.price
                                            } else {
                                                return ini
                                            }
                                        }, ele3.customItems[0].price)}</Title> : <Title level={4}>Price: ₹{ele3.price}</Title>}
                                    </Card>
                                </div>)
                            })}
                        </div>
                    </div>
                )
            })}
            <Modal closable={false} footer={[<Button key="back" onClick={() => { setCustomModal(false) }}>
                OK
            </Button>]} title="Select" visible={customModal} /* onOk={handleOk} */ /* onCancel={()=>{setCustomModal(false)}} */>
                {Object.keys(customObj).length > 0 ? customObj.customItems.map((ele, i) => {
                    console.log(order)
                    return (
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <p>{ele.name}</p>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 50 }}><button onClick={() => { onRemoveCustomItem(i) }} disabled={customObj.id in order && order[customObj.id].customItems[i].qty !== 0 ? false : true} style={{ background: "transparent", border: "none", outline: "none" }}><AiOutlineMinus style={{ marginTop: 7 }}></AiOutlineMinus></button>
                                {customObj.id in order ? order[customObj.id].customItems[i].qty : 0}
                                <button onClick={() => { onAddCustomItem(i) }} style={{ background: "transparent", border: "none", outline: "none" }} ><AiOutlinePlus style={{ marginTop: 7 }}></AiOutlinePlus></button>
                            </div>
                        </div>
                    )
                }) : null}
            </Modal>
            <OrderSummary handelCancel={() => { setOrderSummaryModal(false) }} order={order} visible={orderSummaryModal}></OrderSummary>
            <TableNumber></TableNumber>
        </div>
    )

}
const mapStateToProps = (state) => {
    return ({
        category: state.category,
        meals: state.meals
    })
}
const mapActionsToProps = (dispatch) => {
    return ({
        getCategory: () => { dispatch(Actions.getCategories()) },
        getMeals: () => { dispatch(Actions.getMeals()) }
    })
}
export default connect(mapStateToProps, mapActionsToProps)(UserMenu)
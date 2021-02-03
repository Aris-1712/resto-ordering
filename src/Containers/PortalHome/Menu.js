import { Typography,Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Tooltip, Tag } from 'antd';
import { toast } from 'react-toastify'
import {FiEdit3, FiTrash} from 'react-icons/fi'
import DeleteModal from '../../Component/DeleteModal';
import firebase from '../../Global/firebase'
import SingleInputModal from '../../Component/SingleInputModal';
import AddDishes from './AddDishes';
const { Title } = Typography;

const Menu = (props) => {
    const [category, setCategory] = useState([])
    const [meals, setMeals] = useState([])
    const [categoryDeleteModal,setCategoryDeleteModal]=useState(false)
    const [categoryEditModal,setCategoryEditModal]=useState(false)
    const [deleteCat,setDeleteCat]=useState('')
    const [deleteVal,setDeleteVal]=useState('')
    const [deleteCatId,setDeleteCatId]=useState('')
    const [editVal,setEditVal]=useState('')
    const [editCatId,setEditCatId]=useState('')
    const [mealEditModal,setMealEditModal]=useState(false)
    const [mealEdit,setMealEdit]=useState({})
    useEffect(() => {
        setCategory([...props.category])
        setMeals([...props.meals])
    }, [props.category, props.meals])

    const deleteCategory=()=>{
        console.log("IN")
        firebase.firestore().collection("Category").doc(deleteCatId).delete().then((res)=>{
            setCategoryDeleteModal(false)
                            setDeleteCat("")
                            setDeleteVal('')
                            setDeleteCatId('')
                            toast.success("Deleted successfully.", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                });
        }).catch((Err)=>{
            toast.error(Err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }
    const editCategory=(val)=>{
        console.log(val,"here")
        firebase.firestore().collection("Category").doc(editCatId).update({name:val}).then((res)=>{
            setCategoryEditModal(false)
            setEditCatId('')
            setEditVal('')
            toast.success("Edited successfully.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch((Err)=>{
            console.log(Err)
            toast.error(Err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }); 
        })
    }
    return (<div>
        <Title level={2}>Menu</Title>
        {category.map((ele) => {
            return (
                <div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Title level={4}>{ele.name}</Title>
                        <div>
                            <FiEdit3 style={{fontSize:20,marginRight:10,cursor:"pointer"}} onClick={()=>{
                                setCategoryEditModal(true)
                                setEditCatId(ele.id)
                                setEditVal(ele.name)
                            }}></FiEdit3>
                            
                            <FiTrash onClick={()=>{
                            setCategoryDeleteModal(true)
                            setDeleteCat("Category")
                            setDeleteVal(ele.name)
                            setDeleteCatId(ele.id)
                        }} style={{fontSize:20,cursor:"pointer"}} /></div>
                        </div>
                    <hr></hr>
                    <br></br>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {meals.filter((ele2) => {
                            if (ele2.category === ele.id) {
                                return true
                            }
                        }).map((ele3) => {
                            return (<div>
                                <Card size="small" title={<Title level={5}>{ele3.name}</Title>} extra={<div><FiEdit3 onClick={()=>{
                                    setMealEdit({...ele3})
                                    setMealEditModal(true)}} style={{fontSize:18,marginRight:5}} /> <FiTrash style={{fontSize:18}} /></div>} style={{ width: 300, marginRight: 30, height: 170,marginBottom:20 }}>
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
        <DeleteModal val={deleteVal} cat={deleteCat} handleCancel={()=>{setCategoryDeleteModal(false)}} handleOk={()=>{deleteCategory()}} isModalVisible={categoryDeleteModal}></DeleteModal>
        <SingleInputModal isModalVisible={categoryEditModal} handleCancel={()=>{setCategoryEditModal(false)}} val={editVal} handleOk={(val)=>{editCategory(val)}}></SingleInputModal>
        <Modal width={600}  footer={null} title="Edit Meal" visible={mealEditModal} /* onOk={()=>props.handleOk(val)} */ onCancel={()=>setMealEditModal(false)}>
            <AddDishes close={()=>{setMealEditModal(false)}} edit={true} meal={mealEdit}></AddDishes>
        </Modal>
    </div>)
}
const mapStateToProps = (state) => {
    return ({
        category: state.category,
        meals: state.meals
    })
}
export default connect(mapStateToProps)(Menu)
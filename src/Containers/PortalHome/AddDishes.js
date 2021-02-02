import React, { useEffect, useState } from 'react'
import { Typography, Tag } from 'antd';
import { Button } from 'antd';
import './AddDishes.css'
import { Input } from 'antd';
import firebase from '../../Global/firebase'
import { toast } from 'react-toastify'
import { Radio } from 'antd';
import { TiDelete } from 'react-icons/ti'
import { Select } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;
const { Title } = Typography;

const AddDishes = (props) => {
    const [mealName, setMealName] = useState('')
    const [type, setType] = useState('veg')
    const [customization, setCustomization] = useState(false)
    const [price, setPrice] = useState(0)
    const [customItems, setCustomItems] = useState([])
    const [customName, setCustomName] = useState('')
    const [customPrice, setCustomPrice] = useState('')
    const [category, setCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState(null)
    const clear=()=>{
        setMealName("")
        setPrice(0)
        setCustomItems([])
        setCustomName("")
        setCustomPrice("")
        selectCategory(null)
    }
    useEffect(() => {
        setCategory([...props.category])
    }, [props.category])
    const save=()=>{
        if(mealName!=="" && selectCategory!==null ){
            if(customization && customItems.length==0){
                toast.error("Please add items to customization.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    return;
            }
        firebase.firestore().collection("Meals").add({
          name:mealName,
          type:type,
          customization:customization,
          price:parseFloat(price),
          customItems:customItems,
          category:selectCategory ,
          companyid:localStorage.getItem("company_id") 
        }).then((res)=>{
            toast.success("Meal added successfully.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                clear()
        }).catch(err=>{
            toast.error(err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }else{
        toast.error("Please fill all the details.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    }
    return (
        <div className="Add_Dishes">
            <Title level={2}>Add Meal</Title>
            <div>
                <Title level={4}>Meal Name</Title>
                <Input value={mealName} onChange={(e) => { setMealName(e.target.value) }} placeholder="Fajita Pizza"></Input>
            </div>
            <div>
                <Title level={4}>Select Category</Title>
                <Select defaultValue={"SELECT"} style={{ width: 200 }} onChange={(val)=>{setSelectCategory(val)}}>
                    {category.map((ele)=>{
                        return(<Option value={ele.id}>{ele.name}</Option>)
                    })}
                </Select>
            </div>
            <div className="dish_type">
                <Title level={4}>Meal Type</Title>
                <Radio.Group onChange={(e) => { setType(e.target.value) }} value={type}>
                    <Radio value={'veg'}>Veg</Radio>
                    <Radio value={'nonveg'}>Non-Veg</Radio>
                </Radio.Group>
            </div>
            <div className="dish_customize">
                <Title level={4}>Customization Available ?</Title>
                <Radio.Group onChange={(e) => { setCustomization(e.target.value) }} value={customization}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </div>
            {customization ?
                <div>
                    <Title level={4}>Add Customization</Title>
                    <Input value={customName} onChange={(e) => { setCustomName(e.target.value) }} placeholder="Fajita Pizza"></Input>
                    <Input style={{ width: 200, marginTop: 15 }} value={customPrice} onChange={(e) => { setCustomPrice(e.target.value) }} placeholder="300.00" prefix="₹" suffix="INR" />
                    <Button onClick={() => {
                        if (customPrice !== '' && customName !== '') {
                            setCustomItems([...customItems, { name: customName, price: parseFloat(customPrice) }])
                            setCustomName('')
                            setCustomPrice('')
                        }
                    }} style={{ display: "block", marginTop: 15 }} type="primary" size={'medium'} >ADD</Button>
                </div>
                : <div>
                    <Title level={4}>Price</Title>
                    <Input style={{ width: 200 }} value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="300.00" prefix="₹" suffix="INR" />
                </div>}
            {customization ?
                <div>
                    <Tag color="#87d068" style={{ marginBottom: 5 }}>All Customizations</Tag>
                    {customItems.map((ele, i) => {
                        return (<div style={{ display: "flex", alignItems: "center" }}><Tag style={{ padding: 5, fontSize: 16, width: "fit-content", marginTop: 5 }} color="geekblue">{ele.name} - ₹{ele.price}  </Tag> <TiDelete onClick={() => {
                            let temp = [...customItems]
                            temp.splice(i, 1)
                            setCustomItems([...temp])
                        }} style={{ fontSize: 25, color: "red", cursor: "pointer" }} /></div>)
                    })}
                </div>
                : null}
                <Button onClick={save} style={{width:150}} type="primary">SAVE  MEAL</Button>
        </div>
    )

}
const mapStateToProps = (state) => {
    return ({
        category: state.category
    })
}

export default connect(mapStateToProps)(AddDishes)
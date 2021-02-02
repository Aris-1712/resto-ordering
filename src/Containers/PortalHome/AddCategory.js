import react, { useState } from 'react'
import { Typography } from 'antd';
import { Button } from 'antd';
import './AddCategory.css'
import { Input } from 'antd';
import firebase from '../../Global/firebase'
import {toast} from 'react-toastify'

const { Title } = Typography;
const AddCategory=(props)=>{
const [name,setName]=useState('')
const save=async()=>{
if(name===""){
    toast.error("Please enter the category name.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}else{
    firebase.firestore().collection("Category").add({name:name,uid:localStorage.getItem("uid"),companyid:localStorage.getItem('company_id')}).then((res)=>{
        setName("")
        toast.success("Category added.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }).catch((err)=>{
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
}
}
return(
    <div className='Add_Category'>
    <Title level={2}>Add Category</Title>
    <Input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Ex. Breakfast"></Input>
    <Button onClick={save} style={{width:100}} type="primary">SUBMIT</Button>
    </div>
)
}

export default AddCategory
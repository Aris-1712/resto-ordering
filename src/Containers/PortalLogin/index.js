import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import './PortalLogin.css'
import firebase from '../../Global/firebase'
import {toast} from 'react-toastify'
const PortalLogin = (props) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const login=(e)=>{
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
            localStorage.setItem("uid",res.user.uid) 
            firebase.firestore().collection("Company").where("uid",'==',res.user.uid).get().then((result)=>{
                result.forEach((ele)=>{
                    localStorage.setItem("company_id",ele.id)
                })
                props.history.push('/portal/home')
            })
            
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
    return (



        <div className="portal_login">

            <div class="container">
                <form onSubmit={login}>
                <div class="form">
                    <div class="input-field">
                        <label for="email">Email</label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" placeholder="example@example.com" id="email" name="email" />
                    </div>
                    <div class="input-field">
                        <label for="password">Password</label>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  required type="password" placeholder="********" id="password" name="password" />
                    </div>
                    <div class="input-field">
                    </div>
                    <div class="action">
                        <button type="submit" id="btn" class="btn">Sign in</button>
                    </div>
                </div>
                </form>
            </div>

        </div>
    )
}

export default PortalLogin
import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import firebase from '../../Global/firebase'
import './PortalSignup.css'
import { toast } from 'react-toastify'
const PortalSignup = (props) => {
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    const [conPass, setConPass] = useState('')
    const [email, setEmail] = useState('')
    const createUser = async (e) => {
        e.preventDefault()
        if (password === conPass) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    firebase.firestore().collection("Company").add({
                        email: email,
                        uid: userCredential.user.uid,
                        companyName: company
                    }).then((res) => {
                        props.history.push('/portal/login')
                        toast.success("Registration Successfull !", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }).catch((Err) => {
                        props.history.push('/portal/login')
                        toast.error("Registration Successfull, Proceed to login to register your company.", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    // ...
                })
                .catch((error) => {
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            console.log("HERE")
            toast.error('Passwords do not match.', {
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



        <div className="portal_signup">

            <div class="container">
                <div class="form">
                    <form onSubmit={createUser}>
                        <div class="input-field">
                            <label for="email">Company Name</label>
                            <input value={company} onChange={(e) => { setCompany(e.target.value) }} type="text" required placeholder="ABC Company LLC." />
                        </div>
                        <div class="input-field">
                            <label for="email">Email</label>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" required placeholder="example@example.com" id="email" name="email" />
                        </div>
                        <div class="input-field">
                            <label for="password">Password</label>
                            <input type="password" onChange={(e) => { setPassword(e.target.value) }} required placeholder="********" id="password" name="password" />
                        </div>
                        <div class="input-field">
                            <label for="password">Confirm Password</label>
                            <input type="password" onChange={(e) => { setConPass(e.target.value) }} required placeholder="********" id="password" name="password" />
                        </div>

                        <div class="action">

                            <button type="submit" id="btn" class="btn">Register</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default PortalSignup
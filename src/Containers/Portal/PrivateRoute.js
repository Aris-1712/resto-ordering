import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute=(props)=>{
    console.log(localStorage.getItem("uid"))
    if(localStorage.getItem("uid")!==null && localStorage.getItem("company_id")!==null){
        return(<Route path={props.path} component={props.component}></Route>)
    }
    return(
        <Redirect to='/portal/login'></Redirect>
    )
}

export default PrivateRoute
import React from 'react'
import { Route, Switch } from 'react-router'
import PortalHome from '../PortalHome'
import PortalLogin from '../PortalLogin'
import PortalSignup from '../PortalSignup'

const Portal=(props)=>{
    console.log("HERE")
    return(
        <>
   
            <Switch>
            <Route path="/portal/login" component={PortalLogin}></Route>
            <Route path='/portal/home' component={PortalHome}></Route>
            <Route path="/portal/Register" component={PortalSignup}></Route>
            </Switch>
        </>
    )
}

export default Portal
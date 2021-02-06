import React from 'react'
import { Route, Switch } from 'react-router'
import PortalHome from '../PortalHome'
import PortalLogin from '../PortalLogin'
import PortalSignup from '../PortalSignup'
import PrivateRoute from './PrivateRoute'

const Portal=(props)=>{
    console.log("HERE")
    return(
        <>
   
            <Switch>
            <Route path="/portal/login" component={PortalLogin}></Route>
            <PrivateRoute path='/portal/home' component={PortalHome}></PrivateRoute>
            <Route path="/portal/Register" component={PortalSignup}></Route>
            </Switch>
        </>
    )
}

export default Portal
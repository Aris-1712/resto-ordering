import React from 'react'
import { Route, Switch } from 'react-router'
import UserMenu from './UserMenu'


const User=(props)=>{

    return(
        <div>
            <Switch>
                <Route path="/User/Menu/:id" component={UserMenu}></Route>
            </Switch>
        </div>
    )

}

export default User
import React, { useEffect } from 'react'
import './PortalHome.css'
import { Tabs, Radio } from 'antd';
import AddCategory from './AddCategory';
import AddDishes from './AddDishes';
import Menu from './Menu'
import * as Actions from '../../Global/Actions'
import { connect } from 'react-redux';
import QRCode from 'qrcode.react'
import Dashboard from './Dashboard';
const PortalHome=(props)=>{
   
    useEffect(()=>{
      props.getCategory()
      props.getMeals()
    },[])
    const { TabPane } = Tabs;
    console.log(window.location)
    return(
        <div className="Portal_Home">
            <div>
        
        <Tabs defaultActiveKey="1" tabPosition={'left'} >
          <TabPane key={1} tab="Add Categories">
          <AddCategory></AddCategory>
          </TabPane>
          <TabPane key={2} tab="Add Meals">
          <AddDishes></AddDishes>
          </TabPane>
          <TabPane key={3} tab="Menu">
          <Menu></Menu>
          </TabPane>
          <TabPane key={4} tab="QR Code">
          <QRCode value={`${window.location.origin}/user/menu/${localStorage.getItem('company_id')}`} />
          </TabPane>
          <TabPane key={5} tab="Dashboard">
          <Dashboard></Dashboard>
          </TabPane>
        </Tabs>
      </div>
        </div>
    )
}


const mapActionsToProps=(dispatch)=>{
  return({
    getCategory:()=>{dispatch(Actions.getCategories())},
    getMeals:()=>{dispatch(Actions.getMeals())}
  })
}

export default connect(null,mapActionsToProps)(PortalHome)
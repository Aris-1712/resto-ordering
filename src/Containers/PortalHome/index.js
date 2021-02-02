import React, { useEffect } from 'react'
import './PortalHome.css'
import { Tabs, Radio } from 'antd';
import AddCategory from './AddCategory';
import AddDishes from './AddDishes';
import * as Actions from '../../Global/Actions'
import { connect } from 'react-redux';
const PortalHome=(props)=>{
    // const [mode,setMode]=useState()
    useEffect(()=>{
      props.getCategory()
    },[])
    const { TabPane } = Tabs;

    return(
        <div className="Portal_Home">
            <div>
        
        <Tabs defaultActiveKey="1" tabPosition={'left'} >
          {/* {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
            <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </TabPane>
          ))} */}
          <TabPane key={1} tab="Add Categories">
          <AddCategory></AddCategory>
          </TabPane>
          <TabPane key={2} tab="Add Meals">
          <AddDishes></AddDishes>
          </TabPane>
        </Tabs>
      </div>
        </div>
    )
}


const mapActionsToProps=(dispatch)=>{
  return({
    getCategory:()=>{dispatch(Actions.getCategories())}
  })
}

export default connect(null,mapActionsToProps)(PortalHome)
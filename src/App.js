import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import Portal from './Containers/Portal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "antd/dist/antd.css";
import User from './Containers/User';

function App() {
  return (
    <div>
      <Switch>
      <Route path='/portal' component={Portal}></Route>
      <Route path="/User" component={User}></Route>
      <Route path="*" render={()=>{
        return(
          <Redirect to={'/portal/home'}></Redirect>
        )
      }}></Route>
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App
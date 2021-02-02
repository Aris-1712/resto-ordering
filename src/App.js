import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router';
import Portal from './Containers/Portal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import "antd/dist/antd.css";
function App() {
  return (
    <div>
      <Switch>
      <Route path='/portal' component={Portal}></Route>
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;

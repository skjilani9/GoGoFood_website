import './App.css';
import Home from './screen/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screen/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screen/Signup';
import { CartProvide } from './components/ContextReducer';
import MyOrder from './screen/Myorder';

function App() {
  return (
    <CartProvide>
      <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/createuser' element={<Signup />}></Route>
          <Route exact path='/myorder' element={<MyOrder />}></Route>
        </Routes>
      </div>
    </Router>
    </CartProvide>
  );
}

export default App;

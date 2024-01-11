
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import Register from "./components/register/Register";
import Login from './components/login/Login';
import Homepage from './components/homepage/Homepage';

function App() {
  const user=localStorage.getItem("token")
  return (
   <Routes>
    {user &&<Route path='/' exact element={<Homepage></Homepage>}/>}
    <Route path='/signup' exact element={<Register></Register>}></Route>
    <Route path='/login' exact element={<Login></Login>}></Route>
    <Route path='/' exact element={<Navigate replace to="/login"/>}></Route>
   </Routes>
  );
}

export default App;

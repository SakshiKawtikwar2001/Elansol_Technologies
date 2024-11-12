import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import PageNotFound from './Components/PageNotFound';
import LoginForm from './Components/LoginForm.js';
import RegistrationForm from './Components/RegistrationForm.js';
import Home from './Components/Home.js';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
            <Route path="/" element = {<LoginForm></LoginForm>}></Route>
            <Route path="/register" element = {<RegistrationForm></RegistrationForm>}></Route>
            <Route path="/home" element = {<Home></Home>}></Route>
            <Route path="*" element = {<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
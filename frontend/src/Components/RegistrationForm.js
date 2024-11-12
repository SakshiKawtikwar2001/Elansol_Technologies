import React,{ useState } from 'react'
import {useNavigate,Link } from 'react-router-dom';

import axios from 'axios'

function RegistrationForm() {
    const navigate = useNavigate();
    const apiUrl = "http://localhost:3030";
    const [data,setData] = useState({
        name:"",
        dateOfBirth:"",
        email:"",
        password:""
    })
    const [cpass,setCPass] = useState("");

    const cpassHandler = (e)=>{
        setCPass(e.target.value);
    }
    const inputHandler = (e)=>{
        const key = e.target.name;
        const value = e.target.value;
        setData({...data,[key]:value});
    }
    function formSubmit(e){
        e.preventDefault();
        var pattern = /(^[a-zA-Z0-9@#$%&*]{2,9})+([@#$%&*]{1,1})+([a-zA-Z0-9@#$%&*]{3,10})$/;
        if (data.password.match(pattern) && data.password === cpass){
            console.log(data);
            axios.post(`${apiUrl}/register`,data)
            navigate('/')
        }
        
    }
  return (
    <>
    <div className="container-form w-50 border shadow m-auto mt-5">
        <div className="form-container" >
        <div className="form-header">
            <h2 className='text-center text-dark p-3'>SIGN UP</h2>
        </div>
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} placeholder="Name" required></input>
            </div>
            <div className="mb-3">
                <input type="date" className="form-control" name="dateOfBirth" value={data.dateOfBirth} onChange={inputHandler} placeholder="Date of birth"required></input>
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" name="email" value={data.email} onChange={inputHandler} placeholder="Email address" required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name="password" onChange={inputHandler} placeholder="Password" required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name="cpass" onChange={cpassHandler} placeholder="Confirm Password" required/>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn form-control my-4" style={{backgroundColor:'#0dcaf0'}}>REGISTER</button>
            </div>
            </form>
            <h6 className='text-center text-white pb-3'>Already a user? <span><Link to="/" className="link-style">Login now</Link></span></h6>
        </div>
     </div>
     </>
  )
}

export default RegistrationForm


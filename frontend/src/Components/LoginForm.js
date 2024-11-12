import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const apiUrl = "http://localhost:3030/login";
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const inputHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({ ...data, [key]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(apiUrl, data);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    }

    return (
        <>
            <div className="container-form w-50 border shadow m-auto mt-5">
                <div className="form-container">
                    <div className="form-header">
                        <h2>SIGN IN</h2>
                    </div>
                    <div className="profile-icon-container">
                        <img src={require("../Static/Profile.png")}
                            alt="Profile Icon"
                            className="profile-icon"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="mb-3">
                            <input type="email" className="form-control form-input" name="email" value={data.email} onChange={inputHandler} placeholder="username" required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control form-input" name="password" value={data.password} onChange={inputHandler} placeholder="password" required />
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <input type="checkbox" /> <label className="checkbox-label">Remember me</label>
                            </div>
                            <div><label className="forgot-password">Forgot your password?</label></div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" style={{backgroundColor:'#0dcaf0'}} className="btn form-control my-4 submit-btn">LOGIN</button>
                        </div>
                        <h6 className='text-center pb-3 text-white'>
                            Not a member? <span><Link to="/register" className="link-style">Signup now</Link></span>
                        </h6>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;

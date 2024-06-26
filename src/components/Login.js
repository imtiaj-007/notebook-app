import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [ udata, setuData ] = useState({ email: "", password: ""});
    let Navigate = useNavigate();

    const handleOnChange = (e) => {
        setuData({ ...udata, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(udata),
            });
            const res = await response.json();
            if (res.success){
                localStorage.setItem("auth-token", res.apiToken);
                Navigate('/notes');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="container my-3 border border-4 rounded d-flex m-auto" style={{ minHeight: "40vh", width: "30vw" }}>
                <form className="container my-3" onSubmit={handleSubmit}>
                    <h2 className="text-center">Login</h2>
                    <div className="my-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange}/>
                    </div>
                    <div className="my-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange}/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

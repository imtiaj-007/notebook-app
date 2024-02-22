import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [udata, setuData] = useState({ name: "", email: "", password: "" });
    let Navigate = useNavigate();

    const handleOnChange = (e) => {
        setuData({ ...udata, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(udata),
            });
            const res = await response.json();
            if (res.success) {
                Navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="container my-3 border border-4 rounded d-flex m-auto" style={{ minHeight: "40vh", width: "30vw" }}>
                <form className="container my-3" onSubmit={handleSubmit}>
                    <h2 className="text-center">Signup</h2>
                    <div className="my-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={handleOnChange} required onInvalid={(e)=> e.target.setCustomValidity("Name can't be empty..!")}
                            onInput={(e)=> e.target.setCustomValidity("")} />
                    </div>
                    <div className="my-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} required onInvalid={(e)=> e.target.setCustomValidity("Email is Required..!")}
                            onInput={(e)=> e.target.setCustomValidity("")} />
                    </div>
                    <div className="my-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange} required minLength={5} onInvalid={(e)=> e.target.setCustomValidity("Password length must be atleast 5")}
                            onInput={(e)=> e.target.setCustomValidity("")} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup

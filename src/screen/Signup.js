import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'


export default function Signup() {
    const alert = useAlert();
    const navigate = useNavigate()
    const [data, setData] = useState({ name: "", email: "", password: "", location: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4567/api/v1/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: data.name, email: data.email, password: data.password, location: data.location })
            })
        const json = await response.json();
        if (!json.success) {
            alert.error("Please enter the valid details")
        }
        navigate("/login")
        alert.success("User created successfully")
    }

    const onchange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    
    return (
        <>
            <div className='backdata'>
                <img src="https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x375.jpg" alt="" />
                <div className='container' id='backdata3'>
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName1" className="form-label">Name</label>
                            <input type="text" className="form-control" required name="name" value={data.name} onChange={onchange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required value={data.email} onChange={onchange} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" required name="password" value={data.password} onChange={onchange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputLocation1" className="form-label">Location</label>
                            <input type="text" className="form-control" name="location" required value={data.location} onChange={onchange} />
                        </div>
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

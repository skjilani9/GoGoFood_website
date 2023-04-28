import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'

const Login = () => {
  const alert = useAlert()
  const navigate = useNavigate()
  const [data, setData] = useState({ email: "", password: "" })
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4567/api/v1/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: data.email, password: data.password })
      })
    const json = await response.json();
    
    if (!json.success) {
      alert.error("Please enter the valid Email id or Password")
    }
    if(json.success){
      localStorage.setItem("useremail",data.email)
      localStorage.setItem("authToken",json.authToken)
      navigate("/")
      alert.success("successfully login")
    }
  }
  const onchange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  return (
    <>
    <div className='backdata'>
      <img src="https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x375.jpg" alt="" />
      <div className='container' id='backdata2'>
        <form onSubmit={handlesubmit}>
          <div className="mb-3 fs-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={onchange} />
          </div>
          <div className="mb-3 fs-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={data.password} onChange={onchange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">New  user</Link>

        </form>
      </div>
      </div>
    </>
  )
}

export default Login

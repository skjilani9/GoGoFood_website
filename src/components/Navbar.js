import React, { useState } from 'react'
import { Link , useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from '../components/ContextReducer'
import { useAlert } from 'react-alert';

const Navbar = () => {
    const alert = useAlert();
    let data = useCart();
    const navigate = useNavigate();
    const [cartview , setCartView]= useState(false);

    const handleLogout = ()=>{
        localStorage.removeItem("authToken")
        navigate("/login")
        alert.success("successfully logout")

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1" to="/">GoGoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-1">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken"))?
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My orders</Link>
                            </li> :""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken"))?
                        <div className='d-flex'>
                        <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                        <Link className="btn bg-white text-success mx-1" to="/createuser">create account</Link>
                        </div>:
                        <div>
                            <div className='btn bg-white text-success mx-1' onClick={()=>setCartView(true)}>My cart{""}
                            <Badge pill bg='danger '>{data.length}</Badge>
                            </div>
                            {cartview?<Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null }
                            <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>Logout</div>
                        </div>
                        }
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

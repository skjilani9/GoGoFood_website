import React from "react";
import {Delete} from '@mui/icons-material';
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { useAlert } from "react-alert";

export default function Cart() {
    const alert = useAlert()
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("useremail");
        let response = await fetch("https://gogofood.vercel.app/api/v1/orderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        if (response.status === 200) {
            dispatch({ type: "DROP" })
            alert.success("Item purchased successfully")
        }
    }
    const handledelete = ()=>{
        dispatch({ type: "REMOVE" })
        alert.success("Item deleted")
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.quty}</td>
                                <td>{food.siz}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><Delete onClick={handledelete} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}
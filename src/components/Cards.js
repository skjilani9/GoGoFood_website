import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer'
import { useAlert } from 'react-alert';

export default function Cards(props) {
    const alert = useAlert();
    let dispatch = useDispatchCart();
    const [quty, setQuty] = useState(1);
    const refprice = useRef();
    // let fooditems = props.item;
    const [siz, setSiz] = useState("");
    let data = useCart()
    let options = props.options
    let priceoptions = Object.keys(options)
    let finalprice = quty * parseInt(options[siz]);
    useEffect(() => {
        setSiz(refprice.current.value)
    }, [])

    const handleaddcart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.fooditems._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.siz === siz) {
              await dispatch({ type: "UPDATE", id: props.fooditems._id, price: finalprice, quty: quty })
              alert.error("Please select different size , Add one more to the list")
              return
            }
            else if (food.siz !== siz) {
              await dispatch({ type: "ADD", id:props.fooditems._id, name: props.fooditems.name, price: finalprice, quty: quty, siz: siz,img: props.img })
              alert.success("Item Added to Cart")
              return
            }
            return
          }
        await dispatch({ type: "ADD", id: props.fooditems._id, name: props.fooditems.name, quty: quty, siz: siz, price: finalprice, img: props.img })
        
        
    }

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: '18rem' }}>
                    <img src={props.fooditems.img} className="card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditems.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return <option key={i + 1} value={i + 1}>{i + 1}</option>
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={refprice} onChange={(e) => setSiz(e.target.value)}>
                                {priceoptions.map((data) => {
                                    return <option key={data} value={data}> {data} </option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>₹{finalprice}/-</div>
                            <hr />
                            <div>
                                <div className='btn btn-success justify-center m-auto ms-5' onClick={handleaddcart}>Add to cart</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

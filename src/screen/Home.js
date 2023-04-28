import React, { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
    const [Search, setSearch] = useState("")
    const [Foodcat, setFoodcat] = useState([]);
    const [Fooditem, setFooditem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:4567/api/v1/fooddata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json();
        setFoodcat(response[1])
        setFooditem(response[0])
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                    <div className="carousel-inner" id='imgdata' style={{ objectFit: "contain !important" }} >
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/500×500/?fruit" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item" id='imgdata2'>
                            <img src="https://source.unsplash.com/random/500×500/?food" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item" id='imgdata3'>
                            <img src="https://source.unsplash.com/random/500×500/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    Foodcat !== [] ? Foodcat.map((data) => {
                        return (
                            <div className='row mb-3 mt-3'>
                                <div key={data._id} className="fs-3 mg-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {Fooditem !== [] ? Fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLocaleLowerCase()))).map(filteritems => {
                                    return (
                                        <div key={filteritems._id} className="col-10 col-lg-3 col-md-6">
                                            <Cards fooditems={filteritems}
                                                options={filteritems.options[0]}
                                            ></Cards>
                                        </div>
                                    )
                                }) : <div>no such items</div>}
                            </div>
                        )
                    }) : <div>"""""""""""""""</div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home

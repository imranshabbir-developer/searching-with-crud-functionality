import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { searchcontext } from './context/Contextprovider';

const Navbaar = () => {

    const [searchvalue,setSearchvalue] = useState("")
    const {search, setSearch} = useContext(searchcontext);


    const searchaddvalue = (e)=>{
        e.preventDefault();
        setSearch(searchvalue)
    }
  
    return (
        <>
            <div className="back">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid ">
                        <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" onChange={(e)=>setSearchvalue(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-primary" type="submit" onClick={searchaddvalue}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbaar;

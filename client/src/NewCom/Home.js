import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../App.css"
import { NavLink, useHistory } from 'react-router-dom';
import { datacontext, dltcontext, searchcontext } from "./context/Contextprovider";
import Alert from '@mui/material/Alert';
import { updatecontext } from './context/Contextprovider';




const Home = () => {

    const [page,setPage] = useState(1);
    const [pagecount,setPageCount] = useState(0);

    const {search, setSearch} = useContext(searchcontext);
    console.log(search)

    const [finaldata, setFinaldata] = useState([]);// aiya jo error aave to [] kri devu
    console.log(finaldata)

    const history = useHistory();

    const { state, setState } = useContext(datacontext);
    const { dlt, setDlt } = useContext(dltcontext);

    const { update, setUpdate } = useContext(updatecontext);

    const getres = async () => {
        try {
            // const res = await fetch("https://userprofilecrud.herokuapp.com/getdata", {
            const res = await fetch(`/getdata?page=${page}&search=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);

            if (res === 404 && !data) {
                console.log("error while data is not present");
            } else {
                setFinaldata(data);
                setPageCount(data.pagination.pageCount)
            }

        } catch (error) {
            console.log(error + "error while getting the data");
        }

    }

    // console.log("waiting" + finaldata);

  

    const dltuser = async (id) => {
        try {
            const res = await fetch(`/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            // console.log(data);

            if (res === 404 && !data) {
                console.log("no delete");
            } else {
                console.log("data is delete");
                history.push("/");
                // alert("user delete done");
                setDlt(data);
                getres();
            }

        } catch (error) {
            console.log(error + "error while deleting the data");
        }
    }


    // handle prev btn
    const handlePrevious = ()=>{
        setPage((p)=>{
            if(p == 1) return p;
            return p-1;
        })
    }

// here p means pagej thay
    const handleNext = ()=>{
        setPage((p)=>{
            if(p === pagecount) return p;
            return p + 1
        })
    }   

    useEffect(() => {
        getres();
    }, [page,search]);
    

    return (
        <>
            {
                state ? <Alert style={{ fontSize: 18 }} className="alert" severity="info" onClose={() => setState(false)}>Hey <strong>{state.name}</strong> Your Data successuflly Added</Alert> : ""
            }
            {
                dlt ? <Alert style={{ fontSize: 18 }} severity="error" onClose={() => setDlt(false)}>Hey <strong>{dlt.name}</strong>  Your Data successuflly Deleted</Alert> : ""
            }
            {
                update ? <Alert style={{ fontSize: 18 }} severity="success" onClose={() => setUpdate(false)}>Hey <strong>{update.name}</strong>  Your Data successuflly Update</Alert> : ""
            }

            <section className="mt-5">
                <div className="container">
                    <div className="ok mb-2">
                        <NavLink to="/register">
                            <button className="btn btn-primary"> <AddIcon />Add Data</button>
                        </NavLink>
                    </div>


                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col" className="crud"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                finaldata.getdata?.map((element, ind) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`getdata/${element._id}`}><button className="btn btn-success"><VisibilityIcon /> </button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}> <button className="btn btn-primary"><EditIcon /></button> </NavLink>
                                                    <NavLink to=""><button onClick={() => dltuser(element._id)} className="btn btn-danger" ><DeleteOutlineIcon /></button></NavLink>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <footer>
                    <p>page : {page}</p>
                    <p>pagecount : {pagecount}</p>
                        <button disabled={page == 1} className='btn btn-primary' onClick={handlePrevious}>prev</button>
                        {
                            Array(pagecount).fill(null).map((el,i)=>{
                                return <button className={page == i +1 ? "btn btn-success":"btn btn-primary"}  onClick={()=>setPage(i+1)}>{i+1}</button>
                            })
                        }
                        <button className='btn btn-primary' disabled={page == pagecount} onClick={handleNext}>next</button>
                        <select value={page} onChange={(e) => setPage(e.target.value)}>
                            {
                                Array(pagecount).fill(null).map((_,index)=>{
                                    return <option  key={index}>{index+1}</option>
                                })
                            }
                        </select>
                    </footer>
                </div>
            </section>
        </>
    )
}

export default Home

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Update = () => {
    const users = {
        fname: 'anand',
        lname: 'kush',
        email: 'anand@'
    }
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    useEffect(() => {
        axios.get(`http://localhost:1101/api/getbyid/${id}`).then(res => {
            if (res.data) {
                setUser(res.data);
            }
        }).catch(err => toast.warn(err))
    }, [id])
    const SubmitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:1101/api/upd/${id}`, user).then((res) => {
            if (res.data) {
                toast.success(res.data.msg, { position: 'top-right' });
                navigate("/");
            }
        }).catch(err => toast.warn(err))
    }
    return (
        <>
            <div className="container">
                <div className="btn py-5">
                    <Link to={'/'}><button className='btn btn-danger'>Back</button></Link>
                </div>
                <div className="row">
                    <div className="border p-3 shadow bg-light">
                        <div className="col-lg-4 offset-lg-5">
                            <div className="title">
                                <h4 className='text-primary'>Edit Form </h4>
                            </div>
                            <form onSubmit={SubmitForm}>
                                <div class="mb-3">
                                    <label >Fist Name</label>
                                    <input type="text" class="form-control" name='fname' value={user.fname} onChange={inputHandler} />
                                </div>
                                <div class="mb-3">
                                    <label >Last Name</label>
                                    <input type="text" class="form-control" name='lname' onChange={inputHandler} value={user.lname} />
                                </div>
                                <div class="mb-3">
                                    <label >Email</label>
                                    <input type="text" class="form-control" name='email' onChange={inputHandler} value={user.email} />
                                </div>
                                <button type="submit" class="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update
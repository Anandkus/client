import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Adduser = () => {
  const users = {
    fname: '',
    lname: '',
    email: '',
    password: ''
  }
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inpuHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:1101/api/create", user).then((res) => {
      if (res.data) {
        toast.success(res.data.msg, { position: 'top-right' });
        navigate("/")
      }
    }).catch(err =>console.log(err));
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
                <h4 className='text-primary'>Add New User+</h4>
              </div>
              <form onSubmit={submitForm}>
                <div class="mb-3">
                  <label >Fist Name</label>
                  <input type="text" class="form-control" onChange={inpuHandler} name='fname' />
                </div>
                <div class="mb-3">
                  <label >Last Name</label>
                  <input type="text" class="form-control" onChange={inpuHandler} name='lname' />
                </div>
                <div class="mb-3">
                  <label >Email</label>
                  <input type="email" class="form-control" onChange={inpuHandler} name='email' />
                </div>
                <div class="mb-3">
                  <label >Password</label>
                  <input type="password" class="form-control" onChange={inpuHandler} name='password' />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adduser;
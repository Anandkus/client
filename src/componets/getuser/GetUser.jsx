import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const GetUser = () => {
  const [users, setUsers] = useState([]);
  const fethData = async () => {
    await axios.get('http://localhost:1101/api/getalldata').then((res) => {
      if (res.data) {
        setUsers(res.data);
      }
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    fethData();
  }, []);

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:1101/api/deleteapi/${id}`).then((res) => {
      toast.success(res.data.msg, { position: 'top-right' });
      fethData();
    }).catch(err => console.log(err))
  }

  return (
    <>
      <div className="container py-5">
        <div className="btn-group text-end">
          <Link to={'/add'} >  <button className='btn btn-danger'>Add+</button></Link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">SrNo.</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, index) => {
                return (
                  <tr key={item._id} >
                    <th scope="row">{index + 1}</th>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="btn-group gap-2">
                        <Link to={`/edit/${item._id}`}><button className='btn btn-info' >Edit</button></Link>
                        <button onClick={() => deleteData(item._id)} className='btn btn-danger'>Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default GetUser
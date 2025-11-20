import axios from 'axios'
// import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

function Signin() {
    const [id,setId]=useState();

    const [form,setform]=useState({
        email:"",
        password:""
    })

    const Navigate=useNavigate();

    const handleform=(e)=>{
        setform({
            ...form, [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(form,"login form data");

        try {
            const res=await axios.post("http://localhost:8000/signin",form,{withCredentials:true});
            console.log(res.data);
            // setId(res.data.user._id);

            if(res.data.success){
                toast.success(res.data.message);
                setTimeout(()=>{
                    Navigate(`/home`);
                },1000);
                
            }else{
                toast.error("somethig went wrong")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }
  return (
    <>
        <div className="form w-full h-screen flex justify-center items-center bg-gray-600 text-black text-2xl">
            <form className='border-2 p-4 rounded-xl flex items-center justify-center flex-col bg-white w-96' onSubmit={handleSubmit}>
                <div>
                    <h1 className='text-blue-800 font-bold text-3xl'>Login</h1>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Email</label>
                    <input className='w-full py-2 px-1 my-2 rounded-md border-2' type="email" placeholder='Email' name="email" onChange={handleform}/>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Password</label>
                    <input className=' w-full border-2 py-2 px-1 rounded-md my-2' type="Password" placeholder='Password' name='password' onChange={handleform}/>
                </div>
                <div className='w-full'>
                    <button className='w-full mt-2 border-2 rounded-md p-1 bg-blue-600 hover:bg-blue-800 cursor-pointer' type='submit'>Submit</button>
                </div>
                <div className='mt-2'>
                    <p className='text-[15px]'>Don't have account? <Link className='text-blue-600' to="/signup">Signup</Link></p>
                </div>
            </form>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
}

export default Signin
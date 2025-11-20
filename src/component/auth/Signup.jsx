import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Signup() {
    const [form,setform]=useState({
        name:'',
        email:'',
        password:''
    })

    const handleform=(e)=>{
        setform({
            ...form, [e.target.name]:e.target.value
        })
    }

    const handlesubmit= async (e)=>{
        e.preventDefault();
        console.log(form,"form dasta");

        try{
            const res=await axios.post("http://localhost:8000/signup",form,{withCredentials:true});
            console.log(res.data, "backend response");
        }catch(err){
            console.log(err,"error");
        }
    }
  return (
    <>
        <div className="form w-full h-screen flex justify-center items-center bg-gray-600 text-black text-2xl">
            <form className='border-2 p-4 rounded-xl flex items-center justify-center flex-col bg-white w-96' onSubmit={handlesubmit}>
                <div>
                    <h1 className='text-blue-800 font-bold text-3xl'>Signup</h1>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Name</label>
                    <input className='w-full py-2 px-1 my-2 rounded-md border-2' type="text" placeholder='Name' name="name" required onChange={handleform}/>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Email</label>
                    <input className='w-full py-2 px-1 my-2 rounded-md border-2' type="email" placeholder='Email' name='email' required onChange={handleform}/>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Password</label>
                    <input className=' w-full border-2 py-2 px-1 rounded-md my-2' type="Password" placeholder='Password' name='password' required onChange={handleform} />
                </div>
                <div className='w-full'>
                    <button className='w-full mt-2 border-2 rounded-md p-1 bg-blue-600 hover:bg-blue-800 cursor-pointer' type='submit'>Submit</button>
                </div>
                <div className='flex items-center justify-center flex-col text-[15px] mt-2 font-medium'>
                    <p>Have an Account?</p>
                    <Link className='text-blue-600' to="/signin">Login</Link>
                </div>
            </form>
        </div>
    </>
  )
}

export default Signup
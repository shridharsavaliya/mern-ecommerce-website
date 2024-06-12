import React, { useContext, useState } from 'react'
import loginicon from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summeryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context';
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email:"",
        password:""
    })

    const {fetchUserAddToCart} = useContext(context)
    const handleonChange = (e) => {
        const {name,value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }

        })
    }

    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(context)
    const handleSubmit = async(e) => {
        e.preventDefault()
        const dataRes = await fetch(summeryApi.signIn.url,{
            method:summeryApi.signIn.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const dataApi = await dataRes.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if(!dataApi.success){
            toast.error(dataApi.message)
        }
    }
   
    // console.log("data login ", data)
    return (
        <div id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginicon} alt="login icon" />
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <div className='bg-slate-200 p-2'>
                            <input type="email" className='w-full h-full outline-none bg-transparent' placeholder='Enter your email' name='email' onChange={handleonChange} value={data.email} required/>

                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-200 p-2 flex'>
                            <input type={showPassword ? "" : "password"} className='w-full h-full outline-none bg-transparent' placeholder='Enter your password' name="password" value={data.password} onChange={handleonChange} required/>
                            <div className='cursor-pointer text-xl' onClick={()=> setShowPassword((prev)=> !prev)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />
                                        ): (
                                            <FaEye />
                                        )
                                    }
                                    
                                    
                                </span>
                            </div>
                            </div>
                            <Link to="/forgot-password" className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password</Link>
                        </div>
                        <button type='submit' className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                    </form>
                    <p className='my-5'>Don't have account ? <Link to="/sign-up" className='hover:text-red-700 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginicon from "../assest/signin.gif"
import imgTobase64 from '../helper/imgtobase64';
import summeryApi from '../common';
import { toast } from 'react-toastify';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmpassword: "",
        profilepicture: ""
    })
    const handleonChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmpassword) {
            const dataRes = await fetch(summeryApi.signUp.url, {
                method: summeryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })


            const dataapi = await dataRes.json()

            if (dataapi.success) {
                toast.success(dataapi.message)
                navigate("/login")
            }
            if (!dataapi.success) {
                toast.error(dataapi.message)
            }

            console.log("data", dataapi)
        }
        else{
            toast.error("password and confirm password not match")
        }
    }

    const handleuplodepic = async (e) => {
        const file = e.target.files[0]
        const imgPic = await imgTobase64(file)
        // console.log("imagepic", imgPic) 
        setData((prev) => {
            return {
                ...prev,
                profilepicture: imgPic
            }
        })
    }

    console.log("data login ", data)
    return (
        <div>
            <div id='signup'>
                <div className='mx-auto container p-4'>
                    <div className='bg-white p-5 w-full max-w-sm mx-auto'>

                        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                            <div >
                                <img src={data.profilepicture || loginicon} alt="login icon" />
                            </div>
                            <form>
                                <label>
                                    <div className='text-xs bg-opacity-50 bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer'>
                                        Uplode Photo
                                    </div>
                                    <input type="file" className='hidden' onChange={handleuplodepic} />
                                </label>
                            </form>
                        </div>
                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label>Name:</label>
                                <div className='bg-slate-200 p-2'>
                                    <input type="text" className='w-full h-full outline-none bg-transparent' placeholder='Enter your name' name='name' onChange={handleonChange} value={data.name} required />
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Email:</label>
                                <div className='bg-slate-200 p-2'>
                                    <input type="email" className='w-full h-full outline-none bg-transparent' placeholder='Enter your email' name='email' onChange={handleonChange} value={data.email} required />
                                </div>
                            </div>
                            <div>
                                <label>Password:</label>
                                <div className='bg-slate-200 p-2 flex'>
                                    <input type={showPassword ? "text" : "password"} className='w-full h-full outline-none bg-transparent' placeholder='Enter your password' name="password" value={data.password} onChange={handleonChange} required />
                                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                        <span>
                                            {
                                                showPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )
                                            }


                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Confirm Password:</label>
                                <div className='bg-slate-200 p-2 flex'>
                                    <input type={showconfirmPassword ? "text" : "password"} className='w-full h-full outline-none bg-transparent' placeholder='Enter confirm password' name="confirmpassword" value={data.confirmpassword} onChange={handleonChange} required />
                                    <div className='cursor-pointer text-xl' onClick={() => setShowconfirmPassword((prev) => !prev)}>
                                        <span>
                                            {
                                                showconfirmPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )
                                            }


                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
                        </form>
                        <p className='my-5'>Already have account ? <Link to="/login" className='hover:text-red-700 hover:underline'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

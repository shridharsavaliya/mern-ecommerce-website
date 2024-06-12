import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

export default function Adminpanel() {
  const user = useSelector((state) => state?.user?.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  },[user])
    // console.log("user",user)
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 shadow-md'>
        <div className='h-32 flex items-center justify-center flex-col'>
        <div className='text-5xl cursor-pointer'>{
            user?.profilepicture ? (
              <img src={user.profilepicture} className='w-20 h-20 rounded-full' alt={user.name} />
            ) : (
              <FaRegCircleUser />
            )
          }
          </div>
          <p className='capitalize text-sm font-semibold'>{user?.name}</p>
          <p>{user?.role}</p>
        </div>
            <div>
                {/* navigation */}
            </div>
            <nav className='grid p-4'>
                <Link to="all-users" className='px-2 py-1 hover:bg-slate-100'>All users</Link>
                <Link to="product" className='px-2 py-1 hover:bg-slate-100'>Product</Link>
            </nav>
      </aside>
      <main className='w-full h-full p-2'>
           <Outlet></Outlet>
      </main>
    </div>
  )
}

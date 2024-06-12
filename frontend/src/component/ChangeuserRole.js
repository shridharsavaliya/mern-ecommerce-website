import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import summeryApi from '../common';
import ROLE from '../common/role';
import { toast } from 'react-toastify';


export default function ChangeuserRole({
  name,email,role,onclose,userid,callFunc
}) {
  const [userRole, setUserRole] = useState(role)
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value)
    // console.log(e.target.value)
  }

  const updateuserRole = async() => {
    
      const fetchResponse = await fetch(summeryApi.updateuser.url,{
        method:summeryApi.updateuser.method,
        credentials:"include",
        headers:{
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          userid:userid,
          role:userRole
        })
      })
      const responseData = await fetchResponse.json()
      // console.log("responseData",responseData)

      if(responseData.success){
        toast.success(responseData.message)
        onclose()
        callFunc()
      }
    
  }
  return (
    <div className='fixed w-full h-full z-100 flex justify-between top-0 bottom-0 left-0 right-0 items-center bg-slate-200 bg-opacity-50'>
      <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>

    <button className='block ml-auto' onClick={onclose}><IoMdClose /></button>
      <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

      <p>Name:{name}</p>
      <p>Email:{email}</p>
      <div className='flex items-center justify-between my-4'>
      <p>Role:</p>
      <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
        {
            Object.values(ROLE).map(el => {
                return(
                    <option value={el} key={el}>{el}</option>
                )
            })
        }
      </select>
      </div>
      <button className='w-fit mx-auto block py-1 px-3 bg-red-600 text-white rounded-full hover:bg-red-700' onClick={updateuserRole}>Change Role</button>
      </div>
    </div>
  )
}

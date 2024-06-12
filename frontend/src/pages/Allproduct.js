import React, { useEffect, useState } from 'react'
import Uplodeproduct from '../component/Uplodeproduct'
import summeryApi from '../common'
import Adminproductcard from '../component/Adminproductcard'

export default function Allproduct() {
  const [uplodeproduct,setUplodeproduct] = useState(false)
  const [allproduct,setallproduct] = useState([])

  const fetchAllproduct = async() => {
    const response = await fetch(summeryApi.getproduct.url,{
      method:summeryApi.getproduct.method
    })

    const dataresponse = await response.json()
    setallproduct(dataresponse?.data || [])
  }
  useEffect(()=>{
    fetchAllproduct()
  },[])
  // console.log("allproduct",allproduct)

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>(setUplodeproduct(true))}>Uplode Product</button>
      </div>
     
      <div className='flex flex-wrap items-center gap-5 py-4 min-h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allproduct.map((product,index)=>{
              return (
                <Adminproductcard data={product} key={index} fetchdata={fetchAllproduct}></Adminproductcard>
              )
            })
          }
      </div>


     {
      uplodeproduct && (
      <Uplodeproduct onclose={()=>(setUplodeproduct(false))} fetchdata={fetchAllproduct}/>

      )
     }
    </div>
  )
}

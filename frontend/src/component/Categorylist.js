import React, { useEffect, useState } from 'react'
import summeryApi from '../common'
import { Link } from 'react-router-dom'

export default function Categorylist() {
    const [categoryproduct, setcategoryproduct] = useState([])
    const [loading, setloading] = useState(false)

    const categoryloading = new Array(13).fill(null)

    const fetchcategoryproduct = async () => {
        setloading(true)
        const response = await fetch(summeryApi.getCategoryProduct.url)
        const dataresponse = await response.json()
        setloading(false)
        setcategoryproduct(dataresponse.data)
        console.log("catelist",dataresponse)
    }
    useEffect(() => {
        fetchcategoryproduct()
    }, [])
    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                     {  
                     
                     loading ? (
                        categoryloading.map((el, index) => {
                            return (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={index}></div>
                            )
                        })
                     ):(
                        categoryproduct.map((product, index) => (
                            <Link to={"/categoryproduct?category=" + product?.category} className='cursor-pointer' key={index}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex  bg-slate-200 items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply p-3 hover:scale-110 transition-all' />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        ))
                     ) 
                }
            </div>
        </div>
    );
}


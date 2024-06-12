import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchcategorywiseproduct from '../helper/fetchcategorywiseproduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addtocart from '../helper/addtocart'
import context from '../context'

export default function Horizontalcardproduct({ category, heading }) {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const loadinglist = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollelement = useRef()

    const { fetchUserAddToCart } = useContext(context)

    const handleAddToCart = async(e,id) => {
        await addtocart(e,id)
        fetchUserAddToCart()
    }
    const fetchdata = async () => {
        setloading(true)
        const categoryProduct = await fetchcategorywiseproduct(category)
        setloading(false)
        setData(categoryProduct.data)
        console.log("categoryProduct", categoryProduct)
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const scrollRight = () => {
        scrollelement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollelement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md-gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollelement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
                {

                    loading ? (
                        loadinglist.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                        <p className='capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 font-medium bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
                                            <p className='text-slate-500 line-through bg-slate-200 w-full animate-pulse p-1 rounded-full'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-0.5 w-full bg-slate-200 animate-pulse p-1 rounded-full'></button>
                                    </div>
                                </div>
                            )
                        })
                    ):(
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product?.productImage[0]} className='w-full h-full object-scale-down hover:scale-110 transition-all' alt='product' />
                                    </div>
                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingprice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )

                    

                }
            </div>

        </div>
    )
}

import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchcategorywiseproduct from '../helper/fetchcategorywiseproduct'
import displayINRCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import addtocart from '../helper/addtocart'
import { Link } from 'react-router-dom'
import context from '../context'

export default function VerticalcardProduct({ category, heading }) {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const loadinglist = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
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
        // console.log("categoryProduct", categoryProduct)
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

            <div className='flex items-center gap-4 md-gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollelement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
                {

                    loading ? (
                        loadinglist.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                        <div className='flex gap-3 '>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        </div>
                                        <button className='text-sm text-white px-3 py-2 rounded-full p-1 animate-pulse bg-slate-200'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} key={index} className='w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product?.productImage[0]} className='w-full h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' alt='product' />
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingprice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
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

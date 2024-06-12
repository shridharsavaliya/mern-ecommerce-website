import React, { useContext, useEffect, useState } from 'react'
import summeryApi from '../common'
import context from '../context'
import displayINRCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";

export default function Cartproduct() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const Context = useContext(context)

    const loadingcart = new Array(Context.cartProductCount).fill(null)

    const fetchdata = async () => {

        const response = await fetch(summeryApi.addtocartviewproduct.url, {
            method: summeryApi.addtocartviewproduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        })
        
        const responsedata = await response.json()

        if (responsedata.success) {
            setData(responsedata.data)
        }
    }
    // console.log("data", data)

    const handleloading = async () => {
        await fetchdata()
    }
    useEffect(() => {
        setLoading(true)
        handleloading()
        setLoading(false)
    }, [])

    const updateQuantity = async (id, qty) => {
        const response = await fetch(summeryApi.updateAddToCartProduct.url, {
            method: summeryApi.updateAddToCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty
            })
        });

        const responsedata = await response.json();

        if (responsedata.success) {
            fetchdata();

        }
    };

    const increaseQty = (id, qty) => {
        updateQuantity(id, qty + 1);
    };

    const decreaseQty = (id, qty) => {
        if (qty > 1) {
            updateQuantity(id, qty - 1);
        }
    };

    const deletecartproduct = async (id) => {
        const response = await fetch(summeryApi.deletecartproduct.url, {
            method: summeryApi.deletecartproduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })
        const responsedata = await response.json()

        if (responsedata.success) {
            fetchdata()
            Context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((prev, current) => prev + current.quantity, 0)
    const totalPrice = data.reduce((prev, current) => prev + (current.productid.sellingprice * current.quantity), 0)

    return (
        <div className='container mx-auto px-4'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>Cart is empty</p>
                    )
                }

            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingcart.map((el) => {
                                return (
                                    <div key={el} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={index + "product"} className='h-32 bg-white border my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productid?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            {/* delete product */}
                                            <div className='absolute p-2 right-0 text-red-600 rounded-full hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deletecartproduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productid?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productid?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productid?.sellingprice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productid?.sellingprice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                {/* TOTAL PRODUCT */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded'>
                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <button className='bg-blue-600 p-2 mt-3 text-white w-full '>Payment</button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

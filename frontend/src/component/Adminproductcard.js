import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import Admineditproduct from './Admineditproduct';
import displayINRCurrency from '../helper/displayCurrency';
import { MdDelete } from "react-icons/md";
import summeryApi from '../common';
import { toast } from 'react-toastify';

export default function Adminproductcard({ data, fetchdata }) {
    const [editProduct, setEditproduct] = useState(false)
    const Deleteproduct = async (id) => {
        const response = await fetch(summeryApi.deleteProduct.url, {
            method: summeryApi.deleteProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: id
            })
            })
        const dataApi = await response.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            fetchdata()
        }
        if(!dataApi.success){
            toast.error(dataApi.message)
        }

    }
    return (
        <div>
            <div className='bg-white p-4 rounded'>
                <div className='w-40 '>
                    <div className='w-32 h-32 mx-auto'>
                        <img src={data?.productImage[0]} alt='product img' className='mx-auto object-fill h-full' />
                    </div>
                    <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
                    <div>

                        <p className='font-semibold'>
                            {
                                displayINRCurrency(data?.sellingprice)
                            }
                        </p>

                        <div className='w-full   flex justify-between items-center mt-2'>
                            <div className='w-fit  p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => Deleteproduct(data?._id)}>
                                <MdDelete />
                            </div>
                            <div className='w-fit  p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditproduct(true)}>
                                <MdModeEditOutline />
                            </div>
                        </div>
                    </div>
                    {
                        editProduct && (
                            <Admineditproduct productdata={data} onclose={() => setEditproduct(false)} fetchdata={fetchdata} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { SlClose } from "react-icons/sl";
import productcategory from '../helper/productcategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import UplodeImage from '../helper/UplodeImage';
import Displayimage from './Displayimage';
import { MdDelete } from "react-icons/md";
import summeryApi from '../common';
import { toast } from 'react-toastify';


export default function Admineditproduct({ onclose, productdata,fetchdata }) {
    const [data, setData] = useState({
        ...productdata, 
        productName: productdata?.productName,
        brandName: productdata?.brandName,
        category: productdata?.category,
        productImage: productdata?.productImage || [],
        description: productdata?.description,
        price: productdata?.price,
        sellingprice: productdata?.sellingprice
    })
    const [openfullscreenimg, setopenfullscreenimg] = useState(false)
    const [fullimage, setfullImage] = useState("")

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("data", data)
        const response = await fetch(summeryApi.updateproduct.url,{
            method:summeryApi.updateproduct.method,
            credentials:"include",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responsedata = await response.json()
        if (responsedata.success) {
            toast.success(responsedata.message)
            onclose()
            fetchdata()
        }
        if (!responsedata.success) {
            toast.error(responsedata.message)
        }
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadimagecloud = await UplodeImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadimagecloud.url]
            }

        })
    }
    const handleDeleteimg = async (index) => {
        console.log("image index", index)

        const newproductimg = [...data.productImage]
        newproductimg.splice(index, 1)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newproductimg]
            }

        })
    }
    return (
        <div className='fixed w-full bg-slate-200 h-full top-0 left-0 right-0 bottom-0 bg-opacity-35 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='text-xl'> Edit Product </h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onclose}>
                        <SlClose />
                    </div>
                </div>
                <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-20' onSubmit={handleSubmit}>
                    <label>Product Name : </label>
                    <input type="text" placeholder='enter product name' name='productName' id='productname' value={data.productName} onChange={handleOnchange} className='p-2 bg-slate-100 border rounded' required />
                    <label className='mt-3'>Brand Name : </label>
                    <input type="text" placeholder='enter brand name' name='brandName' id='brandname' value={data.brandName} onChange={handleOnchange} className='p-2 bg-slate-100 border rounded' required />
                    <label className='mt-3'>category : </label>
                    <select value={data.category} name='category' onChange={handleOnchange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productcategory.map((product, index) => {
                                return (
                                    <option value={product.value} key={product.value + index} required>{product.label}</option>
                                )
                            })
                        }
                    </select>
                    <label className='mt-3'>Product Image : </label>
                    <label htmlFor='editimageinput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Uplode Product Image</p>
                                <input type="file" id='editimageinput' className='hidden' name='productImage' onChange={handleUploadProduct} required={!data.productImage.length}/>
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data.productImage[0] ? (
                                <div className='flex items-center gap-2 overflow-x-auto'>
                                    {
                                        data.productImage.map((image, index) => {
                                            return (
                                                <div className='relative group' key={image + index}>
                                                    <img src={image} alt={image} className=' bg-slate-100 border cursor-pointer' width={80} height={80} onClick={() => {
                                                        setopenfullscreenimg(true)
                                                        setfullImage(image)
                                                    }}></img>

                                                    <div className='bg-red-600 absolute bottom-0 right-0 text-white cursor-pointer p-1 rounded-full hidden group-hover:block' onClick={() => handleDeleteimg(index)}>
                                                        <MdDelete></MdDelete>
                                                    </div>
                                                </div>


                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <p className='text-red-600 text-xs'>*Please uplode product image</p>
                            )
                        }
                    </div>

                    <label className='mt-3'>Price : </label>
                    <input type="number" placeholder='enter price' name='price' id='price' value={data.price} onChange={handleOnchange} className='p-2 bg-slate-100 border rounded' required />

                    <label className='mt-3'>Selling price : </label>
                    <input type="number" placeholder='enter selling price' name='sellingprice' id='sellingprice' value={data.sellingprice} onChange={handleOnchange} className='p-2 bg-slate-100 border rounded' required />

                    <label className='mt-3'>Description : </label>
                    <textarea className='h-28 bg-slate-100 border resize-none p-1' name='description' placeholder='enter product description' rows={3} onChange={handleOnchange} value={data.description} required></textarea>

                    <button className='px-2 py-2 mb-5 bg-red-600 hover:bg-red-700 text-white rounded' type='submit'>Update Product</button>
                </form>

            </div>
            {/* display img full screen */}
            {
                openfullscreenimg && (
                    <Displayimage onclose={() => (setopenfullscreenimg(false))} imgurl={fullimage}></Displayimage>
                )
            }
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"


import image1mobile from "../assest/banner/img1_mobile.jpg"
import image2mobile from "../assest/banner/img2_mobile.webp"
import image3mobile from "../assest/banner/img3_mobile.jpg"
import image4mobile from "../assest/banner/img4_mobile.jpg"
import image5mobile from "../assest/banner/img5_mobile.png"

export default function BannerProduct() {

    const [currentImage, setcurrentImage] = useState(0)
    const desktopimage = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileimage = [
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile
    ]

    const nextimage = () => {
        setcurrentImage(currentImage < 4 ? currentImage + 1 : 0)
    }
    const previmage = () => {
        setcurrentImage(currentImage > 0 ? currentImage - 1 : 4)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentImage(currentImage < 4 ? currentImage + 1 : 0)

        }, 5000);
        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='md:h-72 h-56 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full flex items-center '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={previmage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextimage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>
                <div className='md:flex h-full w-full overflow-hidden hidden'>


                    {/* desktop and tablet */}

                    {
                        desktopimage.map((imageurl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageurl} alt="" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>


                {/* mobile */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileimage.map((imageurl, index) => {
                            return (
                                <div className=' min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageurl} alt="" className='w-96 d-flex mx-auto h-full' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import summeryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helper/displayCurrency';
import CategorywiseProductDisplay from '../component/CategorywiseProductDisplay';
import context from '../context';
import addtocart from '../helper/addtocart';

export default function Productdetail() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingprice: ''
  })

  const [loading, setloading] = useState(false)
  const productimagelistloading = new Array(4).fill(null)
  const [activeImage, setactiveImage] = useState(0)

  const [zoomimagecoordinate, setzoomimagecoordinate] = useState({ x: 0, y: 0 })

  const [zoomimage, setzoomimage] = useState(false)

  const params = useParams()

  const navigate = useNavigate()

  const fetchproductdetail = async () => {
    setloading(true)
    const response = await fetch(summeryApi.getProductDetail.url, {
      method: summeryApi.getProductDetail.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productid: params?.id
      })
    })

    setloading(false)
    const responsedata = await response.json()
    setData(responsedata.data)

    setactiveImage(responsedata?.data?.productImage[0])
    // console.log("data",responsedata.data)
  }
  // console.log("params", params)
  useEffect(() => {
    fetchproductdetail()
  }, [params])

  const handleMouseEnterProduct = (imgurl) => {
    setactiveImage(imgurl)

  }

  const handleZoomImage = (e) => {
    setzoomimage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    // setzoomimage(false)
    setzoomimagecoordinate({ x, y })
  }

  const { fetchUserAddToCart } = useContext(context)

    const handleAddToCart = async(e,id) => {
        await addtocart(e,id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async(e,id) => {
      await addtocart(e,id)
      fetchUserAddToCart()
      navigate('/cart')
    }

  return (
    <div className='container mx-auto px-4 py-5'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product img */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 relative p-2'>
            <img src={activeImage} alt="" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={() => setzoomimage(false)}/>

            {/* product zoom */}
            {
              zoomimage && (
                <div className='hidden lg:block absolute min-w-[400px] min-h-[400px] p-1 -right-[410px] top-0 bg-slate-200'>
                  <div className='w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply' style={{ backgroundImage: `url(${activeImage})`, backgroundRepeat: "no-repeat", backgroundPosition: `${zoomimagecoordinate.x * 100}% ${zoomimagecoordinate.y * 100}%` }}>

                  </div>
                </div>
              )
            }

          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productimagelistloading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}></div>
                      )
                    })
                  }
                </div>
              ) : (

                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgurl, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                          <img src={imgurl} alt="" className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgurl)} onClick={() => handleMouseEnterProduct(imgurl)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/* product detail */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 h-6 w-full animate-pulse lg:h-8 rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>
              <div className='text-yellow-500 flex items-center gap-1 lg:h-8 bg-slate-200 h-6 animate-pulse w-full'>
              </div>
              <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse w-full lg:h-8'>
                <p className='text-red-600 bg-slate-200'></p>
                <p className='text-slate-400 line-through bg-slate-200'></p>
              </div>
              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 bg-slate-200 rounded animate-pulse lg:h-8'></button>
                <button className='h-6 bg-slate-200 rounded animate-pulse lg:h-8'></button>
              </div>
              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse lg:h-8'></p>
                <p className='bg-slate-200 rounded animate-pulse h-10 lg:h-8'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
              <div className='text-yellow-500 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                <p className='text-red-600'>{displayINRCurrency(data?.sellingprice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-meadium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data._id)}>Buy</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white bg-red-600 font-meadium hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data._id)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'>Description:</p>
                <p>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>

        {
          data.category && (

            <CategorywiseProductDisplay category={data?.category} heading={"Recommended Product"}></CategorywiseProductDisplay>
          )
        }


    </div>
  )
}

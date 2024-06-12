import React, { useContext, useState } from 'react'
import logo1 from "../assest/logo 1.jpg"
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summeryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetail } from '../store/userSlice';
import ROLE from '../common/role';
import context from '../context';


export default function Header() {

  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setmenuDisplay] = useState(false)
  const Context = useContext(context)
  const searchInput = useLocation()
  const urlsearch = new URLSearchParams(searchInput?.search)
  const searchquery = urlsearch.getAll("q")
  const [search, setsearch] = useState(searchquery)

  const navigate = useNavigate()
  // console.log(user)
  const handleLogout = async () => {
    const fetchuser = await fetch(summeryApi.logoutUser.url, {
      method: summeryApi.logoutUser.method,
      credentials: "include"
    })

    const data = await fetchuser.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetail(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
    
  }

  const handleSearch = (e) => {
    const {value} = e.target
    setsearch(value)
    if(value){
      navigate(`/searchpage?q=${value}`)
    }else{
      navigate("/searchpage")
    }
  }

  return (
    <div className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='container mx-auto h-full flex items-center px-4 justify-between'>
        <div className=''>
          <Link to="/"><img src={logo1} alt="" width={"60px"} height={"60px"} /></Link>
        </div>
        <div className='hidden lg:flex  items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type="text" placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg w-13 min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'><GrSearch /></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer' onClick={() => setmenuDisplay(!menuDisplay)}>{
                  user?.profilepicture ? (
                    <img src={user.profilepicture} className='w-10 h-10 rounded-full' alt={user.name} />
                  ) : (
                    <FaRegCircleUser />
                  )
                }
                </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit shadow-lg rounded z-10'>
                  <div>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to="/adminpanel/product" className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setmenuDisplay(!menuDisplay)}>Admin panel</Link>

                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>

                <div className='bg-red-600 text-white w-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-xs'>{Context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Logout</button>
              ) : (
                <Link to="/login"><button className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</button></Link>

              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

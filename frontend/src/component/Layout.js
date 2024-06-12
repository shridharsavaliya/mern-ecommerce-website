import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Forgotpassword from '../pages/Forgotpassword'
import Signup from '../pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summeryApi from '../common'
import Context from '../context'
import { useDispatch } from 'react-redux'
import { setUserDetail } from '../store/userSlice'
import Adminpanel from '../pages/Adminpanel'
import Allusers from '../pages/Allusers'
import Allproduct from '../pages/Allproduct'
import CategoryProduct from '../pages/CategoryProduct'
import Productdetail from '../pages/Productdetail'
import Cartproduct from '../pages/Cartproduct'
import Searchproduct from '../pages/Searchproduct'

export default function Layout() {

    const dispatch = useDispatch()
    const [cartProductCount, setCartProductCount] = useState(0)

    const fetchUserDetails  = async(req,res) => {
        try {
            const dataResponse = await fetch(summeryApi.userDetail.url,{
                method:summeryApi.userDetail.method,
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
            })
    
            const dataApi = await dataResponse.json()
    
            // console.log("data-user",dataResponse)
            if(dataApi.success){
                dispatch(setUserDetail(dataApi.data))
            }
        
        }catch (error) {
            res.status(400).json({
                success:false,
                message: error.message
            })
        }
    }

    const fetchUserAddToCart = async() => {
        const dataResponse = await fetch(summeryApi.countAddtoCart.url,{
            method:summeryApi.countAddtoCart.method,
            credentials:"include",
        })

        const dataapi = await dataResponse.json()
        
        setCartProductCount(dataapi?.data?.count)
        // console.log("dataapi",dataapi)
    }

    useEffect(()=>{
        fetchUserDetails()
        fetchUserAddToCart()
    },[])

    return (
        <div>
            <Context.Provider value={{
                fetchUserDetails, //user detail fetch
                cartProductCount, // current user add to cart count
                fetchUserAddToCart
            }}>
            <ToastContainer />
            <Header></Header>
            <div className='min-h-[calc(100vh-120px)] pt-16'>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/forgot-password" element={<Forgotpassword></Forgotpassword>}></Route>
                <Route path='/sign-up' element={<Signup></Signup>}></Route>
                <Route path='/categoryproduct' element={<CategoryProduct></CategoryProduct>}></Route>
                <Route path='/product/:id' element={<Productdetail></Productdetail>}></Route> 
                <Route path='/cart' element={<Cartproduct></Cartproduct>}></Route>   
                <Route path='/searchpage' element={<Searchproduct></Searchproduct>}></Route>
                <Route path='/adminpanel' element={<Adminpanel></Adminpanel>}>
                <Route path='all-users' element={<Allusers></Allusers>}></Route>
                <Route path='product' element={<Allproduct></Allproduct>}></Route>
                </Route>
                
            </Routes>
            </div>
            <Footer></Footer>
            </Context.Provider>
            
        </div>
    )
}

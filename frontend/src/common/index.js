const backendUrl = "https://mern-ecommerce-website-go3g.onrender.com"

const summeryApi = {
    signUp : {
        url:`${backendUrl}/user/signup`,
        method: "post"
    },
    signIn:{
        url:`${backendUrl}/user/signin`,
        method: "post"
    },
    userDetail:{
        url:`${backendUrl}/user/userdetail`,
        method: "get"
    },
    logoutUser:{
        url:`${backendUrl}/user/logout`,
        method: "get"
    },
    alluser:{
        url:`${backendUrl}/user/alluser`,
        method: "get"
    },
    updateuser:{
        url:`${backendUrl}/user/update-user`,
        method: "put"
    },
    uplodeproduct:{
        url:`${backendUrl}/product/uplodeproduct`,
        method: "post"
    },
    getproduct:{
        url:`${backendUrl}/product/getproduct`,
        method:"get"
    },
    updateproduct:{
        url:`${backendUrl}/product/updateproduct`,
        method:"post"
    },
    getCategoryProduct:{
        url:`${backendUrl}/product/getCategoryProduct`,
        method:"get"
    },
    getCategoryWiseProduct:{
        url:`${backendUrl}/product/getCategoryWiseProduct`,
        method:"post"
    },
    getProductDetail:{
        url:`${backendUrl}/product/getProductDetail`,
        method:"post"
    },
    addtocart:{
        url:`${backendUrl}/cart/addtocart`,
        method:"post"
    },
    countAddtoCart:{
        url:`${backendUrl}/cart/countAddtoCart`,
        method:"get"
    },
    addtocartviewproduct:{
        url:`${backendUrl}/cart/addtocartviewproduct`,
        method:"get"
    },
    updateAddToCartProduct:{
        url:`${backendUrl}/cart/updateAddToCartProduct`,
        method:"post"
    },
    deletecartproduct:{
        url:`${backendUrl}/cart/deletecartproduct`,
        method:"delete"
    },
    searchproduct:{
        url:`${backendUrl}/product/searchproduct`,
        method:"get"
    },
    filterproduct:{
        url:`${backendUrl}/product/filterproduct`,
        method:"post"
    },
    deleteProduct:{
        url:`${backendUrl}/product/deleteProduct`,
        method:"post"
    },
}

export default summeryApi

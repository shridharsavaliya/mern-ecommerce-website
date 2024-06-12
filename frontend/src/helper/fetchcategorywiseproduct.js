import summeryApi from "../common"

const fetchcategorywiseproduct = async(category) => {
    const response = await fetch(summeryApi.getCategoryWiseProduct.url,{
        method:summeryApi.getCategoryWiseProduct.method,
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            category : category
        })
    })
    const dataresponse = await response.json()
    // console.log("dataresponse",dataresponse)
    return dataresponse
}

export default fetchcategorywiseproduct
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
const UplodeImage = async(image) => {
    const formdata = new FormData()
    formdata.append("file",image)
    formdata.append("upload_preset","mern_product")
    const dataResponse = await fetch(url,{
        method : "post",
        body : formdata
    })

    return dataResponse.json() 
}

export default UplodeImage
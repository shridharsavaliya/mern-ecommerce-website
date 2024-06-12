const jwt = require('jsonwebtoken')

const authToken = async(req,res,next) => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(200).json({
                message:"Please Login...!",
                error:true
            })
        }
        const dcryptjwt = await jwt.verify(token,process.env.TOKEN_SECRET_KEY,(err,decoded)=>{
            console.log(err)
            // console.log("decoded",decoded)

            if(err) {
                console.log("err auth",err)
            }
            req.userId = decoded.id
            next()
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            data:[],
            message: error.message
        })
    }
}

module.exports = authToken
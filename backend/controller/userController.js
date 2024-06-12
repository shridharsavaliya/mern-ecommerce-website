const bcrypt = require('bcrypt');
const { user_service } = require('../service');
const jwt = require('jsonwebtoken');

const create_user = async(req,res) => {
    try {   
        const {name,email,password} = req.body

        const validate_user = await user_service.valiate_user(email)

        if (validate_user) {
            throw new Error('User already exists')
        }

        if (!name) {
            throw new Error('Please provide name')
        }
        if (!email) {
            throw new Error('Please provide email')
        }
        if (!password) {
            throw new Error('Please provide password')
        }

        const bcryptpassword = await bcrypt.hash(password, 10)

        if (!bcryptpassword) {
            throw new Error("Something went wrong")
        }

        req.body.password = bcryptpassword,
        req.body.role = "GENERAL"

        const user = await user_service.create_user(req.body)
        if (!user) {
            throw new Error("user not created")
        }
        res.status(201).json({
            success:true,
            message:"user created Successfully!",
            data:user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const usersignin = async(req,res) => {
    try {
        const {email,password} = req.body

        if (!email) {
            throw new Error('Please provide email')
        }
        if (!password) {
            throw new Error('Please provide password')
        }

        const validate_user = await user_service.valiate_user(email)

        if (!validate_user) {
            throw new Error('User does not exist')
        }
        const checkPassword = await bcrypt.compare(password,validate_user.password)

        // console.log("checkPassword",checkPassword)

        if (checkPassword) {
            const tokendata = {
                id:validate_user._id,
                email:validate_user.email
            }
            const token = await jwt.sign(tokendata,process.env.TOKEN_SECRET_KEY,{expiresIn:"8h"})

            const tokenOption = {
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOption).json({
                success:true,
                message:"user logged in successfully",
                data:token
            })
        }
        else{
            throw new Error('Password is incorrect')
        }

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const userDetailController = async(req,res) => {
    try {
        // console.log("user id",req.userId)
        const finduser = await user_service.finduser(req.userId)
        // console.log("finduser",finduser)

        res.status(200).json({
            success:true,
            data:finduser,
            message:"user detail"
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const userLogout = async(req,res) => {
    try {
        res.clearCookie("token")

        res.status(200).json({
            success:true,
            message:"user logged out successfully",
            data:[]
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const alluser = async(req,res) => {
    try {
        // console.log("userid",req.userId)
        const alluserdata =  await user_service.alluserfind()
        res.status(200).json({
            success:true,
            message:alluserdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

const updateUser = async(req,res) => {
    try {
        const {userid,email,name,role} = req.body

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }
        const updateUser = await user_service.updateUser(userid,payload)

        res.status(200).json({
            success:true,
            message:"user updated successfully",
            data:updateUser
        })

        // console.log("payload",payload)
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

module.exports = {
    create_user,
    usersignin,
    userDetailController,
    userLogout,
    alluser,
    updateUser
}
const { User } = require("../model")

const create_user = (data) => {
    return User.create(data)
}

const valiate_user = (email) => {
    return User.findOne({email})
}

const finduser = (id) => {
    return User.findById(id)
}

const alluserfind = () =>{
    return User.find()
}

const updateUser = (id,data) => {
    return User.findByIdAndUpdate(id,{$set:data})
}

module.exports = {
    create_user,
    valiate_user,
    finduser,
    alluserfind,
    updateUser
}
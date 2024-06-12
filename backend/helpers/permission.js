const { User } = require("../model")

const uplodeproductpermission = async(userid) => {
    const user = await User.findById(userid)

    if(user.role !== "ADMIN"){
        return false
    }
    return true
}

module.exports = uplodeproductpermission
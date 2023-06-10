const userModel = require('../Models/userModel')


module.exports.getUser = async function getUser(req, res) {
    // console.log(req.query);
    let id = req.params.id;
    let User = await userModel.findById(id);
    if (User) {
        return res.json(User);
    }
    else {
        res.json({
            msg: "User Not Found",
        })
    }
}

// module.exports.postUser = function postUser(req,res){
//     console.log(req.body);
//     users = req.body.Name;
//     res.json({
//         message:"Message recieved succesfully",
//         user:req.body
//     })
// }

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "Data updated",
                data: user

            })
        }
        else {
            res.json({
                message: "User is not found in the data",
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "Data deleted successfully"
            })
        }
        else {
            res.json({
                message: "User not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try{
      let users = await userModel.find();
      if(users)
      {
        res.json({
            message:"Users Found",
            data:users
        })
      }
      else{
        res.json({
            message:"Users Not found"
        })
      }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}


module.exports.updateProfileImage = function imageUpdate(req,res){
    res.json({
        message:"File uplaoded successfully"
    })
}


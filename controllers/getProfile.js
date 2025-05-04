const User = require("../model/User")

const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id) // ID from token middleware

        if(!user){
            return res.status(404).json({message: "user not found "});

        }

        res.json({  
            username: user.username,
            status: 'Active', // You can replace this with user.status if stored in Db

        });

    }catch(err){
        console.error('Get profile error',err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {getProfile}
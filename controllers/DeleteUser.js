const User = require("../model/User");

const DeleteUser = async (req,res) => {
    try{

        const userId = req.params.id;
        
        const deleteUser = await User.findByIdAndDelete(userId)
        
        if(!deleteUser){
            return res.status(404).json({message: "User not Found "})
        }
        
        res.json({message: "User delete Successfully"})
    }catch(err){
       console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = DeleteUser;
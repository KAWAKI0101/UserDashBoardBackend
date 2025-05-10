const User = require("../model/User")

// Get all user (name only)


const getAllUsers = async (req, res) => {
    
    try {
        const user = await User.find({}, 'userName'); // only return the name field 
         console.log('Users fetched:', user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "failed to fetch user" });
    }
};


module.exports = {getAllUsers} 
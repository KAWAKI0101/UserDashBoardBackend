const User = require("../model/User")

// Get all user (name only)


const getAllUsers = async (req, res) => {
    
    try {
        const user = await User.find({}, 'username'); // only return the name field 
        const result = user.map( u => ({
            id: u._id,  
            name: u.username
        }))
         console.log('Users fetched:', user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "failed to fetch user" });
    }
};


module.exports = {getAllUsers} 
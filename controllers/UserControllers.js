const User = require('../model/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const loginOrRegister = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    let user = await User.findOne({ username });

    // if(user){
    //   if(user.password === password){
    //     return res.json({message: "User already Created "});
    //   }else{
    //     return res.status(401).json({error: "Invalid Password"});
    //     }
    // }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invaild Password' });
      }

      // Create token 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.json({ message: 'Login succes', token });
    }

    //create a new user

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)



    const newUser = new User
      ({
        username,
        password: hashedPassword,
      });
    await newUser.save();


    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });


    return res.json({ message: "User created successfully", token });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error' });
  }

};




module.exports = { loginOrRegister };

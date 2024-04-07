const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.post('/signup', async (req, res) => {
    console.log('sent by client - ',req.body);
  const { name, email, password, dob, address, phone } = req.body;

  try {
    if (!email || !password || !name || !dob || !address || !phone) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({ error: "Email Already Exists" });
    }

    const user = new User({
      name,
      email,
      password,
      dob,
      phone,
      address,
    });

    await user.save();
    // res.json({ message: "User saved successfully" });
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res.send({token});
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/signin', async (req, res)=>{
    // console.log('sent by client - ',req.body);
    const {email, password} = req.body;
  if(!email || !password){
    return res.status(422).json({error: "Please Add Email or Password"});
  }
  const savedUser = await User.findOne({email:email})

  if(!savedUser){
    return res.status(422).json({error: "Invalid Credentials"});
  }
  try{
    bcrypt.compare(password, savedUser.password, (err, result)=>{
      if(result){
        console.log("Password Matched");
        const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET);
        console.log(token)
        res.send({token});
      }
      else{
        console.log("Password Does Not Match");
        return res.status(422).json({error: "Invalid Credentials"});
      }
    })
  }
  catch(err){
    console.log(err);
  }
})

module.exports = router;

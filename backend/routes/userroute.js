const express = require("express");
const User = require("../modles/User")
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSERCET

router.post("/createuser",[
    body('email',"Incorrect Email.Please enter a valid email").isEmail(),
    body('password',"Password should be greater than 5 digits").isLength({ min: 5 }),
    body('name',"name should be greater than 5 digits").isLength({ min: 5 }),
],
async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const setpassword = await bcrypt.hash(req.body.password,salt);
    try {
        const user = await User.create({
            name:req.body.name,
            password:setpassword,
            email:req.body.email,
            location:req.body.location
        });
        res.json({ success: true, message: "created" })
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
});


router.post("/login",[
    body('email',"Incorrect Email.Please enter a valid email").isEmail(),
    body('password',"Password should be greater than 5 digits").isLength({ min: 5 }),
],
async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ errors: "Please enter a valid email or password" });
        }
        const passcompare = await bcrypt.compare(req.body.password,user.password);
        if(!passcompare){
            return res.status(400).json({ errors: "Please enter a valid email or password" });
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,jwtsecret)
        return res.json({success:true,authToken:authToken})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
});


module.exports=router;
const express = require("express");
const router = express.Router();

router.post("/fooddata",async(req,res)=>{
    try {
        res.send([global.sampledata,global.foodData])
    } catch (error) {
        console.log(error.message)
        console.log("server error")
    }
})

module.exports=router;
const mongoose = require("mongoose")
const mongourl = process.env.MONGOULR
const database = async()=>{
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongourl,{useNewUrlParser:true},async(err,result)=>{
        if(err){
            console.log("---",err)
        }
        else{
            console.log("connected")
            const fetchdata = await mongoose.connection.db.collection("sampledata");
            fetchdata.find({}).toArray(async function(err,data){
                const fooditem = await mongoose.connection.db.collection("foodData");
                fooditem.find({}).toArray(function(err,catdata){
                    if(err){
                        console.log(err)
                    }
                    else{
                        global.sampledata = data
                        global.foodData = catdata
                    }
                })
                
            })
        }
    } )

    
}

module.exports=database;

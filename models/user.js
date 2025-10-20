const mongo=require("mongoose")
const UserSchema=new mongo.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})
const JobSchema=new mongo.Schema({
    title:{type:String,required:true},
    company:{type:String,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    creatorId:{type:String,required:true},
    createdAt:{type: Date, default: Date.now },
    updatedAt:{type: Date, default: Date.now }

})
const User =mongo.model("User",UserSchema)
const Job=mongo.model("Job",JobSchema)
module.exports={User,Job}

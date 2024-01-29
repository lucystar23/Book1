const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const passwordComplexity=require("joi-password-complexity");
const Joi = require('joi');
mongoose.connect("mongodb+srv://yeonak6:Alma123@cluster0.lfv1yya.mongodb.net/BookDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the db")
})
.catch((err)=>console.log(err))


var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
       
    },
    email: {
        type: String,
        
        unique: true,
    },
    password: {
        type: String,
        
    },
    
});

userSchema.methods.generateAuthToken=function () {
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{
        expiresIn:"7d",
    });
    return token;
    
};

const userModel=mongoose.model('userDetails',userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    

    return schema.validate(data);
};

module.exports = { userModel, validate };


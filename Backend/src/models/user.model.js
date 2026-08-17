const mongoose = require("mongoose") ;
const bcrypt = require("bcryptjs") ;

const userSchema = new mongoose.Schema( {
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowerCase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Address"] ,
        unique:[true,"Email already exists"],
    },
    name:{
        type:String,
        required:[true,"Name is required for creating a user"],
    },
    password:{
        type:String,
        required:[true,"Password is required for creating a account"],
        minLength:[6,"Password should be having more than 6 characters"],
        select:false,

    }
} ,{
    timestamps : true ,
} )

userSchema.pre("save" , async function() {
    if ( !this.isModified("password") ) return ;
     
    const hash = await bcrypt.hash(this.password , 10) ;
    this.password = hash ;

    return  ;
}  )

userSchema.methods.comparePassword = async function(password) {
    // console.log(password,this.password);
    return await bcrypt.compare(password , this.password) ;
}

const userModel = new mongoose.model("user",userSchema) ;

module.exports = userModel ;
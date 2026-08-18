const mongoose = require("mongoose") ;

const accountSchema = mongoose.Schema( {

    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"user",
        required:[true,"Account must be associated with a user "]
    } ,
    status:{
        enum : {
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status can be either ACTIVE , FROZEN or CLOSED"
        }
    },
} )

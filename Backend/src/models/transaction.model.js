const mongoose = require("mongoose") ;

const transactionSchema = new mongoose.Schema( {
    
    fromAccount : {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"account" ,
        required:[true,"Transaction must be associated with a from Account"] ,
        index:true ,
    } ,
    toAccount : {
        type:mongoose.Schema.Types.ObjectId ,
        ref:"account" ,
        required:[true,"Transaction must be associated with a to Account"] ,
        index:true ,
    } ,
    status : {
        type : string ,
        enum :{
            values :["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"Status can be either Pending , Completed , Failed or Reversed",
        },
    } ,
    amount : {
        type : number ,
        required : [true , "Amount is required for creating a transaction"],
        min : [0,"Transaction amount cannot be negative"] ,
    },
    idempotencyKey : {
        type 
    }


} )

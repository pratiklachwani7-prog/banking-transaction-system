const mongoose = require("mongoose") ;

const ledgerSchema = new mongoose.Schema( {
    
    account : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "account",
        required:[true,"Ledger must be associated with an account"] ,
        index:true ,
        immutable:true ,
    } ,
    amount : {
        type : number ,
        ref:"transaction",
        required:[true,"Amount is required for creating a ledge entry"] ,
        index:true ,
        immutable : true ,
    } ,
    type:{
        type:String ,
        enum : {
            values : ["CREDIT","DEBIT"],
            message:"Type can be either CREDIT or DEBIT",
        },
        required : [true,"Ledger type is required"] ,
        immutable : true ,
    }



} )

function preventLedgerModification()
{
    throw new Error("Ledger entries are immutable and cannot be modified or deleted") ;
}
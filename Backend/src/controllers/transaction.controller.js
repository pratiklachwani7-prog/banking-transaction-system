const transactionModel = require("../models/transaction.model") ;
const ledgerModel = require("../models/ledger.model") ;
const emailService = require("../services/email.service") ;
const accountModel = require("../models/account.model") ;

/**
 * - Create a new transaction 
 * The 10 Step Transfer flow :
    * 1. Validate Request
    * 2. Validate idempotency Key
    * 3. Check Account Status
    * 4. Derive Sender balance from ledger 
    * 5. Create transaction (PENDING)
    * 6. Create DEBIT Ledger entry
    * 7. Create CREDIT ledger entry
    * 8. Mark transaction COMPLETED
    * 9. Commit MongoDB Session
    * 10. Send Email Notification
 */

async function createTransaction(req , res)
{

    /**
     * 1. Validate Request
     */
    const { fromAccount , toAccount , amount , idempotencyKey } = req.body ;

    if ( !fromAccount || !toAccount || !amount || !idempotencyKey )
    {
        return res.status(400).json({
            message:"fromAccount ,  toAccount , amount and idempotencyKey should Exist" 
        })
    }

    const fromUserAccount = await accountModel.findOne({ _id : fromAccount}) 
    const toUserAccount = await accountModel.findOne({ _id : toAccount }) 
    if ( !fromUserAccount || !toUserAccount )
    {
        return res.status(400).json({
            message:"Invalid fromAccount or toAccount" 
        })
    }

    /**
     * 2. Validate Idempotency Key
     */

    const isTransactionAlreadyExist = await transactionModel.findOne({idempotencyKey:idempotencyKey}) ;

    if (isTransactionAlreadyExist) 
    {
        if ( isTransactionAlreadyExist.status === "COMPLETED" )
        {
            return res.status(200).json({
                message:"Transaction Already Processed" 
            }) ;
        }
        else if ( isTransactionAlreadyExist.status == "PENDING" )
        {
            return res.status(200).json({
                message:"Transaction is already in PENDING State",
            }) ;
        }
        else if ( isTransactionAlreadyExist.status == "FAILED" )
        {
            return res.status(500).json({
                message:"Transaction Processing Failed , Please Retry" 
            }) ;
        }
        else if ( isTransactionAlreadyExist.status === "REVERSED" )
        {
            return res.statu(500).json({
                message:"Transaction was Revesed , Please Retry Again"
            }) ;
        }
    }

    /**
     * 3. Check Account Status
     */

    if ( fromUserAccount.status != "ACTIVE"  || toUserAccount.status != "ACTIVE")
    {
        return res.status(400).json({
            message:"Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    /**
     * 4. Derive sender balance from ledge
     */

    const balance = await fromUserAccount.getBalance() ;
    if ( balance < amount )
    {
        res.status(400).json({
            message:`Insufficient Balance . Current Balance is ${balance} and requested is ${amount} ` ,
        }) ;
    }



}
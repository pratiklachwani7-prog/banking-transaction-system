const express = require("express") ;
const accountController = require("../controllers/account.controller") ;
const authMiddleware = require("../middleware/auth.middleware") ;

const router = express.Router() ;

/**
 * - POST /api/accounts/
 * - Create a new Account
 */

router.post("/",authMiddleware.authMiddleware , accountController.createAccountController) ; 
module.exports = router 

/**
 * GET /api/accounts/
 * Get all accounts of the logged in user
 * protected route
 */

router.get("/" , authMiddleware.authMiddleware , accountController.getUserAccountsController) ;

/**
 * - GET /api/accounts/balance/:accountId
 */

router.get("/balance/:accountId",authMiddleware.authMiddleware , accountController.getAccountBalanceController) ;
//two work 1) To create instance of Service 2) To config the server ,,, in short creating a server

const express = require("express") ;
const cookieParser = require("cookie-parser") ;
const app = express() ;

app.use(express.json()) ;
app.use(cookieParser()) ;
 
/**
 * - Routes required 
 */
const authRouter = require("./routes/auth.route") ;
const accountRouter = require("./routes/account.routes");

/**
 * - useRoutes 
 */

app.use("/api/auth",authRouter)  ;
app.use("/api/accounts",accountRouter) ;


module.exports = app
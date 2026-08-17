//two work 1) To create instance of Service 2) To config the server ,,, in short creating a server

const express = require("express") ;
const cookieParser = require("cookie-parser") ;
const app = express() ;

const authrouter = require("./routes/auth.route") ;

app.use(express.json()) ;
app.use(cookieParser()) ;

app.use("/api/auth",authrouter)  ;
module.exports = app
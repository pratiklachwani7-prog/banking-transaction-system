//To start the server
require("dotenv").config() ;
const app = require("./src/app") ;
const connectDB = require("./src/config/db") ;


connectDB() ;
app.listen(3000 , () => 
    {
        console.log("Server is Running on Port 3000 ") ;
    } ) ;


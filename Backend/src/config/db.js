const mongoose = require("mongoose") ;


const connectDB = () =>
{
    mongoose.connect(process.env.MONGODB_URI)
    .then( () => {
        console.log("Server is Connected to the DB") ;
    } )
    .catch(err => {
        console.log("Error Connecting to DB") ;
        process.exit(1);
    } ) 
}
module.exports = connectDB ;



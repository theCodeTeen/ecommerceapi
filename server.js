//3rd party modules
require("dotenv").config();

//Custom modules
const app = require("./app.js");
const mongoose = require("./config/mongoose.js");

app.listen(process.env.PORT,()=>{
    console.log(`App running succesfully on port ${process.env.PORT}`);
})


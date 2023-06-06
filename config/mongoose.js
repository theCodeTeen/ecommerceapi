const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI.replace("<password>",process.env.MONGODB_PASS);
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res=>console.log("Connected to DB succesfully!"))
.catch(err=>console.log("Unable to contact DB",err));

module.exports = mongoose;
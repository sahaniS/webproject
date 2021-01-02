const path = require("path");
const express = require("express");
// const { fstat } = require("fs");
const app = express();
const fs = require("fs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

// connecting to database
mongoose.connect("mongodb://localhost:27017/contact", { useNewUrlParser:true,useUnifiedTopology:true })
.then ( () => console.log("connected"))
.catch( (err) => console.log(err));

const contactSchema= new mongoose.Schema({
    name: String,
    age :Number,
    gender:String,
    address:String,
    desc: String    
});
const contact = new mongoose.model("contact", contactSchema);






// EXPRESS  SPECIFIC    STUFF
// const staticpath = path.join(__dirname, "../project/public");
// app.use(express.static(staticpath));
app.use(express.urlencoded()) //middleware to arrive data to express

// PUG   SPECIFIC    STUFF
app.set('view engine','pug')
app.set('views',path.join(__dirname, 'views'))  // set the views DIRECTORY.

// our pug demo endpoint

app.get("/", (req, res) => {
    res.status(200).render("demo.pug");
})
app.post("/", (req,res) =>{
    const mydata = new contact(req.body);
    mydata.save().then( () => {
        res.send("this item has been saved to database")
    }).catch(() => {
        res.status(400).send("item was not saved ")
    });
    // console.log(req.body)
    // age = req.body.age
    // console.log("the client info is" + data);
    // age = req.body.age
    // gender = req.body.gender
    // address = req.body.address
    // more = req.body.more
    // let outputtowrite = 
    // fs.writeFileSync('output.txt', "age is ${age}")
    const params= {'message': 'your form has been submitted successfully'}
    res.status(200).render("demo.pug");
    
})

// app.get("/form", (req, res) => {
//     res.status(200).render("../project/public");
// })
// app.get("/contact", (req, res) => {
//     res.send("hi from contact");
// })



app.listen(8000, () => {
    console.log("listening on port");
})
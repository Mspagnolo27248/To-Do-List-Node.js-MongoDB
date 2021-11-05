//Requirements
const express = require("express")
const bodyParser = require('body-parser');
const { render } = require("ejs");

//app settings
const app = express()
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

//Serve Additonal Folders to App
app.use(express.static("public"));


//Data Struct Consts
const topics = ["Go to Sleep","Pick Nose"]
let today = new Date()

//Routes
app.get("/",(req,res)=>{
    res.render("index",{topics:topics,currentDay:today})
})


app.post("/",function(req,res){
 var item = req.body.newItem
 topics.push(item)
res.render("index.ejs",{topics:topics,currentDay:today})
});



//Run App
app.listen(3000,function(){
    console.log("Server Started on Port 3000")
})
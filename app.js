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
//#Get Home
app.get("/",(req,res)=>{
    res.render("index",{topics:topics,currentDay:today})
})

//#POST Home
app.post("/",function(req,res){
 var item = req.body.newItem
 
 topics.push(item)
res.render("index.ejs",{topics:topics,currentDay:today})
});

//#Post Home/Delete
app.post("/delete",function(req,res){
    var selectedItem = req.body.itemBox;
    var itemIndex = topics.indexOf(selectedItem);
    console.log(selectedItem);
    console.log(itemIndex);
    if  (itemIndex>-1){
        topics.splice(itemIndex,1);
    }
    res.redirect("/")
});

//Run App
app.listen(3000,function(){
    console.log("Server Started on Port 3000")
})
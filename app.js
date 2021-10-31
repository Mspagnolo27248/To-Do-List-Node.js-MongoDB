const express = require("express")
const bodyParser = require('body-parser')

const app = express()
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index",{var1:1})
})






app.listen(3000,function(){
    console.log("Server Started on Port 3000")
})
const express = require("express")
const bodyParser = require('body-parser');
const { render } = require("ejs");

const app = express()
app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index",{var1:1})
})


app.post("/",function(req,res){
 var inputEmail = req.body.inputEmail
 var inputPassword  = req.body.inputPassword
res.render("post.ejs",{inputEmail:inputEmail,inputPassword:inputPassword})
});



app.listen(3000,function(){
    console.log("Server Started on Port 3000")
})
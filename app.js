//Requirements
const express = require("express")
const bodyParser = require('body-parser');
const { render } = require("ejs");
const mongoose = require("mongoose");


//app settings
const app = express()
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// DB Connection
const dbUrl = "mongodb+srv://mspagnolo-admin:password@cluster0.lxizv.mongodb.net/ToDoList?retryWrites=true&w=majority"
mongoose.connect(dbUrl);


//Data Struct Consts
const itemSchema = {
    name: String
};

const listSchema = {
    name: String,
    items: [itemSchema]
};


// models
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);


//Const's 
let today = new Date()
const item1 = { name: "Welcome to the To Do List" }
const item2 = { name: "Hit the + buttobn to add a new item." }
const item3 = { name: "<-- Hit this to delete an item." }
const defaultItems = [item1, item2, item3]



//-----Routes

app.get("/", (req, res) => {

    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Successfully saved default items")
                }
            });
            res.redirect("/")
        }
        else {
            res.render("index", { listTitle: "Today", newListItems: foundItems })
        }
    })
});

app.get("/:listName",function(req,res){
    const listName = req.params.listName

    List.findOne({name:listName},function(err,foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name:listName,
                    items:defaultItems
                });
                list.save();
                res.redirect("/"+listName);
            } else{
                res.render("index",{
                    listTitle:foundList.name
                    ,newListItems:foundList.items});
            }
        }
    })
});

app.post("/", function (req, res) {
    var itemName = req.body.newItem;
    var listName = req.body.listName;
    const item = new Item({
        name:itemName
    });
    if(listName==="Today"){
        item.save();
        res.redirect("/");
    } else{
        List.findOne({name:listName},function(err,foundList){
         foundList.items.push(item);
         foundList.save();
         res.redirect("/"+listName);   
        });
    }
});


app.post("/delete", function (req, res) {
    var selectedItem = req.body.itemBox;
    var selectedList = req.body.listName
    console.log(selectedItem);
    console.log(selectedList);

    if (selectedList==="Today"){
        Item.findByIdAndRemove(selectedItem,function(err){
            if(!err){
                res.redirect("/")
            }
        });
    
    }
    else{
        //TODO
        List.findOneAndUpdate({name:selectedList},{$pull:{items:{_id:selectedItem}}},function(err,foundList){
       // List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if(!err){
                res.redirect("/"+selectedList);
            }
           
        });
       
    }
  
});


app.listen(3000, function () {
    console.log("Server Started on Port 3000")
});
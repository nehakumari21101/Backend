const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "Peter",
        content: "Love hugging",
    },
    {
        id: uuidv4(),
        username: "Sam",
        content: "Hello World!",
    },
    {
        id: uuidv4(),
        username: "Peter",
        content: "Huha hehehehe",
    }
]


//add route
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {id} = req.params;
    let {username, content} = req.body;
    posts.push({id, username, content})
   res.redirect("/posts");
})


//home route
app.get("/", (req,res)=>{
    res.send("This is Home path.")
})

// View all comments route
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts})
})

// show route
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    res.render("show.ejs", {post});
    console.log(id);
})



app.listen(port, () =>{
    console.log("app is listening...");
})
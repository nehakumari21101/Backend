const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "Peter",
        content: "Love hugging.",
    },
    {
        id: uuidv4(),
        username: "Sam",
        content: "Hello World!",
    },
    {
        id: uuidv4(),
        username: "Peter",
        content: "Huha hehehehe!",
    }
]


//home route
app.get("/", (req,res)=>{
    res.send("This is Home path.")
})

// View all comments route
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts})
})

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

// show route
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    res.render("show.ejs", {post});
    console.log(id);
})

//update route
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let content = req.body.content;
    let post = posts.find( p => id === p.id);
    post.content = content; 
    console.log(post);
    res.redirect("/posts");
})

// edit route
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    res.render("edit.ejs", {post});
})

//delete route
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter( p => id !== p.id);
    res.redirect("/posts");
})


app.listen(port, () =>{
    console.log(`app is listening on port ${port}...`);
})
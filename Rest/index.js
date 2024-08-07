const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


//client site er form vasa bojar jnno
app.use(express.urlencoded({extended:true}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//add view folder for ejs files
app.set("view engine","views");
app.set("views",path.join(__dirname,"views"));

//add public folder to access all css or js files inside public folder
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Suman",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"dhoni",
        content:"I love cricket",
    },
    {
        id:uuidv4(),
        username:"Rohit",
        content:"I love football",
    },
    {
        id:uuidv4(),
        username:"Virat",
        content:"I love my wife",
    },
]


//root route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});
})

app.get("/posts/edit/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.put("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    console.log(newContent);
    // console.log(post);
    post.content=newContent;
    // res.send("patch working");
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    // res.send("delete ho geye")
    res.redirect("/posts");
})

const port=8080;
app.listen(port,()=>{
    console.log("port is listening 8080");
})
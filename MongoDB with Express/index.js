const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat");
const methodOverride = require('method-override')

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

main()
.then(()=>{
    console.log("DB connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chating');
}

// const chat1=new Chat({
//     from:"suman",
//     to:"virat",
//     msg:"nice cricket",
//     created_at:new Date(),
// })

// chat1.save().then((res)=>{
//     console.log(res);
// })

app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/chats",async(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    newChat.save().then(()=>{
        console.log("new chat added");
    }).catch((error)=>{
        console.log(error);
    })
    res.redirect("/chats");

});
app.get("/chats/edit/:id",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});

});

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let new_msg=req.body.msg;

    let chat=await Chat.findByIdAndUpdate(id,{msg:new_msg});
    res.redirect("/chats");

});

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})
app.get("/",(req,res)=>{
    res.send("kam kr raha hai vi");
})
app.listen(8080,()=>{
    console.log("app is listening on 8080");
})
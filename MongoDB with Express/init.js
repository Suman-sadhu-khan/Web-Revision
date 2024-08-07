const mongoose=require("mongoose");
const Chat=require("./models/chat.js")

main().then(()=>{
    console.log("connection succeful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chating');

}

 let allChats=[
    {
        from:"kobita",
        to:"priya",
        msg:"send me your pic",
        created_at:new Date(),
    },
    {
        from:"suman",
        to:"riya",
        msg:"send me your post",
        created_at:new Date(),
    },
    {
        from:"ram",
        to:"shyam",
        msg:"Let's play football",
        created_at:new Date(),
    },
    {
        from:"bob",
        to:"adam",
        msg:"reading book",
        created_at:new Date(),
    }
];

Chat.insertMany(allChats);
//ata just database a data fill krar jnno
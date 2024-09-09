const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');

const mongoose = require('mongoose');
const { type } = require("os");
const { timeStamp } = require("console");

mongoose.connect('mongodb://localhost:27017/node-js-series').then(console.log("mongo Db connected")).catch((err) =>console.log("Mongo error",err) );

// Schema
const userSchema = new mongoose.Schema({
  firstName :{
    type:String,
    required:true,
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobTitle:{
    type:String,
  },
  gender:{
    type:String,
  }
},{timestamps:true})

const User = mongoose.model('user',userSchema);



const app = express();
const PORT = 8000;
const api = "/api";

app.use(express.json());


app.get(`${api}/users`, async(req, res) => {
  const Users = await User.find({})
  return res.json(Users);
});


/*
app.get(`/users`, (req, res) => {
  let html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  return res.send(html);
});
*/

app.get(`/users`, async (req, res) => {
  const Users = await User.find({}); 
  let html = `
    <ul>
    ${Users.map((user) => `<li>${user.firstName} having email ${user.email}</li>`).join("")}
    </ul>`;
  return res.send(html);
});

/*
app.get(`${api}/users/:id`, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});
*/
app.get(`${api}/users/:id`, async(req, res) => {
  const user = await User.findById(req.params.id);


  return res.json({user});
});




// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE 
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE 
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE 
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE 
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE 
app.route("/api/users/:id")
.patch(async (req,res)=>{
  const newName = req.body
  await User.findByIdAndUpdate(req.params.id,{firstName:newName.firstName,lastName:newName.lastName});
  return res.json({status:"Success"})
})
.delete(async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  return res.json({status:"User Deleted Successfully"})
})

app.post('/api/users',async (req,res)=>{
    const body = req.body;
    if(!body|| !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle){
      return res.status(400).json({msg:"ALL Fields are req"});
    }
    const result = await User.create({
      firstName : body.firstName,
      lastName:body.lastName,
      email:body.email,
      gender:body.gender,
      jobTitle:body.jobTitle
    })
    
    return res.status(201).json({msg : "Success" , result});

})


app.listen(PORT, () => {
  console.log("server started at port 8000");
});
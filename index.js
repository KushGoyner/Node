const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');

const app = express();
const PORT = 8000;
const api = "/api";

app.use(express.json());


app.get(`${api}/users`, (req, res) => {
  return res.json(users);
});

app.get(`/users`, (req, res) => {
  let html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  return res.send(html);
});

app.get(`${api}/users/:id`, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});


app.route("/api/users/:id")
.get((res,req)=>{

})
.patch((res,req)=>{

})
.delete((res,req)=>{

})

app.post('/api/users',(req,res)=>{
    const newUser = req.body;
    users.push({id:users.length +1 , ...newUser});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json("Suceess fully added");
    })
})


app.listen(PORT, () => {
  console.log("server started at port 8000");
});

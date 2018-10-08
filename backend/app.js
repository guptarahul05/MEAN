const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb+srv://rahul:rahul0501@cluster0-fsgbw.mongodb.net/MEAN?retryWrites=true")
.then(()=>{console.log("Connected to db");})
.catch(e=>{console.log(e);});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type,Accept");
   res.setHeader("Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS");
   next();
});

app.post("/api/posts", (req, res, next) => {
   const post = new Post({
      title: req.body.title,
      content: req.body.content,
   });
  post.save();

   res.status(201).json({
      message: 'Post added successfully',
   })

})
app.use('/api/posts', (req, res, next) => {
   // const posts = [
   //    { id: 'hi123', title: 'First server-side post', content: 'This is comming from server' },
   //    { id: 'hi122', title: 'Second server-side post', content: 'This is comming from server!' },
   // ];
   Post.find()
   .then(documents=>{
      console.log(documents);
      res.status(200).json({
         message: 'Posts fetched successfully',
         posts: documents
      });
   });
});

module.exports = app;































/*const http = require('http');
const app = require('./backend/app');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
app.set('port',port);
server.listen(port,()=>{
   console.log('Server is running on port:',port);
});
*/
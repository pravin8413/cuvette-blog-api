const express = require("express");
const db = require("./config/db");
const Post = require("./models/Post");
const PORT = process.env.PORT || 3000;
const app = express();


db().then(() => console.log("Successfully connected to db")).catch((err) => console.log("Error while connecting to db"))


app.use(express.json());


// to check health of API
app.get('/api', (req, res) => {
    res.status(200).json({ message: "API is working fine" });
})

// fetching all the posts
app.get('/api/posts', (req, res) => {
    Post.find({}).then((data) => {
        // console.log(data);
        res.status(200).json({ data })

    }).catch((err) => {
        // console.log(err);
        res.status(500).json({ message: err });
    })
})

// get a specific post
app.get('/api/posts/:id', (req, res) => {

    let postId = req.params.id;

    Post.find({ _id: postId }).then((data) => {
        console.log(data);
        res.status(200).json({ data })

    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
    })
})

// create new post
app.post('/api/posts/', (req, res) => {

    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data) => {
        console.log(data);
        res.status(200).json({ message: "Post created succefully", data: data })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({message:err});
    })

})

// updating specific post

app.put('/api/posts/:id',(req,res)=>{
    let postId = req.params.id;
    
    let newInfo = {
        title: req.body.title,
        description: req.body.description
    }

    Post.findByIdAndUpdate(postId,newInfo).then((data)=>{
        res.status(200).json({message:"Post updated successfully",data:data})
    }).catch((err)=>{
        res.status(500).json({message:err});
    })
})

// delete specific post

app.delete('/api/posts/:id',(req,res)=>{

    let postId = req.params.id;

    Post.findByIdAndDelete(postId).then(()=>{
        res.status(200).json({message:"post deleted successfully"})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log("YOur server is running");
    }
})
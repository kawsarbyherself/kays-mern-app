const { response } = require('express');
const mongoose = require('mongoose');

const PostMessage = require ('../models/postMessage.js');

const postcontroller = {
 
   async getPosts (req, res) { 
    try {
   const postMessages = await PostMessage.find();
                
       res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}, 
//getPosts (req, res ) {
    //PostMessage.find().then((dbpostdata) => {
        //return res.json (dbpostdata);
    //})
//},

async getPost  (req, res) { 
    const { id } = req.params;

    try {
      const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
},

//async createPost (req, res) {
    //const { title, message, selectedFile, creator, tags } = req.body;

    //const newPostMessage = new PostMessage( title, message, selectedFile, creator, tags)

    //try {
        //await newPostMessage.save();

        //res.status(201).json(newPostMessage );
    //} catch (error) {
       //res.status(409).json({ message: error.message });
    //}
//},
createPost(req, res ) {
    PostMessage.create(req.body).then((dbpostdata)=> {
       res.json(dbpostdata)
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},


async updatePost (req, res) {
  const { id } = req.params;
     const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

 const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
},
async deletePost  (req, res)  {
   const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
},

 async likePost (req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
},

}
module.exports = postcontroller;
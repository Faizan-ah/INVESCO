
const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost')

//Routes
router.get('/',(req,res)=>{
    //finding data in database
    BlogPost.find({})
    .then((data)=>{
        console.log("data: ",data);
        res.json(data);
    })
    .catch((err)=>{
        console.log("error: ",error)
    })
    
});
router.get('/name',(req,res)=>{
    const data={
        name:"umer",
        age:22
    }
    res.json(data);
});
router.post('/save', (req,res)=>{
    console.log("request body: ", req.body)
    //BlogPost
    const data = req.body
    const newBlogPost = new BlogPost(data);
    //.save()
    newBlogPost.save((error)=>{
        if(error){
            res.status(500).json({msg: "error here!"})
        }
        else{
            res.status(200).json({
                msg: "data is being recieved"
            })
        }
    })

   
})
module.exports = router;
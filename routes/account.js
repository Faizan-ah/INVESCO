const express = require('express');
const router = express.Router();

const User = require('../models/User');
const UserSession = require('../models/UserSession');

// router.get('/signin',(req,res)=>{
//     console.log("working!")
//     const data={
//         name:"umeraaaa",
//         age:221
//     }
//     res.json(data);
// });

router.post('/signup', (req,res,next)=>{
    const {body} = req;
    const {
        firstName,
        lastName,
        password,
    } = body;
    let {email} = body;

    if(!firstName){
        return res.send({
            success:false,
            message: 'Error: Enter First Name!'
        })
    }
    if(!lastName){
        return res.send({
            success:false,
            message: 'Error: Enter Last Name!'
        })
    }
    if(!email){
        return res.send({
            success:false,
            message: 'Error: Enter Email!'
        })
    }
    
    if(!password){
        return res.send({
            success:false,
            message: 'Error: Enter Password!'
        })
    }

    email = email.toLowerCase();

    //steps
    //1. verify email doesnt exist
    //2. save
    User.find({
        email: email
    }, (err,previousUsers)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error: Server error'
            })
        }
        if(previousUsers.length>0){
            return res.send({
                success:false,
                message:'Account Already Exists.'
            })
        }
        //new user
        const newUser = new User();
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.email=email;
        newUser.password=newUser.generateHash(password);
        newUser.save((err,user)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: Server error'
                })
            }
            res.send({
                success:true,
                message:'Signed up!'
            })
        })
    }) 
})
   
router.post('/signin', (req,res,next)=>{
    const {body} = req;
    const {password} = body;
    let {email} = body;
    if(!email){
        return res.send({
            success:false,
            message: 'Error: Enter Email!'
        })
    }
    if(!password){
        return res.send({
            success:false,
            message: 'Error: Enter Password!'
        })
    }
    email = email.toLowerCase();

    User.find({
        email: email
    }, (err,users)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error: Server error'
            })
        }
        if(users.length!=1){
            return res.send({
                success:false,
                message:'Error: Invalid Inputs'
            })
        }
        
        const user = users[0];
        if(!user.validPassword(password)){
            return res.send({
                success:false,
                message:'Invalid Password'
            })
        }
    
        //otherwise correct user
        const userSession = new UserSession();
        userSession.userID = user._id
        userSession.save((err,doc)=>{
            if(err){
                return res.send({
                    success:false,
                    message:"Error: server error"
                })
            }
            return res.send({
                success:true,
                message:"Valid Sign in",
                token: doc._id
            })
        })
    })
})

router.get('/verify',(req,res,next)=>{
    //get the token
    const {query} = req;
    const {token} = query;
    // ?token =test

    //verify the token is unique and not deleted
    UserSession.find({
        _id:token,
        isDeleted:false
    },(err,sessions)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error: Server error'
            })
        }
        if(sessions.length!=1){
            return res.send({
                success:false,
                message:'Error: Invalid'
            })
        }
        else{
            return res.send({
                success:true,
                message:'Goood.'
            })
        }
    })
})

router.get('/logout',(req,res,next)=>{
    //get the token
    const {query} = req;
    const {token} = query;
    // ?token =test

    //verify the token is unique and not deleted
    UserSession.findOneAndUpdate({
        _id:token,
        isDeleted:false
    }, {
        $set:{isDeleted:true}
    }, null, (err,sessions)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error: Server error'
            })
        }
        if(sessions.length!=1){
            return res.send({
                success:false,
                message:'Account Already Exists.'
            })
        }
        else{
            return res.send({
                success:true,
                message:'Goood.'
            })
        }
    })
})
module.exports = router
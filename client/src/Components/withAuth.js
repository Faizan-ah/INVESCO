// import { Component } from 'react';
import {Redirect} from 'react-router-dom'

class withAuth {
    constructor(){
        this.isAuthenticated= false
    }

    checkAuth = () =>{
        const obj =this.getFromStorage('the_main_app')
        console.log('obje',obj.token)
        if(obj && obj.token){
            const {token} = obj.token
            //verify token
            fetch('/verify?token='+token)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    return this.isAuthenticated = true
                }
                else{
                    return this.isAuthenticated = false
                }
            })
        }
        else{
            return this.isAuthenticated = false
        }
    }
    //getting token 
    getFromStorage =(key)=>{
        if(!key){
            return null;
        }
        try{
            const valueStr = localStorage.getItem(key)
            if(valueStr){
                return JSON.parse(valueStr)
            }
            return null;
        }catch(err){
            return null;
        }
    }
} 

export default withAuth
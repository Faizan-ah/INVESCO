import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './StyleSheets/Signup.css';
import axios from 'axios';
export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpMobile: '',
            signUpPassword: '',
        }
    }

    componentDidMount(){
        const token =this.getFromStorage('the_main_app')
        if(token){
            //verify token
            fetch('/verify?token='+token)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.setState({
                        token:token,
                        isLoading:false
                    })
                }
                else{
                    this.setState({
                        isLoading:false,
                    })
                }
            })
        }
        else{
            this.setState({
                isLoading:false,
            })
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

    setInStorage =(key,obj)=>{
        if(!key){
            console.log("key missing");
        }
        try{
            localStorage.setItem(key,JSON.stringify(obj))
        }
        catch(err){
            console.log("errrr");
        }
    }

    //blank inputs
    resetInputs = ()=>{
        this.setState({
            isLoading: false,
            token: '',
            signUpError: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpMobile: '',
            signUpPassword: '',
        })
    }

    // submit = (event)=>{
    //     //stops rendering until submit button
    //     event.preventDefault();
    
    //     const payload = {
    //       firstName:"a",
    //       lastName:"ahmed",
    //       email:"a@g.com",
    //       mobileNum:"1111",
    //       password:"asd",
    //     }
    
    //     //sending data to server
    //     axios({
    //       url:'/signup',
    //       method:'POST',
    //       data: payload
    //     })
    //     .then(()=>{
    //       console.log("data sent to server")
    //       //this.resetUserInputs();
    //       //this.getBlogPost();
    //     })
    //     .catch(()=>{
    //       console.log("data NOT sent to server")
    //     })
    //   };
    
    onChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value;
        this.setState({
            [name]:value
        })
    }
    
    onSignup = (event) =>{
        //event.preventDefault()
        //Grab State
        const {
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpMobile,
            signUpPassword,
        } = this.state

        this.setState({
            isLoading:true,
        })
        //post request to backend
        fetch('/account/signup', {
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName:signUpFirstName,
                lastName:signUpLastName,
                email:signUpEmail,
                mobileNum:signUpMobile,
                password:signUpPassword,

            }),
        })
        .then(res=>res.json())
        .then(json =>{
            console.log('json',json)
            if(json.success){
                console.log(json.message," successfull i guess");
                this.resetInputs();
                //maybe routing code here
            } else{
                alert(json.message)
                 console.log("eroror")
                 this.setState({
                     isLoading:false,
                 }) 
            }
        })
   

    }
    render(props) {

        console.log(this.state)
        const {isLoading,
            token,
            signUpError,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpMobile,
            signUpPassword,
        }   = this.state;
        // if(isLoading){
        //     return(<div><p>Loading...</p></div>)
        // }
        // if(!token){
        //     return(<div><p>token not set</p></div>)
        // }

        return (
        <div class='signup-main'>
            <form class="signupForm">
                
                <h1>Welcome</h1>
                            
                <div class='signupDataRow1'>
                    <div class='signupDataRow1Col1'>
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" name="signUpFirstName" value={signUpFirstName} onChange={this.onChange.bind(this)} required></input>
                    </div>
                    <div class='signupDataRow1Col2'>
                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" name="signUpLastName" value={signUpLastName} onChange={this.onChange} ></input>
                    </div>
                </div>

                <div class='signupDataRow1'>
                    <div class='signupDataRow2Col1'>
                        <label for="mobileNum">Mobile Number</label>
                        <input type="text" id="mobileNum" name="signUpMobile" value={signUpMobile} onChange={this.onChange} ></input>
                    </div>
                    <div class='signupDataRow2Col2'>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="signUpEmail" value={signUpEmail} onChange={this.onChange} required></input>
                    </div>
                </div>
                
                <div class='signupDataRow3'>
                    <div class='signupDataRow3Col1'>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="signUpPassword" value={signUpPassword} onChange={this.onChange} required></input>
                    </div>
                    <div class='signupDataRow3Col2'>
                        <label for="cpassword">Confirm Password</label>
                        <input type="password" id="cpassword" value={signUpPassword} ></input> 
                    </div>
                </div>
                <div class="hel">
                <input type='checkbox' id='termsCond' required></input>
                <label class="terms" for='termsCond'>Do you agree to our <span><a id="termsLink" href="#">Terms</a></span> and <span><a id="ppLink" href="#">Privacy Policy</a></span>?</label>                    
                </div>
                <div class="button" id="button-signup" onClick={this.onSignup}>
                    <div id="circle"></div>
                    <a href="#">SIGNUP</a>
                </div>

                <div class="logLink">
                    <Link id="loginLink" to="/login">Already have an account?</Link>
                </div>
                {/* check */}
            </form>
            
            
           
        </div>
        )
    }
}

export default Signup

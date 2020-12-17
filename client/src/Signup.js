import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom';
import './StyleSheets/Signup.css';
export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            success:false,
            token: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpMobile: '',
            signUpPassword: '',
        }
    }
    componentDidMount(){
        //used for future authentication
        // const token =this.getFromStorage('the_main_app')
        // if(token){
        //     //verify token
        //     fetch('/verify?token='+token)
        //     .then(res=>res.json())
        //     .then(json=>{
        //         if(json.success){
        //             this.setState({
        //                 token:token,
        //                 isLoading:false
        //             })
        //         }
        //         else{
        //             this.setState({
        //                 isLoading:false,
        //             })
        //         }
        //     })
        // }
        // else{
        //     this.setState({
        //         isLoading:false,
        //     })
        // }
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
    //setting token
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
    //adding onChange event for text fields
    onChange = (event) =>{
    const target = event.target;
    const name = target.name;
    const value = target.value;
        this.setState({
            [name]:value
        })
    }
    //pushing route on signup button
    signupButtonPush = () =>{
        if(this.state.success){
            console.log("hhhh",this.props.history)
            this.props.history.push("/login")
        }
        else{
            console.log("isme")
            this.props.history.push("/registration")
        }
    }
    //signup button event call
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
                console.log(json.message," Successfull !");
                this.resetInputs();
                this.setState({
                    success:true
                })
                this.signupButtonPush();
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
            signUpFirstName,
            signUpLastName,
            signUpEmail,
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

                <div class='signupDataRow2'>
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

export default withRouter(Signup)

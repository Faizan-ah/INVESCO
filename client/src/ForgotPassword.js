import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom';
import './StyleSheets/Login.css'
import './StyleSheets/ForgotPassword.css'
import { connect } from 'react-redux';
import fire from './config/fire'

export class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            success:false,
            email: '',
            inputError:'',
            inputSuccess:'',
        }
    }

    onChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
            this.setState({
                [name]:value
            })
        }

    onPasswordReset = ()=>{
        const { email } = this.state
        console.log('in')
        fire.auth().sendPasswordResetEmail(email)
        .then( ()=>{
            this.setState({
                inputSuccess: 'Check Your Email',
                inputError:"",
            })
        })
        .catch((err)=>{
            console.log(err.toString())
            this.setState({
                inputError:"Invalid Email",
                inputSuccess:''
            })
        })
    } 
 

    render() {
        return (
            <div class="fgp-main" >
                <form method="post" class="loginForm" >
                    <div class='fgpData'>
                        <h1>Password Reset</h1>
                        <label for="email">Enter Email</label>
                        <input type="email" name="email" value = {this.state.email} id="email" onChange={this.onChange} required></input>
                        <span className="fgp-error">
                            {this.state.inputError}
                        </span>
                          
                        <span className="fgp-success">
                            {this.state.inputSuccess}
                        </span>
                            
                        
            
                        <div>
                            <div class="button" id="button-login" onClick = {this.onPasswordReset}>
                                <div id="circle"></div>
                                <p>Reset Password</p>
                                {/* <Link to="/">LOGIN</Link> */}
                            </div>
                            
                        </div>
                        <div class='fgp-links'>
                            <Link id="fpass" to='/Login'>Back to Login</Link>
                        </div>
                    </div>
                    
                </form>

               
            </div>
            
        )
    }
}


export default ForgotPassword
import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom';
import './StyleSheets/Login.css'

import { connect } from 'react-redux';
import fire from './config/fire'
export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            success:false,
            signInEmail: '',
            signInPassword: '',
            inputError:'',
        }
    }

    resetInputs = ()=>{
        this.setState({
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
        })
    }

    onChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
            this.setState({
                [name]:value
            })
        }

    // signinButtonPush =() =>{
    //     console.log('success',this.state.success)
    //     if(this.state.success){
    //         console.log("hhhh",this.props.history)
    //         this.props.history.push("/Home")
    //     }
    //     else{
    //         console.log("isme")
    //         this.props.history.push("/login")
    //     }
    // }

    onSignin = ()=> {
        const {
            signInEmail,
            signInPassword
          } = this.state
    
      console.log('in login', this.state)
      fire.auth().signInWithEmailAndPassword(signInEmail, signInPassword)
          .then((u) => {
            console.log('Successfully Logged In');
            
            this.props.history.push('/home')
          })
          .catch((err) => {
            console.log(err.toString());
                this.setState({
                    inputError: err.toString()
                })
          })
      
    }
    
  printRedux = ()=>{
    console.log('redux state user', this.props.user.user)
    console.log('redux state auth', this.props.user.isAuth)
  }

    render(props) {
        // if(this.state.isLoading){
        //     return(<div><p>Loading...</p></div>)
        // }
        this.printRedux()
        return (
           
            <div class="login-main" >
                <form method="post" class="loginForm" >
                    <div class='loginData'>
                        <h1 style={{fontStyle:'normal'}}>Welcome</h1>
                        <label for="email">Email</label>
                        <input type="email" name="signInEmail" value = {this.state.signInEmail} id="email" onChange={this.onChange} required></input>
                        <label for="password">Password</label>
                        <input type="password" name="signInPassword" value = {this.state.signInPassword} id="password" onChange={this.onChange} required></input>
                        <span className="error-display-login">{this.state.inputError}</span>
                        <div>
                            <div class="button" id="button-login" onClick = {this.onSignin}>
                                <div id="circle"></div>
                                <p>LOGIN</p>
                                {/* <Link to="/">LOGIN</Link> */}
                            </div>
                        </div>
                        <div class='links'>
                            <Link id="fpass" to='/ForgotPassword'>Forgot Password?</Link>
                            <Link id="regAcc" to="/registration">Register Account</Link>
                        </div>
                    </div>
                    
                </form>

               
            </div>
            
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      //initialUserState 
      user: state.user,
    }
  }
// export default withAuth(Login)
export default connect(mapStateToProps)(withRouter(Login))
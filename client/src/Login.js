import React, { Component } from 'react'
import { Link,Redirect,withRouter } from 'react-router-dom';
import Signup from './Signup'
import './StyleSheets/Login.css'
import withAuth from "./Components/withAuth";
import Home from './Home'
export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            success:false,
            token: '',
            signInEmail: '',
            signInPassword: '',
        }
    }

    componentDidMount(){
        const obj =this.getFromStorage('the_main_app')
        // console.log('obje',obj.token)
        // if(obj && obj.token){
        //     const {token} = obj.token
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

    loginmadafaka =() =>{
        console.log('success',this.state.success)
        if(this.state.success){
            console.log("hhhh",this.props.history)
            this.props.history.push("/Home")
        }
        else{
            console.log("isme")
            this.props.history.push("/login")
        }
    }

    onSignin = () =>{
            //event.preventDefault()
            //Grab State
            const auth = new withAuth()
            const {
                success,
                signInEmail,
                signInPassword,
            } = this.state
    
            this.setState({
                isLoading:true,
            })
            //post request to backend
            fetch('/account/signin', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email:signInEmail,
                    password:signInPassword,
                }),
            })
            .then(res=>res.json())
            .then(json =>{
                console.log('json',json)
                if(json.success){
                    alert('signin successful')
                    this.setInStorage('the_main_app',{ token: json.token })   
                    console.log(json.message," successfull i guess");
                    this.resetInputs();
                    this.setState({
                        success:true,
                        token:json.token
                    })
                    this.loginmadafaka();
                    // if(success){
                    //     <Redirect to="/Home"/>
                    // }
                    // auth.checkAuth(()=>{
                    //     this.props.history.push('/Home')
                    // })


                    console.log(this.state)
                } else{
                    alert(json.message)
                    console.log("login eroror")
                    this.setState({
                        isLoading:false,
                    }) 
                }
            })
            // .catch((err)=>{
            //     console.log("123")
            // })
    
        }
    //function for logout
    isLogout = () =>{
        this.setState({
            isLoading:true,
        })
        const obj =this.getFromStorage('the_main_app')
        if(obj && obj.token){
            const {token} = obj.token
            //verify token
            fetch('/logout?token='+token)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.setState({
                        token:'',
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
    render(props) {
        // if(this.state.isLoading){
        //     return(<div><p>Loading...</p></div>)
        // }
        return (
           
            <div class="login-main" >
                <form method="post" class="loginForm" >
                    <div class='loginData'>
                        <h1>Welcome</h1>
                        <label for="email">Email</label>
                        <input type="email" name="signInEmail" value = {this.state.signInEmail} id="email" onChange={this.onChange} required></input>
                        <label for="password">Password</label>
                        <input type="password" name="signInPassword" value = {this.state.signInPassword} id="password" onChange={this.onChange} required></input>
                        <div>
                            <div class="button" id="button-login" onClick = {this.onSignin}>
                                <div id="circle"></div>
                                <a>LOGIN</a>
                                {/* <Link to="/">LOGIN</Link> */}
                            </div>
                        </div>
                        <div class='links'>
                            <Link id="fpass" >Forgot Password?</Link>
                            <Link id="regAcc" to="/registration">Register Account</Link>
                            {/* check */}
                            
                        </div>
                    </div>
                    
                </form>

               
            </div>
            
        )
    }
}

// export default withAuth(Login)
export default withRouter(Login)
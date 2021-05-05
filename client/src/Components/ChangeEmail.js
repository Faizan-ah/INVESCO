import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
import Header from './Header'
import fire from '../config/fire'
import { Button, Popover } from '@material-ui/core';
export class ChangeEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            prevEmail: '',
            Epassword: '',
            newEmail:'',
            msg:'',
            errMsg:'',
            verMsg:''
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
    changeEmailVerify = () => {
        const user = fire.auth().currentUser
        const {prevEmail,newEmail,Epassword} = this.state
        user.reauthenticateWithCredential(prevEmail,Epassword).then(()=>{
            console.log('reauthenticated')
        }).catch((e)=>{
            console.log('error',e)
        })
        // user.verifyBeforeUpdateEmail(newEmail)
    }

    changeEmail = ()=>{
        const {prevEmail,newEmail,Epassword} = this.state
        const user = fire.auth().currentUser;
        const userID = fire.auth().currentUser.uid
        if(this.validate()){
            fire.auth().signInWithEmailAndPassword(prevEmail,Epassword)
        .then(()=>{
            const cUser = fire.auth().currentUser
            if(user == cUser){
                console.log('same users')
                //updating in authentication
                cUser.updateEmail(newEmail)
                .then(()=>{
                    //updating in realtime
                    fire.database().ref('Users/'+userID).once('value', (data)=>{
                        var datas = []
                        data.forEach((doc)=>{
                            fire.database().ref('Users/'+userID+'/'+doc.key).update({email: newEmail })
                        })
                    })
                    this.setState({
                        msg: 'Email Updated Successfully!',
                        errMsg:''
                    },
                    ()=>{
                        cUser.sendEmailVerification().then(()=>{
                            this.setState({
                                ...this.state,
                                errMsg:'',
                                verMsg:'Verify Your Email Before You Login Next Time.'
                            })
                        },()=>{
                            this.resetInputs()

                            setTimeout(()=>{
                            },3000)
                        })
                        
                    })
                }).catch((e)=>{
                    this.setState({
                        errMsg:e.message,
                        msg:''
                    })
                })
                
            }else{
                // console.log('not same users')
                // this.setState({
                //     errMsg:'Invalid Email or Password',
                //     msg:''
                // })
                alert('For Security Purposes we are logging you out')
                fire.auth().signOut();
                this.props.history.push('/login')
            }
                            
        }).catch((e)=>{
            
            this.setState({
                errMsg:'Invalid Email or Password',
                msg:''
            })
        })
        }
        
    }
    resetInputs = ()=>{
        this.setState({
            newEmail:'',
            Epassword:'',
            prevEmail:'',
            msg:'',
            errMsg:'',
        })
    }
    validate = ()=>{
        const {newEmail} = this.state
        const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!emailRegex.test(newEmail)){
            this.setState({
                errMsg : 'Enter a Valid New Email'
            })
            return false
        }
        return true
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <Header/>
                <div>
                    <div className="change-field-heading">
                        <h1>Change Email</h1>
                    </div>
                    <div className="change-field-inputs">
                        <div className="change-field-inputs-content">
                            <label for="prevEmail">Enter Previous Email</label>
                            <input type="email" name="prevEmail" value = {this.state.prevEmail} id="prevEmail" onChange={this.onChange} required></input>
                        </div>
                        <div className="change-field-inputs-content">    
                            <label  for="Epassword">Enter Password</label>
                            <input type="password" name="Epassword" value = {this.state.Epassword} id="Epassword" onChange={this.onChange} required></input>
                        </div>
                        {/* <div class="change-field-button" onClick = {this.changeEmailVerify}>
                                <p>Verify</p>
                            </div> */}
                        <div>    
                            <div className="change-field-inputs-content"> 
                                <label for="newEmail">Enter New Email</label>
                                <input type="email" name="newEmail" value = {this.state.newEmail} id="newEmail" onChange={this.onChange} required></input>
                            </div>
                            <div className="change-field-inputs-content">
                            <Button variant="contained" color="primary" onClick = {this.changeEmail}>
                                Done
                            </Button>
                            </div>
                            {/* <div class="change-field-button" onClick = {this.changeEmail}>
                                <p>Done</p>
                            </div> */}
                        </div>
                        <div className='msg-display'>
                            <span style={{color:'green',fontWeight:'bold',fontSize:'18px'}}>{this.state.msg}</span>
                            <br/>
                            <span style={{color:'green',fontWeight:'bold',fontSize:'18px'}}>{this.state.verMsg}</span>
                            <span style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{this.state.errMsg}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeEmail

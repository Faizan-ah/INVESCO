import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
import fire from '../config/fire'
import { Popover } from '@material-ui/core';
export class ChangeEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            prevEmail: '',
            Epassword: '',
            newEmail:'',
            msg:'',
            errMsg:''
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
    changeEmail = () => {
        console.log('in')
        const {prevEmail,newEmail,Epassword} = this.state
       
        if(this.validate()){

        }
        fire.auth()
            .signInWithEmailAndPassword(prevEmail, Epassword)
            .then(function(userCredential) {
                userCredential.user.updateEmail(newEmail)
                .then(()=>{
                    console.log('email updated successfully')
                    var user = fire.auth().currentUser;
                    user.sendEmailVerification().then(()=>{
                        if(user.emailVerified){
                            console.log('verfied')
                        }
                        else{
                            alert('An email verification link has been sent to you on your new mail.')
                            // fire.auth().signOut();
                            // this.resetInputs()
                        }
                          
                    }) 
                     
                }).catch((e)=>{
                    // this.setState({
                    //     msg:'',
                    //     errMsg: e.message,
                    // })
                })

            }).catch((e)=>{
               this.setState({
                        msg:'',
                        errMsg: e.message,
                    })
            })
        // const {prevEmail,newEmail,Epassword} = this.state
        // const user = fire.auth().currentUser
        // const credential = fire.auth.EmailAuthProvider.credential(
        //   prevEmail,Epassword
        // );
        // user.reauthenticateWithCredential(credential)
        // .then(()=>{
        //     if(user.emailVerified){
        //         user.updateEmail(newEmail);
        //         console.log('email updated successfully')
        //     }
        // }
        // )
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
                <PropertyHeader/>
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
                            <div class="change-field-button" onClick = {this.changeEmail}>
                                <p>Done</p>
                            </div>
                        </div>
                        <span className='msg-display'>{this.state.msg}</span>
                        <span className='errMsg-display'>{this.state.errMsg}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeEmail

import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
import fire from '../config/fire'
export class ChangeEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            prevEmail: '',
            Epassword: '',
            newEmail:'',
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
        
    }
    changeEmail = (email) => {
        const {prevEmail,newEmail} = this.state
        const user = fire.auth().currentUser
        user.updateEmail(email)
    }
    render() {
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
                        <div class="change-field-button" onClick = {this.changeEmailVerify}>
                                <p>Verify</p>
                            </div>
                        <div>    
                            <div className="change-field-inputs-content"> 
                                <label for="NewEmail">Enter New Email</label>
                                <input type="email" name="NewEmail" value = {this.state.newEmail} id="NewEmail" onChange={this.onChange} required></input>
                            </div>
                            <div class="change-field-button" onClick = {this.changeEmail}>
                                    <p>Done</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeEmail

import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
export class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            prevPassword: '',
            newPassword:'',
            cNewPassword:'',
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
    changePasswordVerify = () => {

    }

    changePassword = () => {

    }
    render() {
        return (
            <div>
                <PropertyHeader/>
                <div>
                    <div className="change-field-heading">
                        <h1>Change Password</h1>
                    </div>
                    <div className="change-field-inputs">
                        <div className="change-field-inputs-content">
                            <label for="prevPassword">Enter Previous Password</label>
                            <input type="password" name="prevPassword" value = {this.state.prevPassword} id="prevPassword" onChange={this.onChange} required></input>
                        </div>
                        <div class="change-field-button" onClick = {this.changePasswordVerify}>
                                <p>Verify</p>
                            </div>
                        <div>
                            <div className="change-field-inputs-content"> 
                                <label for="newPassword">Enter New Password</label>
                                <input type="password" name="newPassword" value = {this.state.newPassword} id="newPassword" onChange={this.onChange} required></input>
                            </div>
                            <div className="change-field-inputs-content">
                            <label for="cNewPassword">Confirm Password</label>
                            <input type="password" name="cNewPassword" value = {this.state.cNewPassword} id="cNewPassword" onChange={this.onChange} required></input>
                        </div>    
                            <div class="change-field-button" onClick = {this.changePassword}>
                                    <p>Done</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword

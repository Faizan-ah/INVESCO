import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
import fire from '../config/fire'
import Button from '@material-ui/core/Button';
class DeleteAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            prevEmail: '',
            Epassword: '',
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
    
    deleteAccount = () => {
        const {prevEmail, Epassword} = this.state;
        const user = fire.auth().currentUser
        const userID = fire.auth().currentUser.uid
        fire.auth().signInWithEmailAndPassword(prevEmail,Epassword)
        .then(()=>{
            const cUser = fire.auth().currentUser
            
            if(user==cUser){
                cUser.delete().then(()=>{
                }).catch((e)=>{
                    this.setState({
                        errMsg:e.message
                    })
                })
                fire.database().ref('Users/'+userID).remove()
                // console.log('asdasd',query)

                alert('Your Account has been deleted. Logging you out.')
                this.props.history.push('/login')
            }
            else{
                alert('For Security Purposes we are logging you out');
                fire.auth().signOut();
                this.props.history.push('/login');
            }
        }).catch((e)=>{
            this.setState({
                errMsg:e.message
            })
        })
    }

    
    resetInputs = ()=>{
        this.setState({
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
                        <h1>Delete Your Account</h1>
                    </div>
                    <div className="change-field-inputs">
                        <div className="change-field-inputs-content">
                            <label for="prevEmail">Enter Email</label>
                            <input type="email" name="prevEmail" value = {this.state.prevEmail} id="prevEmail" onChange={this.onChange} required></input>
                        </div>
                        <div className="change-field-inputs-content">    
                            <label  for="Epassword">Enter Password</label>
                            <input type="password" name="Epassword" value = {this.state.Epassword} id="Epassword" onChange={this.onChange} required></input>
                        </div>
                        <div className="change-field-inputs-content">
                        <Button variant="contained" color="primary" onClick = {this.deleteAccount}>
                            Delete
                        </Button>
                        </div>
                        
                        {/* <div class="change-field-button" onClick = {this.deleteAccount}>
                                <p>Delete</p>
                            </div> */}
                        
                        <div className='msg-display'>
                            <span style={{color:'green',fontWeight:'bold',fontSize:'18px'}}>{this.state.msg}</span>
                            <span style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{this.state.errMsg}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteAccount

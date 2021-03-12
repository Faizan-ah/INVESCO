import React, { Component } from 'react'
import '../StyleSheets/ChangeEmail.css'
import PropertyHeader from './PropertyHeader'
import fire from '../config/fire'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const useStyles = ((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            prevPassword: '',
            newPassword:'',
            cNewPassword:'',
            msg:'',
            errMsg:'',
            modalStyle:this.getModalStyle(),
            open:false
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
    rand=()=> {
        return Math.round(Math.random() * 20) - 10;
      }
    getModalStyle = ()=> {
        const top = 50 + this.rand();
        const left = 50 + this.rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
    changePassword = () => {
        const {email,prevPassword,newPassword,cNewPassword} = this.state;
        const user = fire.auth().currentUser;
        if(this.validate()){
            fire.auth().signInWithEmailAndPassword(email,prevPassword)
            .then(()=>{
                const cUser = fire.auth().currentUser
                if(user == cUser){
                    console.log('same users')
                    cUser.updatePassword(newPassword)
                    .then(()=>{
                        this.setState({
                            msg: 'Password Updated Successfully!',
                            errMsg:''
                        },
                        ()=>{
                            this.resetInputs()
                            setTimeout(()=>{
                            },3000)
                        })
                    }).catch((e)=>{
                        this.setState({
                            errMsg:e.message,
                            msg:''
                        })
                    })
                }else{
                    this.setState({
                        errMsg:'Invalid Email or Password',
                        msg:''
                    })
                }
            }).catch((e)=>{
                this.setState({
                    msg:'',
                    errMsg:'Invalid Email or Password'
                })
            })
        }
        
    }

    validate = (event)=>{
        const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i)
        if(!emailRegex.test(this.state.email)){
            this.setState({
                errMsg:'Enter Valid Email'
            })
            return false
        }
        if(!passRegex.test(this.state.newPassword)){
            this.setState({
                msg:'',
                errMsg:'Password must have minimum 8 characters, atleast one letter and one number'
            })
            return false
        }
        if(this.state.newPassword!=this.state.cNewPassword){
            this.setState({
                msg:'',
                errMsg:"Passwords don't Match"
            }) 
            return false
        }
        return true
    }

    resetInputs=()=>{
        this.setState({
            newPassword:'',
            cNewPassword:'',
            email:'',
            prevPassword:''
        })
    }
    handleOpen = ()=>{
        this.setState({
            open: true
        })
    }
    handleClose = ()=>{
        this.setState({
            open: false
        })
    }
    body = (
        <div style={{top:50,left:50}}className={this.props.classes.paper}>
          <h2 id="simple-modal-title">Password Updated Successfully</h2>
          <p style={{color: 'black'}} id="simple-modal-description">
            Your password was updated.
          </p>
          
        </div>
      );
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
                            <label for="email">Enter Email</label>
                            <input type="email" name="email" value = {this.state.email} id="email" onChange={this.onChange} required></input>
                        </div>
                        <div className="change-field-inputs-content">
                            <label for="prevPassword">Enter Previous Password</label>
                            <input type="password" name="prevPassword" value = {this.state.prevPassword} id="prevPassword" onChange={this.onChange} required></input>
                        </div>
                        {/* <div class="change-field-button" onClick = {this.changePasswordVerify}>
                                <p>Verify</p>
                            </div> */}
                        <div>
                            <div className="change-field-inputs-content"> 
                                <label for="newPassword">Enter New Password</label>
                                <input type="password" name="newPassword" value = {this.state.newPassword} id="newPassword" onChange={this.onChange} required></input>
                            </div>
                            <div className="change-field-inputs-content">
                                <label for="cNewPassword">Confirm Password</label>
                                <input type="password" name="cNewPassword" value = {this.state.cNewPassword} id="cNewPassword" onChange={this.onChange} required></input>
                            </div>    
                            <div className="change-field-inputs-content">
                                <Button variant="contained" color="primary" onClick = {this.changePassword}>
                                    Done
                                </Button>
                            </div>
                            {/* <div class="change-field-button" onClick = {this.changePassword}>
                                    <p>Done</p>
                            </div> */}
                            
                        </div>
                        <div className='msg-display'>
                            <span style={{color:'green',fontWeight:'bold',fontSize:'18px'}}>{this.state.msg}</span>
                            <span style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{this.state.errMsg}</span>
                        </div>
                    </div>
                    <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {this.body}
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(ChangePassword)

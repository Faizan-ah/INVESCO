import React, { Component } from 'react'
import '../StyleSheets/InvestmentRec.css'
import { Button, Popover } from '@material-ui/core';
import fire from '../config/fire';
import Header from './Header'
import { connect } from 'react-redux';
import Login from '../Login'
class InevstmentRec extends Component {
    state = {
        checkboxVal:[],
        price:'',
        timeframe:'1-6 months',
        btnDisable:true,
        error:''
    }
    componentDidMount(){
    }
    
    onPropertyCheckbox = (e) => {
        var arr=[]
        for(let i=0; i<2;i++){
            if(e.target.checked){
                this.setState({
                    checkboxVal: [...this.state.checkboxVal, e.target.value]
                })
            }
            else{
                const newArr = this.state.checkboxVal.filter((item) => item !== e.target.value);
                this.setState({
                    checkboxVal:newArr
                })
            }
        }
        
        // console.log(arr)
        // this.setState({...this.state.checkboxVal, checkboxVal: 'property'});
    }
    onHandlePrice= (event)=>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value
        })
    }
    handleSelect= (e)=>{
        this.setState({
            timeframe:e.target.value
        })
    }
    getRec = ()=>{
        if(this.validate()){
            console.log('1st')
            fire.auth().onAuthStateChanged(async function(cUser) {
                localStorage.setItem('uid',cUser.uid);
             });
             const userID = localStorage.getItem('uid');
             fire.database().ref('Users/'+userID).once('value', (snap)=>{
                snap.forEach((doc)=>{
                    fire.database().ref('Users/'+userID+'/'+doc.key+'/History').push({
                         
                            checkboxVal: this.state.checkboxVal,
                            price: this.state.price,
                            timeframe: this.state.timeframe
                        
                    })
                })
            })
            this.setState({
                error: ''
            })
        }else{
            console.log('2st')
            this.setState({
                error: 'Please fulfill all fields'
            })
        }
        
    }
    validate = ()=>{
        if(this.state.price=='' || this.state.checkboxVal.length==0){
            this.setState({
                btnDisable: false,
                error:'Please fulfill all fields'
            })
            return false
        }
        return true
    }
    render() {
        const isAuthenticated = this.props.user.isAuth
        console.log(this.state.btnDisable)
        const buttonStyle = {
            pointerEvents: this.state.btnDisable ? 'none': 'all',
        }
        if(!isAuthenticated){
           return (
                <Login/>
           ) 
        }
        else{
            return (
                <div>
                    <Header />
                    <div className="realestate-main">
                        <h1>INVESTMENT RECOMMENDATION</h1>
                    </div>
                    <div className='inv-content'>
                        <div className='inv-inputs-container'>
                            <label className='inv-labels' for='interest'>Select the field you're interested in</label>
                            <div className='inv-checkbox'>
                                <div>
                                    <input className='inv-label-check' type='checkbox' id='stock' value='stock' onChange={this.onPropertyCheckbox} ></input>
                                    <label for='stock'>Stock</label>
                                </div>
                                <div>
                                    <input className='inv-label-check' type='checkbox' id='property' value='property' onChange={this.onPropertyCheckbox}></input>
                                    <label for='property'>Real-estate</label>
                                </div>
                                
                            </div>
                        </div>
                        <div className='inv-inputs-container'>
                            <label className='inv-labels' for='range'>Enter your maximum <br/>investment (in PKR)</label>
                            <input type="number" className='inv-inputs' name="price" value={this.state.price} onChange={this.onHandlePrice} placeholder='example: 200000' id='range'></input>
                        </div>
                        <div className='inv-inputs-container'>
                            <label className='inv-labels' for='time'>Select your timeframe</label>
                            <select  className='select-text' id='time' onChange={this.handleSelect}>
                                <option className='option-text' value="1-6 months">1-6 months</option>
                                <option className='option-text' value='6-12 months'>6-12 months</option>
                                <option className='option-text' value='1-5 years'>1-5 years</option>
                            </select>
                        </div>
                        <div className='inv-button'>
                            <Button variant="contained"  color="primary" onClick = {this.getRec}>
                                Get Recommendation
                            </Button>
                        </div>
                        <span style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{this.state.error}</span>
                        
                    </div>
                </div>
            )
        }
        
    }
}
const mapStateToProps = (state)=>{
    return {
        user: state.user,
      stock: state.stock,
    }
  }
export default connect(mapStateToProps)(InevstmentRec);

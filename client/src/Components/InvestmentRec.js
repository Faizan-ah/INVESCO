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
        timeframe:'3 Month',
        btnDisable:true,
        error:'',
        stockRec:[],
        propertyRec:[],
        isLoading:true
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
            var stockArr=[]
            var propertyArr=[]
            fetch(`http://investmentrecommendation.herokuapp.com/stock/?time=${this.state.timeframe}&&amount=${this.state.price}`)
            .then((response) => response.json())
            .then(responseData=>{
                    Object.keys(responseData).map(data=>{
                    console.log(responseData[data])
                    stockArr.push(responseData[data])
                })
                this.setState({
                    stockRec:stockArr
                })
                console.log(this.state.stockRec)
            })

            fetch(`http://investmentrecommendation.herokuapp.com/plot/?time=${this.state.timeframe}&&amount=${this.state.price}`)
            .then((response) => response.json())
            .then(responseData=>{
                
                console.log(this.state.propertyRec)
                Object.keys(responseData).map(data=>{
                    console.log(responseData[data])
                    propertyArr.push(responseData[data])
                })
                this.setState({
                    propertyRec:propertyArr
                })
                console.log(this.state.propertyArr)
            })
            this.setState({
                error: '',
                isLoading:false
            })
        }else{
            console.log('2st')
            this.setState({
                error: 'Please fulfill all fields'
            })
        }
        
    }
    validate = ()=>{
        if(this.state.price==''){
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
        const tableStyle = {
            display: this.state.isLoading ? 'none': 'block',
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
                            <label className='inv-labels' for='range'>Enter your maximum investment (in PKR)</label>
                            <input type="number" className='inv-inputs' name="price" value={this.state.price} onChange={this.onHandlePrice} placeholder='example: 200000' id='range'></input>
                        </div>
                        <div className='inv-inputs-container'>
                            <label className='inv-labels' for='time'>Select your timeframe</label>
                            <select  className='select-text' id='time' onChange={this.handleSelect}>
                                <option className='option-text' value="3 Month">3 Month</option>
                                <option className='option-text' value='6 Month'>6 Month</option>
                                <option className='option-text' value='1 Year'>1 Year</option>
                                <option className='option-text' value='3 Year'>3 Year</option>
                                <option className='option-text' value='5 Year'>5 Year</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='inv-button'>
                                <Button variant="contained"  color="primary" onClick = {this.getRec}>
                                    Get Recommendation
                                </Button>
                        </div>
                        <span style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{this.state.error}</span>
                    </div>
                    <div style={tableStyle} className='invest-results'>
                        <div className='invest-results-tables'>
                            <h2>Stock Companies to Invest</h2> 
                                <div className='invest-table' style={{width:'100%'}}>
                                    <table className='techAnalysis'>
                                        <tr  className='invest-row'>
                                        <th>Name</th>
                                        <th>Percent</th>
                                        <th>Returned Amount</th> 
                                        </tr>
                                        {
                                            this.state.stockRec.map((title)=>{
                                                return(
                                                    <tr  className='invest-row'> 
                                                    <td>{title.Ticker}</td>
                                                    <td>{title.Percent}</td>
                                                    <td>{title.Amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            </div>
                        <div className='invest-results-tables'>
                            <h2>Areas to Invest</h2>
                            <div className='invest-table' style={{width:'100%'}}>
                                    <table className='techAnalysis'>
                                        <tr className='invest-row'>
                                        <th>Name</th>
                                        <th>Percent</th>
                                        <th>Returned Amount</th> 
                                        </tr>
                                        {
                                            this.state.propertyRec.map((title)=>{
                                                return(
                                                    <tr className='invest-row'> 
                                                    <td>{title.Ticker}</td>
                                                    <td>{title.Percent}</td>
                                                    <td>{title.Amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div> 
                        </div>
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

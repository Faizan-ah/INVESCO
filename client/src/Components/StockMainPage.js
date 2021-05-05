import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import fire from '../config/fire'
import PropertyHeader from './PropertyHeader'
import Header from './Header'
import '../StyleSheets/StockMainPage.css'
import ReactApexCharts from "react-apexcharts";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Radio from '@material-ui/core/Radio';
import PredictedStock from './PredictedStock'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Login from '../Login'
import { connect } from 'react-redux';



const useStyles = ((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
    tab:{
        backgroundColor: 'white',
        color:'black'
    },
    container: {
        maxHeight: 440,
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: 'black',
      },
      modalText:{
          color: 'black'
      },
      modalInputs: {
          width:'50px'
      },
      buttonDiv:{
          width:'100%',   
          textAlign:'center',
          paddingTop: '10px',
      },
  }));

export class StockMainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mainCompanies:['ACPL','AGHA','APL','ASC','ASTL','ATRL','BOP','BYCO','DCL','DOL',
            'EFERT','EPCL','FCCL','FFBL','FFL','GAIL','GGL','GTYR','HASCOL','HBL','HUBC','HUMNL',
            'ICL','ISL','KAPCO','KEL','MDTL','PIAA','PRL','PSMC','SAZEW','SILK','SNGP','TELE','TRG','UNITY'],
            green:false,
            text:"Subscribe",
            open: false,
            selectedValue: this.props.location.state,
            subscribed:[],
            page:0,
            rowsPerPage:10,
            rows:[],
            value:'1',
            series: [{
                data: [{    
                      x:0,
                      y: []
                    },
                  //   {
                  //   x: new Date(1538778600000),
                  //   y: [6629.81, 6650.5, 6623.04, 6633.33]
                  // },
                ]
              }],
              options: {
                chart: {
                  type: 'candlestick',
                  height: 1050,
                  animations:{
                      enabled:false,
                      animateGradually: {
                        enabled: false,
                        delay: 150
                    },
                      dynamicAnimation:{
                          enabled: true,
                          speed: 100
                      }
                  }
                },
                title: {
                  text: 'OHLC Chart',
                  align: 'left'
                },
                xaxis: {
                  type: 'datetime'
                },
                yaxis: {
                  tooltip: {
                    enabled: true
                  }
                }
              },
            
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
      };

    handleClose = () => {
        this.setState({
            open: false
        })
      };

      handleAlert = ()=>{
        this.handleClose()
      };

      handleSubscribe= (e)=>{
        // const cUser = fire.auth().currentUser
        // const userID = fire.auth().currentUser.uid
        console.log('hello',e.target.innerText)
        fire.auth().onAuthStateChanged(async function(cUser) {
            localStorage.setItem('uid',cUser.uid);
         });
        const userID = localStorage.getItem('uid');
        if(e.target.innerText=='SUBSCRIBE'){
            this.setState({
                subscribed:[...this.state.subscribed,this.state.selectedValue]
            })
            fire.database().ref('Users/'+userID).once('value', (snap)=>{
                snap.forEach((doc)=>{
                    fire.database().ref('Users/'+userID+'/'+doc.key).update({
                        subscriptions: this.state.subscribed
                    })
                })
            })
        } else if(e.target.innerText=='SUBSCRIBED'){
            const arr = this.state.subscribed.filter((company)=>{
                return company!==this.state.selectedValue
            }) 
            console.log('qwe',arr)
            this.setState({
                subscribed: arr 
            })
            fire.database().ref('Users/'+userID).once('value', (snap)=>{
                snap.forEach((doc)=>{
                    fire.database().ref('Users/'+userID+'/'+doc.key).update({
                        subscriptions: arr
                    })
                })
            })
        }
        // fire.auth().onAuthStateChanged(async function(cUser){
        //     if(cUser){
        //         const userID = cUser.uid
        //         if(e.target.innerText=='SUBSCRIBE'){
        //             this.setState({
        //                 subscribed:[...this.state.subscribed,this.state.selectedValue]
        //             })
        //             fire.database().ref('Users/'+userID).once('value', (snap)=>{
        //                 snap.forEach((doc)=>{
        //                     fire.database().ref('Users/'+userID+'/'+doc.key).update({
        //                         subscriptions: this.state.subscribed
        //                     })
        //                 })
        //             })
                    
        //         }
        //         else if(e.target.innerText=='SUBSCRIBED'){
                    
        //             const arr = this.state.subscribed.filter((company)=>{
        //                 return company!==this.state.selectedValue
        //             }) 
        //             console.log('qwe',arr)
        //             this.setState({
        //                 subscribed: arr 
        //             })
        //             fire.database().ref('Users/'+userID).once('value', (snap)=>{
        //                 snap.forEach((doc)=>{
        //                     fire.database().ref('Users/'+userID+'/'+doc.key).update({
        //                         subscriptions: arr
        //                     })
        //                 })
        //             })
        //             // this.setState({
        //             //     color:"Secondary",
        //             //     text:'Subscribe',
        //             // })
        //         }
        //     }
        //     else{

        //     }
        // } )
        
      }

      getSubscriptions = async ()=>{
             fire.auth().onAuthStateChanged(async function(cUser) {
                 localStorage.setItem('uid',cUser.uid);
              });
             const uid = localStorage.getItem('uid');
               const user = (await fire.database().ref('Users/'+uid).once('value'));
               //key   
               const userData=user.val()[Object.keys(user.val())[0]];
              this.setState({
                subscribed: userData.subscriptions==null ? []:userData.subscriptions
            })
      }

    sendData = ()=>{
        fire.database().ref('historicaldatafyp-default-rtdb/Stocks/ABCD').set({'key':'value'})
        console.log('pit')
    }
    getHistoricalTableData = ()=>{
        let tableData = []
        console.log('inside table functionnn')
        try{
            fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).limitToLast(30).on('value', (snapshot)=>{
                snapshot.forEach((openSnapShot)=>{
                    var val = openSnapShot.val();
                    console.log('val', val.Open)
                    const ros = {open: val.Open,high:val.High,low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
                    tableData.push(ros)
                    })
                this.setState({
                    rows : tableData
                })
            })
        }catch(e){
            console.log('error',e)
        }
        
    }

    getHistoricalGraphData = ()=>{
        let data = []
        fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).on('value', (snapshot)=>{
            snapshot.forEach((openSnapShot)=>{
                var val = openSnapShot.val();
                let data1 = []
                data1.push( val.Open,val.High, val.Low,val.Close)
                data.push({
                    x: new Date(val.Date),
                    y: data1}
                )
            })
            this.setState({
                series: [{
                    data: 
                      data
                }
            ]      
            })
            console.log('in graph function')
        })
    }
    componentDidMount (){
        console.log('in mount')
        this.forceUpdate();
        this.getHistoricalTableData()
        this.getHistoricalGraphData()
        this.getSubscriptions()
        // this.sendData()
    }
   
        handleRadioChange = (event) => {
            this.setState({
                ...this.state.selectedValue,
                selectedValue: event.target.value,
            },()=>{
                this.getHistoricalTableData()
                this.getHistoricalGraphData()
            })
            
            // this.forceUpdate()
        };
        handleChangePage = (event, newPage) => {
            this.setState({
                page:newPage
            })
        };
    
       handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage:+event.target.value,
            page:0
        })
      };

    handleChange = (event, newValue) => {
        this.setState({
            value:newValue
        })   
      };

      columns = [
        {
            id: 'date',
            label: 'Date',
            minWidth: 170,
            
        },
        { 
            id: 'open',
            label: 'Open', 
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'high',
            label: 'High',
            minWidth: 170,
            align: 'right',
          
        },
        {
            id: 'low',
            label: 'Low',
            minWidth: 170,
            align: 'right',
        
        },
        {
            id: 'close',
            label: 'Close',
            minWidth: 170,
            align: 'right',
         
        },
        {
            id: 'change',
            label: 'Change',
            minWidth: 170,
            align: 'right',
            
        },
        {
            id: 'volume',
            label: 'Volume',
            minWidth: 170,
            align: 'right',
            
        },
        
        ];

    render() {
        const isAuthenticated = this.props.user.isAuth
        const {classes}= this.props
        const {theme} = this.props
        const btnStyle = {
            backgroundColor: this.state.subscribed.includes(this.state.selectedValue) ? "#4caf50":"#f50057"
        }
        console.log('predicted radio value', this.state.selectedValue)
        console.log('sub',...this.state.subscribed)
        if(!isAuthenticated){
            return(
                <Login/>
            )
        }else{
            return (
                <div className={classes.root}>
                    <Header/>
                    <div className="stock-main-heading">
                        <h1>STOCK PRICE PREDICTOR</h1>
                    </div>
                    <TabContext value={this.state.value}>
                        <TabList onChange={this.handleChange} className={classes.tab} aria-label="simple tabs example">
                            <Tab label="HISTORICAL" value="1" />
                            <Tab label="PREDICTED" value="2" />
                        </TabList>
                        <TabPanel value="1" 
                        //style={{backgroundColor:'rgb(196, 196, 196)'}}
                        >
                            <div className='stock-page-main'>
                                <div className='stock-buttons'>
                                    <Button variant="contained" style={btnStyle} color='secondary' onClick={this.handleSubscribe}>
                                        {this.state.subscribed.includes(this.state.selectedValue) ? "Subscribed":"Subscribe"}
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={this.handleOpen}>
                                        Alert
                                    </Button>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                        timeout: 500,
                                        }}
                                    >
                                        <Fade in={this.state.open}>
                                        <div className={classes.paper}>
                                            <h2 id="transition-modal-title">ALERT ME!</h2>
                                            <label for='aboveInput' class={classes.modalText}>When Price Gets Above: </label>
                                            <input type="number" className={classes.modalInputs} id='aboveInput'></input>
                                            <br></br>
                                            <label for='belowInput' class={classes.modalText}>When Price Gets Below: </label>
                                            <input style={{marginLeft:'3px'}} type="number" className={classes.modalInputs} id='belowInput'></input>
                                            <br></br>
                                            <div className={classes.buttonDiv}>
                                                <Button variant="contained" color="primary" onClick={this.handleAlert}>
                                                Done
                                                </Button>
                                            </div>
                                        </div>
                                        </Fade>
                                    </Modal>
                                </div>
                                
                                <div className='graph-and-selector'>
                                
                                    <div className='stock-graph'>
                                        <ReactApexCharts options={this.state.options} series={this.state.series} type="candlestick"/>
                                        <h2>Select a company</h2>
                                        <div className='stock-radio-buttons'>
                                            {this.state.mainCompanies.map((row,index)=>{
                                                return(
                                                    
                                                    <label>
                                                        <Radio
                                                            checked={this.state.selectedValue === row}
                                                            onChange={this.handleRadioChange}
                                                            value= {row}
                                                            name="radio-button-demo"
                                                            inputProps={{ 'aria-label': row }}
                                                            color='primary'
                                                        />
                                                        {row}
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                
                                </div>
                                <div style={{paddingTop:'5%', textAlign:'center'}}>
                                    <h1>Company Latest Historical Prices</h1>
                                </div>5
                                <div className='stock-company-historical-table-div'>
                                    <Paper >
                                        <TableContainer className={classes.container}>
                                            <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow>
                                                {this.columns.map((column) => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, fontWeight:'800' }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                                    // console.log('qwer',row)
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {this.columns.map((column) => {
                                                        const value = row[column.id];
                                                        // console.log("coulum", column)
                                                        // console.log("value", value)
                                                        return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                        );
                                                    })}
                                                    </TableRow>
                                                );
                                                })}
                                            </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 30, 100]}
                                            component="div"
                                            count={this.state.rows.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                        </Paper>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            Predicted Data
                            <PredictedStock />
                            <div className='techinalAnal-table'>
                            <table>
                                <h1>Technical Analysis</h1>
                                <tr>
                                <th>Name</th>
                                <th>Action</th>
                                </tr>
                                <tr>
                                <td>RSI Calculation</td>
                                <td>Maria Anders</td>
                                </tr>
                                <tr>
                                <td>On-Balance Volume</td>
                                <td>Francisco Chang</td>
                                </tr>
                                <tr>
                                <td>MACD Calculation</td>
                                <td>Roland Mendel</td>
                                </tr>
                                <tr>
                                <td>Average Directional Index</td>
                                <td>Helen Bennett</td>
                                </tr>
                                <tr>
                                <td>Distribution Line</td>
                                <td>Yoshi Tannamuri</td>
                                </tr>
                                <tr>
                                <td>Magazzini Alimentari Riuniti</td>
                                <td>Giovanni Rovelli</td>
                                </tr>
                            </table>
                        </div>
                        </TabPanel>
                    </TabContext>
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
export default connect(mapStateToProps)(withStyles(useStyles)(StockMainPage))

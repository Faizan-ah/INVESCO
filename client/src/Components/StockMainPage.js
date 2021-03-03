import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import fire from '../config/fire'
import PropertyHeader from './PropertyHeader'
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
  }));

export class StockMainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // selectedValue:this.props.stock.inputText,
            selectedValue: 'APL',
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
    sendData = ()=>{
        console.log('wrarara')
        fire.database().ref('historicaldatafyp-default-rtdb/Stocks/ABCD').set({'key':'value'})
        console.log('pit')
    }
    getHistoricalTableData = ()=>{
        let tableData = []
        console.log('inside table functionnn')
        try{
            fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).limitToLast(30).on('value', (snapshot)=>{
                snapshot.forEach((openSnapShot)=>{
                    // console.log('snappp',openSnapShot.val())
                    var val = openSnapShot.val();
                    console.log('val', val.Open)
                    const ros = {open: val.Open,high:val.High,low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
                    tableData.push(ros)
                    })
                this.setState({
                    rows : tableData
                    // rows: getLast(data)      
                })
                // console.log('this.state.rows', this.state.rows)
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
        this.getHistoricalTableData()
        this.getHistoricalGraphData()
        // this.sendData()
    }
   
        handleRadioChange = (event) => {
            // this.setState((selectedValue) => {
            //     return {selectedValue: event.target.value}
            //   })
            this.setState({
                ...this.state.selectedValue,
                selectedValue: event.target.value
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
        console.log('predicted radio value', this.state.selectedValue)
        if(!isAuthenticated){
            return(
                <Login/>
            )
        }else{
            return (
                <div className={classes.root}>
                    <PropertyHeader/>
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
                                    <Button variant="contained" color="secondary">
                                        Subscribe
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        Alert
                                    </Button>
                                </div>
                                
                                <div className='graph-and-selector'>
                                
                                    <div className='stock-graph'>
                                        <ReactApexCharts options={this.state.options} series={this.state.series} type="candlestick"/>
                                        <h2>Select a company</h2>
                                        <div className='stock-radio-buttons'>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'APL'}
                                                    onChange={this.handleRadioChange}
                                                    value="APL"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'APL' }}
                                                    color='primary'
                                                />
                                                APL
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'BOP'}
                                                    onChange={this.handleRadioChange}
                                                    value="BOP"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'BOP' }}
                                                    color='primary'
                                                />
                                                BOP
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'GAIL'}
                                                    onChange={this.handleRadioChange}
                                                    value="GAIL"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'GAIL' }}
                                                    color='primary'
                                                />
                                                GAIL
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'HASCOL'}
                                                    onChange={this.handleRadioChange}
                                                    value="HASCOL"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'HASCOL' }}
                                                    color='primary'
                                                />
                                                HASCOL
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'HBL'}
                                                    onChange={this.handleRadioChange}
                                                    value="HBL"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'HBL' }}
                                                    color='primary'
                                                />
                                                HBL
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'HUBC'}
                                                    onChange={this.handleRadioChange}
                                                    value="HUBC"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'HUBC' }}
                                                    color='primary'
                                                />
                                                HUBC
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'KAPCO'}
                                                    onChange={this.handleRadioChange}
                                                    value="KAPCO"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'KAPCO' }}
                                                    color='primary'
                                                />
                                                KAPCO
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'KEL'}
                                                    onChange={this.handleRadioChange}
                                                    value="KEL"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'KEL' }}
                                                    color='primary'
                                                />
                                                KEL
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'PIAA'}
                                                    onChange={this.handleRadioChange}
                                                    value="PIAA"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'PIAA' }}
                                                    color='primary'
                                                />
                                                PIAA
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'PSMC'}
                                                    onChange={this.handleRadioChange}
                                                    value="PSMC"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'PSMC' }}
                                                    color='primary'
                                                />
                                                PSMC
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'SILK'}
                                                    onChange={this.handleRadioChange}
                                                    value="SILK"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'SILK' }}
                                                    color='primary'
                                                />
                                                SILK
                                            </label>
                                            <label>
                                                <Radio
                                                    checked={this.state.selectedValue === 'SNGP'}
                                                    onChange={this.handleRadioChange}
                                                    value="SNGP"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'SNGP' }}
                                                    color='primary'
                                                />
                                                SNGP
                                            </label>
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

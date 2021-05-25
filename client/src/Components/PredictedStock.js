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

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
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

export class PredictedStock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue:this.props.selector,
            mainCompanies:this.props.mainCompanies,
            page:0,
            rowsPerPage:10,
            isLoading: true,
            rows:[],
            value:'1',
            series: [{
                name:'Historical',
                data: [{    
                      x:0,
                      y: [],
                      color: 'black'

                    },
                ]
              },
            {  
                 name:'Predicted',
                data: [{    
                      x:0,
                      y: [1]
                    },
                ]
              }
            ],
              options: {
                colors: ["#247BA0","#FF1654"],
                grid: {
                    borderColor: '#f1f1f1',
                  },
                chart: {
                  type: 'line',
                  height: 1050
                },
                stroke: {
                    width: 2
                  },                  
                title: {
                  text: 'Predicted Line Chart',
                  align: 'left'
                },
                xaxis: {
                  type: 'datetime',
                },
                yaxis: {
                  tooltip: {
                    enabled: true
                  },

                }
              },
            
        }
    }
    
    getHistoricalTableData = ()=>{
        let tableData = []
        fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).limitToLast(30).on('value', (snapshot)=>{
            snapshot.forEach((openSnapShot)=>{
                // console.log('snappp',openSnapShot.val())
                var val = openSnapShot.val();
                // console.log('val', val.Open)
                const ros = {open: val.Open,high:val.High,low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
                tableData.push(ros)
                })
            this.setState({
                rows : tableData
            })
            // console.log('this.state.rows', this.state.rows)
        })
    }

    getHistoricalGraphData = ()=>{
        let data = []
        fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).limitToLast(30).on('value', (snapshot)=>{
            snapshot.forEach((openSnapShot)=>{
                var val = openSnapShot.val();
                let data1 = []
                data1.push(val.Close)
                data.push({
                    x: new Date(val.Date),
                    y: data1}
                )
            })
            this.setState({
                ...this.state.series,
                series: [{
                    name:'Historical',
                    data: 
                      data
                }
            ]      
            })    
            console.log('in graph function')
        })
    }
    getPredictedStockData = ()=>{
        //need array of objects data = [{x:date,y:price}]
        fetch(`https://ml-stock.herokuapp.com/predictions/?Ticker=${this.state.selectedValue}`)
        .then((response) => response.json())
        .then(responseData => {
          let myList = [];
          Object.keys(responseData).map( (date,index) => {
              myList.push({
                  x: new Date(date),
                  y: responseData[date]
                });
          })
          //historical prices
          var hist = this.state.series[0]
          var histPluspred = []
          //history + Predictions
          histPluspred.push(hist,{name:'Predicted',data:myList})
          this.setState({
            ...this.state.series,
            series: histPluspred,
            isLoading: false
        }) 
        })
        // console.log('yeay dtaa',myList)
    }
    componentDidMount (){
        console.log('in mount')
        // this.getHistoricalTableData()
        this.getHistoricalGraphData()
        this.getPredictedStockData()
    }
   
        handleRadioChange = (event) => {
            this.setState({
                ...this.state.selectedValue,
                selectedValue: event.target.value
            },()=>{
                this.getHistoricalGraphData()
                this.getPredictedStockData()
                // this.getHistoricalTableData()
            })
            
            // this.forceUpdate()
        };
      
    handleChange = (event, newValue) => {
        this.setState({
            value:newValue
        }) 
          
      };

    render() {
        const {classes}= this.props
        console.log('radio value', this.state.selectedValue)
        return (
            <div className={classes.root}>
                <div className="stock-graph">
                    <ReactApexCharts options={this.state.options} series={this.state.series} type="line"/>                    
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
        )
    }
}

export default withStyles(useStyles)(PredictedStock)
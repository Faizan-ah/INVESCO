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
            selectedValue:'APL',
            page:0,
            rowsPerPage:10,
            rows:[],
            value:'1',
            series: [{
                data: [{    
                      x:0,
                      y: []
                    },
                ]
              }],
              options: {
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
            console.log('this.state.rows', this.state.rows)
        })
    }

    getHistoricalGraphData = ()=>{
        let data = []
        fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`).on('value', (snapshot)=>{
            snapshot.forEach((openSnapShot)=>{
                var val = openSnapShot.val();
                console.log('val.close', val.Close)
                let data1 = []
                data1.push(val.Close)
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
        // this.getHistoricalTableData()
        this.getHistoricalGraphData()
        console.log('from link', this.props.location.state)
    }
   
        handleRadioChange = (event) => {
            this.setState({
                ...this.state.selectedValue,
                selectedValue: event.target.value
            },()=>{
                this.getHistoricalGraphData()
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
        )
    }
}

export default withStyles(useStyles)(PredictedStock)

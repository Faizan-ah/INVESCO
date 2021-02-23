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
                  // {
                  //   x: new Date(1538780400000),
                  //   y: [6632.01, 6643.59, 6620, 6630.11]
                  // },
                ]
              }],
              options: {
                chart: {
                  type: 'candlestick',
                  height: 1050
                },
                title: {
                  text: 'CandleStick Chart',
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
    componentDidMount(){
        let data = []
        let tableData = []
        fire.database().ref('historicaldatafyp-default-rtdb/Stocks/HASCOL').limitToLast(30).on('value', (snapshot)=>{
            snapshot.forEach((openSnapShot)=>{
                console.log('snappp',openSnapShot.val())
            var val = openSnapShot.val();
            console.log('val', val.Open)
            const ros = {open: val.Open,high:val.High, low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
            tableData.push(ros)
            
            })
            this.setState({
                rows : tableData
                // rows: getLast(data)      
            })
        })
        fire.database().ref().child('historicaldatafyp-default-rtdb')
        .once('value',(inspectorsSnapshot)=> {
            console.log("hy")
            inspectorsSnapshot
            .child('Stocks') // This key is obfuscated in your question.
            .child('HASCOL')
            .forEach((openTicketSnapshot)=> {
                // console.log('asdasdasdasdasd',openTicketSnapshot.key); // The random key.
                var val = openTicketSnapshot.val();
                let data1 = []
                data1.push( val.Open,val.High, val.Low,val.Close)
                data.push({
                    x: new Date(val.Date),
                    y: data1}
                )
            });
            this.setState({
                series: [{
                    data: 
                      data
                    
                }
            ]      
            })
            console.log("this.state.series")
            console.log(this.state.series)
        });
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
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
        const {classes}= this.props
        return (
            <div className={classes.root}>
                <PropertyHeader/>
                <div className="realestate-main">
                    <h1>STOCK PRICE PREDICTOR</h1>
                </div>
                <TabContext value={this.state.value}>
                    <TabList onChange={this.handleChange} className={classes.tab} aria-label="simple tabs example">
                        <Tab label="HISTORICAL" value="1" />
                        <Tab label="PREDICTED" value="2" />
                    </TabList>
                    <TabPanel value="1" 
                    // style={{backgroundColor:'rgb(196, 196, 196)'}}
                    >
                        <div className='stock-page-main'>
                            <div className='graph-and-selector'>
                                <div className='stock-graph'>
                                    <ReactApexCharts options={this.state.options} series={this.state.series} type="candlestick"  />
                                </div>
                            <div>
                                <select>
                                    <option>asdasd</option>
                                    <option>asdasd</option>
                                    <option>asdasd</option>
                                </select>
                            </div>
                            </div>
                            <div>
                                <h1>Company Latest Historical Prices</h1>
                            </div>
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
                                                console.log('qwer',row)
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {this.columns.map((column) => {
                                                    const value = row[column.id];
                                                    console.log("coulum", column)
                                                    console.log("value", value)
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
                                        rowsPerPageOptions={[10, 30, 100, 1000]}
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

export default withStyles(useStyles)(StockMainPage)

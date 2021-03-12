import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import fire from '../config/fire';

const useStyles = ({
    table: {
      minWidth: 650,
    },
  });
  
 class StockTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:'',
            data:null
        }
    }
    componentDidMount(){
        this.getLatestData()
    }
    getLatestData = ()=>{
        let data = []
        
        fire.database().ref(`historicaldatafyp-default-rtdb/Stocks/`).on('value', (snapshot)=>{
            var vall = snapshot.val();
            // console.log(vall.APL)
            let companies = ['APL','BOP','HASCOL','HUBC','KAPCO','KEL','SNGP']
            var comp = []
            var dataComp = []
            for(let i=0; i<companies.length; i++){
                var compName = companies[i]
                comp.push(vall[compName])
                // comp[i].
                // for(let j =0; j<comp.length; j++){
                //     dataComp.push(comp[j]) 
                    
                //     // for(let k =0; k<dataComp.length; k++){
                //     //     console.log('test',dataComp[k])
                //     // }
                // }   
            }
            console.log('company data', comp)
            var qwe = []
            snapshot.forEach((ss)=>{
                var val = ss.val()
                qwe.push(val)
                for(let i=0;i<qwe.length;i++){
                    console.log(qwe[i].Open)
                }
                const ros = {open:val.Open,high:val.High,low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
            })
            console.log(qwe)
            // console.log('test',dataComp)
                // console.log('qweqweasdasd',vall)
                // this.rows.push
            // snapshot.forEach((openSnapShot)=>{
            //     var val = openSnapShot.val();
            //     console.log('asdasd',val)
            //     const ros = {open:val.Open,high:val.High,low:val.Low,close:val.Close,change:val.Change,volume:val.Volume,date:val.Date}
            //     data.push(ros)
            // })
            console.log('data',this.rows)
            // this.setState({
            //         data:  data   
            // })
            // console.log('in graph function')
        })
    }
    createData = (name, calories, fat, carbs, protein, A,B) => {
        return { name, calories, fat, carbs, protein, A,B};
      }
    rows = [
        // this.createData('HASCOL', 159, 6.0, 24, 4.0,11,1),
        // this.createData('SNGP', 237, 9.0, 37, 4.3,1,1),
        // this.createData('Eclair', 262, 16.0, 24, 6.0,1,1),
        // this.createData('Cupcake', 305, 3.7, 67, 4.3,1,1),
        // this.createData('Gingerbread', 356, 16.0, 49, 3.9,1,1),
      ];

      sendValue = (row)=>{
        // this.setState({
        //     value: row.name
        // })
        console.log('hellow')
        this.props.stockReducerValue(row.name)
        this.getLatestData()
        return 
      }
    render() {
        const {classes} = this.props
        // console.log('state table value',this.state.value)
        // console.log('redux value', this.props.stock.inputText)
        const {data} = this.state
        console.log('redux value', this.state.data)
        return (
            <div className='stock-table'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Companies</TableCell>
                            <TableCell align="right">OPEN</TableCell>
                            <TableCell align="right">HIGH</TableCell>
                            <TableCell align="right">LOW</TableCell>
                            <TableCell align="right">CLOSE</TableCell>
                            <TableCell align="right">CHANGE</TableCell>
                            <TableCell align="right">VOLUME</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.rows.map((row) => (
                            <TableRow key={row.key}>
                              <TableCell component="th" scope="row">
                                <Link to='/StockPrediction' onClick={this.sendValue.bind(this, row)}>
                                    {row.key}
                                </Link>
                              </TableCell>
                              <TableCell align="right">{row.Open}</TableCell>
                              <TableCell align="right">{row.High}</TableCell>
                              <TableCell align="right">{row.Low}</TableCell>
                              <TableCell align="right">{row.Close}</TableCell>
                              <TableCell align="right">{row.Change}</TableCell>
                              <TableCell align="right">{row.Volume}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                  </TableContainer>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      //initialUserState 
      stock: state.stock,
      // math: state.mathReducer
    }
  }

  const mapDispatchToProps = (dispatch)=>{
    return {
      stockReducerValue: (value)=>{
        console.log('in stock reducer dispatch')
        dispatch({
          type: 'UPDATE_INPUT',
          payload: value
        })
      }
    }
  } 
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(StockTable));

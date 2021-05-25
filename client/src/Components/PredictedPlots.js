import React, { Component } from 'react'
import ReactApexCharts from "react-apexcharts";
import { withStyles } from '@material-ui/core/styles';
import fire from '../config/fire'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuPaper: {
        maxHeight: 300
      }
  });
export class PredictedPlots extends Component {
    constructor(props){
        super(props);
        this.state={
          plotAreas:['Ali Pur, Islamabad',
            'B-17, Islamabad',
            'Bahria Enclave - Sector C1, Bahria Enclave',
           'Bahria Enclave - Sector F, Bahria Enclave',
            'Bahria Enclave - Sector G, Bahria Enclave',
           'Bahria Enclave - Sector H, Bahria Enclave',
            'Bahria Enclave - Sector I, Bahria Enclave',
            'Bahria Enclave - Sector N, Bahria Enclave',
           'Bahria Enclave 2, Bahria Town',
            'Bahria Enclave, Bahria Town',
            'Bani Gala, Islamabad',
            'Bhara kahu, Islamabad',
            'Blue Area, Islamabad',
            'CBR Town Phase 1 - Executive Block, CBR Town Phase 1',
           'CDECHS - Cabinet Division Employees Cooperative Housing Society, E-16/3',
            'Central Commercial, DHA Defence Phase 5',
            'DHA Defence Phase 1, DHA Defence',
            'DHA Defence Phase 2, DHA Defence',
            'DHA Defence Phase 3, DHA Defence',
            'DHA Defence Phase 5, DHA Defence',
            'DHA Defence, Islamabad',
            'DHA Phase 1 - Sector F, DHA Defence Phase 1',
           'DHA Phase 2 - Sector A, DHA Defence Phase 2',
           'DHA Phase 2 - Sector B, DHA Defence Phase 2',
            'DHA Phase 2 - Sector G, DHA Defence Phase 2',
            'DHA Phase 2 Extension - Sector K, DHA Phase 2 Extension',
            'DHA Phase 2 Extension, DHA Defence Phase 2',
           'DHA Phase 3 - Block B, DHA Defence Phase 3',
            'DHA Phase 4 - Sector C, DHA Defence Phase 4',
            'DHA Phase 5 - Sector B Commercial Zone, DHA Defence Phase 5',
           'DHA Phase 5 - Sector C, DHA Defence Phase 5',
         'DHA Phase 5 - Sector F, DHA Defence Phase 5',
            'DHA Valley - Oleander Sector, DHA Valley',
            'DHA Valley - Rose Sector, DHA Valley',
            'E-16/2, E-16',
           ' E-17/3, E-17',
           ' Faisal Margalla City, B-17',
            'Fateh Jang Road, Islamabad',
           'G-13/3, G-13',
          'G-15/1, G-15',
            'G-15/4, G-15',
           'G-8/1, G-8',
           'GT Road, Islamabad',
           'Gulberg Business Square, Gulberg',
            'Gulberg Residencia - Block I, Gulberg Residencia',
            'Gulberg Residencia - Block L, Gulberg Residencia',
            'Gulberg Residencia - Block R, Gulberg Residencia',
            'I-11/2, I-11',
            'I-12/1, I-12',
            'I-12/3, I-12',
            'I-15/1, I-15',
            'ICHS Town - Phase 1, Islamabad Co-operative Housing',
            'Islamabad - Murree Expressway, Islamabad',
            'Jammu & Kashmir Housing Society, G-15',
            'Kashmir Highway, Islamabad',
            'MPCHS - Block C, MPCHS - Multi Gardens',
            'MPCHS - Block E, MPCHS - Multi Gardens',
            'MPCHS - Block F, MPCHS - Multi Gardens',
            'MPCHS - Block G, MPCHS - Multi Gardens',
            'MPCHS - Multi Gardens, B-17',
            'Motorway Chowk, Islamabad',
            'Mumtaz City, Islamabad',
            'Naval Anchorage - Block D, Naval Anchorage',
            'Naval Anchorage - Block F, Naval Anchorage',
            'New Pindi Cooperative Housing Society, DHA Defence Phase 3',
            'PECHS, Islamabad',
            'Park View City, Islamabad',
            'Rawal Enclave - Phase 1, Rawal Enclave',
            'Sangjani, Islamabad',
            'Simly Dam Road, Islamabad',
            'Tarlai, Islamabad',
            'Thalian, Islamabad',
            'Top City 1 - Block C, Top City 1',
            'Top City 1 - Block D, Top City 1',
            'Top City 1, Islamabad',
            'University Town - Block C, University Town',
            'University Town, Islamabad',
            ],
            series: [
                {
                name:'Historical',
                data:[
                        {    
                        x:0,
                        y: [],
                        },
                    ]
                },
                {  
                name:'Predicted',
                data: [
                        {    
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
              area:''

        }

    }
    handleChange = (event) => {
        this.setState({
            area:event.target.value 
        })
      };
    render() {
        const {classes} = this.props
        return (
            <div>
                <div className='plotAreas' style={{height:'50px', zIndex:'0',marginBottom:'15px'}}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel style={{height:'100px'}} id="demo-simple-select-outlined-label">View Area</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.area}
                        onChange={this.handleChange}
                        label="Age"
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                          this.state.plotAreas.map((options)=>{
                            return <MenuItem value={options}>{options}</MenuItem>
                          })
                        }
                        
                        </Select>
                    </FormControl>
                </div>
                 <div className="plot-graph">
                    <ReactApexCharts options={this.state.options} series={this.state.series} type="line"/> 
                 </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(PredictedPlots)

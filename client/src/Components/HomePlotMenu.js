import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../StyleSheets/HomePlotMenu.css'
import PlotChart from './PlotChart'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'black',
  },
  panel:{
    backgroundColor:'white',

  },
}));



export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [chartData,setChartData] = React.useState({})
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    setChartData({ 
      //x labels
      labels:[1,2,3,4,5],//jsonX
      datasets:[{
          label:"time",
          fill:false,
          //y labels
          data: [1,3,4,2,6],//jsonY
          backgroundColor:"lightgreen",
          barThickness:'50',
          borderColor: "#98B9AB"

      }]
    })
  },[])
  console.log('abhi ')
  return (
    <div className={classes.root}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Houses" {...a11yProps(0)} />
          <Tab label="Plots" {...a11yProps(1)} />
        </Tabs>

      <TabPanel value={value} index={0} className={classes.panel}>
        <div className='house-menu'>
          <div className='house-menu-left'>
            <div>
              <h1 style={{color:'black'}}>House Price Calculator</h1>
            </div>
            <div className='house-menu-inputs'>
              <div className='house-menu-inputs-rows'>
                  <div className='house-menu-inputs-row-1'>
                    <TextField size='small' style={{maxWidth:'250px'}} id="standard-basic" label="Area Size" />
                    <div>
                      <select name="size" id="size">
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                      </select>
                    </div>
                  </div>
                  <div>
                      <TextField size='small' id="standard-basic" label="Location e.g. F-10" />
                  </div>
              </div>
              <div className='house-menu-inputs-rows'>
                <TextField type='number' size='small' id="standard-basic" label="Bath(s)" />
                <TextField type='number' size='small' id="standard-basic" label="Floor(s)"  />
              </div>
              <div className='house-menu-inputs-rows'>
                <TextField type='number' size='small' id="standard-basic" label="Bed(s)" />
                <TextField size='small' id="standard-basic" label="Built in (Year)" /> 
              </div>
            </div>
          </div>
          <div className='house-menu-right'>
            <div className='calculate-button'>
              calculate
            </div>

            <div className='calculated-price'>
              Calculated Price: 
              <span>199 Rs.</span>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panel}>
        <div>
          <div className='plot-graph'>
            <PlotChart chartData={chartData} style={{ height:'2000px'}}/>
          </div>
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

        </div>
      </TabPanel>
    </div>
  );
} 

// import React from 'react';
// import Button from "@material-ui/core/Button"

// const Component = () => {
//   return (
//     <div>
//        <Button style={{margin:0}} variant="outlined" color="primary">
//         Primary
//       </Button>
//     </div>
//   );
// }

// export default Component;
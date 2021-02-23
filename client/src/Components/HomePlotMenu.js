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

import Autocomplete from '@material-ui/lab/Autocomplete';
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
      // margin: theme.spacing(1),
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
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];
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
                    <TextField size='large' id="standard-basic" variant="outlined" label="Area Size" />
                    <div>
                      <select name="size" id="size">
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                      </select>
                    </div>
                  </div>
                  <div className='house-menu-inputs-row-1-col-2'>
                      {/* <TextField size='small' id="standard-basic" label="Location e.g. F-10" /> */}
                      <Autocomplete

                        id="free-solo-demo"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                          <TextField {...params} label="Location" margin="normal" variant="outlined" />
                        )}
                      />
                  </div>
              </div>
              <div className='house-menu-inputs-rows'>
                <TextField type='number' size='large' id="standard-basic" variant="outlined" label="Bath(s)" />
                <TextField type='number' size='large' id="standard-basic" variant="outlined" label="Floor(s)"  />
              </div>
              <div className='house-menu-inputs-rows'>
                <TextField type='number' size='large' id="standard-basic" variant="outlined" label="Bed(s)" />
                <TextField size='large' id="standard-basic" variant="outlined" label="Built in (Year)" /> 
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
              <table className='techAnalysis'>
                <h1>Technical Analysis</h1>
                <tr className='techAnalysis-row'>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
                <tr className='techAnalysis-row'> 
                  <td>RSI Calculation</td>
                  <td>Maria Anders</td>
                </tr>
                <tr className='techAnalysis-row'>
                  <td>On-Balance Volume</td>
                  <td>Francisco Chang</td>
                </tr>
                <tr className='techAnalysis-row'>
                  <td>MACD Calculation</td>
                  <td>Roland Mendel</td>
                </tr>
                <tr className='techAnalysis-row'>
                  <td>Average Directional Index</td>
                  <td>Helen Bennett</td>
                </tr>
                <tr className='techAnalysis-row'>
                  <td>Distribution Line</td>
                  <td>Yoshi Tannamuri</td>
                </tr>
                <tr className='techAnalysis-row'>
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
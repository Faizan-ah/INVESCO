import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import "../StyleSheets/HomePlotMenu.css";
import PlotChart from "./PlotChart";
import Login from "../Login";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PredictedPlots from "./PredictedPlots";
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      // margin: theme.spacing(1),
    },
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'black',
  },
  panel: {
    backgroundColor: "white",
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [houseVars, setHouseVars] = React.useState({
    size: "Marla",
    price: "0",
    area: "",
  });
  const [isLoading, setLoading] = React.useState(false);
  const isAuthenticated = useSelector((state) => state.user);
  // setHouseVars({...houseVars,size:'Kanal'})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculatePrice = () => {
    setLoading(true);
    var negativeNum = new RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);
    if (houseVars.area == "0") {
      setLoading(false);
      setHouseVars({
        ...houseVars,
        price: "0",
        error: "Enter Valid Area",
        area: "",
      });
    } else {
      fetch(
        `https://housingpredict.herokuapp.com/prediction/?size=${houseVars.area}%20${houseVars.size}&&baths=${houseVars.bath}&&beds=${houseVars.bed}&&location=${houseVars.location}`
      ).then((response) => {
        response
          .json()
          .then((responseData) => {
            setLoading(false);
            setHouseVars({ ...houseVars, price: responseData, error: "" });
          })
          .catch((e) => {
            setLoading(false);
            negativeNum = new RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);
            if (
              houseVars.area == "e" ||
              houseVars.area == "" ||
              // ||
              !negativeNum.test(houseVars.area)
              // houseVars.area == "0"
            ) {
              console.log("we");
              setHouseVars({
                ...houseVars,
                price: "0",
                error: "Enter Valid Area",
                // area: "",
              });
            } else if (
              houseVars.bath == "e" ||
              houseVars.bath == "" ||
              !negativeNum.test(houseVars.bath)
            ) {
              setHouseVars({
                ...houseVars,
                price: "0",
                error: "Enter Your Bathroom(s)",
                bath: "",
              });
            } else if (
              houseVars.bed == "e" ||
              houseVars.bed == "" ||
              !negativeNum.test(houseVars.bed)
            ) {
              setHouseVars({
                ...houseVars,
                price: "0",
                error: "Enter Your Bedroom(s)",
                bed: "",
              });
            } else if (
              houseVars.location != top100Films.map((option) => option.title)
            ) {
              setHouseVars({
                ...houseVars,
                price: "0",
                error: "Enter a Valid Location",
                location: "",
              });
            } else {
              setHouseVars({ ...houseVars, error: "" });
            }
          });
      });
    }
  };

  const onChangeInputs = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setHouseVars({ ...houseVars, [name]: value });
  };

  const top100Films = [
    { title: "7th Avenue" },
    { title: "9th Avenue" },
    { title: "Abdullah Garden" },
    { title: "AGHOSH" },
    { title: "Agro Farming Scheme" },
    { title: "Airport Avenue Housing Society" },
    { title: "Airport Enclave" },
    { title: "Aiza Garden" },
    { title: "Al Huda Town" },
    { title: "Al Qaim Town" },
    { title: "Ali Pur" },
    { title: "Alipur Farash" },
    { title: "Angoori Road" },
    { title: "Arsalan Town" },
    { title: "Athal" },
    { title: "B-17" },
    { title: "Bahria Town" },
    { title: "Bani Gala" },
    { title: "Bhara kahu" },
    { title: "Blue Area" },
    { title: "Bokra Road" },
    { title: "Burma Town" },
    { title: "C-18" },
    { title: "C-19" },
    { title: "CBR Town" },
    { title: "Chak Shahzad" },
    { title: "Chatha Bakhtawar" },
    { title: "Chattar" },
    { title: "Chirah" },
    { title: "Constitution Avenue" },
    { title: "D-12" },
    { title: "D-14" },
    { title: "D-16" },
    { title: "D-17" },
    { title: "DHA Defence" },
    { title: "Diplomatic Enclave" },
    { title: "E-11" },
    { title: "E-13" },
    { title: "E-14" },
    { title: "E-15" },
    { title: "E-16" },
    { title: "E-17" },
    { title: "E-18" },
    { title: "E-7" },
    { title: "Emaar Canyon Views" },
    { title: "F-10" },
    { title: "F-11" },
    { title: "F-15" },
    { title: "F-17" },
    { title: "F-6" },
    { title: "F-7" },
    { title: "F-8" },
    { title: "Faisal Town - F-18" },
    { title: "Fateh Jang Road" },
    { title: "FECHS" },
    { title: "Federal Government Employees Housing Foundation" },
    { title: "Frash Town" },
    { title: "G-10" },
    { title: "G-11" },
    { title: "G-12" },
    { title: "G-13" },
    { title: "G-14" },
    { title: "G-15" },
    { title: "G-16" },
    { title: "G-17" },
    { title: "G-6" },
    { title: "G-7" },
    { title: "G-8" },
    { title: "G-9" },
    { title: "Gandhara City" },
    { title: "Garden Town" },
    { title: "Ghauri Town" },
    { title: "Golra Mor" },
    { title: "Golra Road" },
    { title: "Green Avenue" },
    { title: "GT Road" },
    { title: "Gulberg" },
    { title: "Gulshan-e-Khudadad" },
    { title: "H-12" },
    { title: "H-13" },
    { title: "H-15" },
    { title: "I-10" },
    { title: "I-11" },
    { title: "I-12" },
    { title: "I-13" },
    { title: "I-14" },
    { title: "I-16" },
    { title: "I-8" },
    { title: "I-9" },
    { title: "IJP Road" },
    { title: "Islamabad - Murree Expressway" },
    { title: "Islamabad - Peshawar Motorway" },
    { title: "Islamabad Expressway" },
    { title: "Islamabad Golf City" },
    { title: "Islamabad Highway" },
    { title: "Islamabad, Islamabad Capital" },
    { title: "Ittefaq Town" },
    { title: "J and K Zone 5" },
    { title: "Jagiot Road" },
    { title: "Jeddah Town" },
    { title: "Jhang Syedan" },
    { title: "Jhangi Syedan" },
    { title: "Jinnah Avenue" },
    { title: "Judicial Town" },
    { title: "Kahuta Road" },
    { title: "Karakoram Diplomatic Enclave" },
    { title: "Kashmir Highway" },
    { title: "Khanna Pul" },
    { title: "Khayaban-e-Iqbal" },
    { title: "Koral Chowk" },
    { title: "Koral Town" },
    { title: "Korang Road" },
    { title: "Korang Town" },
    { title: "Kuri Road" },
    { title: "Lawyers Society" },
    { title: "Lehtarar Road" },
    { title: "Madina Town" },
    { title: "Main Margalla Road" },
    { title: "Margalla Town" },
    { title: "Margalla Valley - C-12" },
    { title: "Marwa Town" },
    { title: "Meherban Colony" },
    { title: "Model Town" },
    { title: "Motorway Chowk" },
    { title: "Multi Residencia & Orchards" },
    { title: "Mumtaz City" },
    { title: "Murree Road" },
    { title: "National Police Foundation" },
    { title: "National Police Foundation O-9" },
    { title: "Naval Anchorage" },
    { title: "Naval Farms Housing Scheme" },
    { title: "Naval Housing Scheme" },
    { title: "Nazim-ud-din Road" },
    { title: "New Airport Town" },
    { title: "New Blue Area" },
    { title: "New Icon City" },
    { title: "New Shakrial" },
    { title: "Nova City" },
    { title: "Orchard Scheme" },
    { title: "PAEC Employees Cooperative Housing Society" },
    { title: "PAF Tarnol" },
    { title: "Pakistan Town" },
    { title: "Park Enclave" },
    { title: "Park Road" },
    { title: "Park View City" },
    { title: "PECHS" },
    { title: "Pind Begwal" },
    { title: "Pindorian" },
    { title: "Pir Sohawa" },
    { title: "Police Foundation Housing Society" },
    { title: "PTV Colony" },
    { title: "PWD Housing Scheme" },
    { title: "PWD Road" },
    { title: "Qutbal Town" },
    { title: "Raja Akhtar Road" },
    { title: "Rawal Enclave" },
    { title: "Rawal Town" },
    { title: "River Garden" },
    { title: "Royal Avenue" },
    { title: "Royal City" },
    { title: "Sangjani" },
    { title: "Sarai Kharbuza" },
    { title: "Sehala Farm House" },
    { title: "Shah Allah Ditta" },
    { title: "Shah Dara" },
    { title: "Shaheen Town" },
    { title: "Shahpur" },
    { title: "Shehzad Town" },
    { title: "Sihala" },
    { title: "Sihala Valley" },
    { title: "Simly Dam Road" },
    { title: "Soan Garden" },
    { title: "Sohan Valley" },
    { title: "Spring Valley" },
    { title: "Swan Garden" },
    { title: "Taramrri" },
    { title: "Tarlai" },
    { title: "Tarnol" },
    { title: "Thalian" },
    { title: "Thanda Pani" },
    { title: "The Organic Farms Islamabad" },
    { title: "The Springs" },
    { title: "Top City 1" },
    { title: "Tumair" },
    { title: "Victoria Heights" },
    { title: "Zaraj Housing Scheme" },
    { title: "Zero Point" },
    { title: "Zone 5" },
  ];

  if (isAuthenticated.isAuth == false) {
    return <Login />;
  } else {
    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Houses" {...a11yProps(0)} />
          <Tab label="Plots" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0} className={classes.panel}>
          <div className="house-menu">
            <div className="house-menu-left">
              <div>
                <h1 style={{ color: "black" }}>House Price Calculator</h1>
              </div>
              <div className="house-menu-inputs">
                <div className="house-menu-inputs-rows">
                  {/* AREA AND SEARCH BAR */}
                  <div className="house-menu-inputs-row-1">
                    <TextField
                      size="large"
                      id="standard-basic"
                      type="number"
                      name="area"
                      value={houseVars.area}
                      onChange={onChangeInputs}
                      variant="outlined"
                      label="Area Size"
                    />
                    <div>
                      <select
                        onChange={(e) => {
                          setHouseVars({ ...houseVars, size: e.target.value });
                        }}
                        name="size"
                        id="size"
                      >
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                      </select>
                    </div>
                  </div>
                  <Autocomplete
                    className="autocomplete-bar"
                    id="free-solo-demo"
                    onChange={(event, value) => {
                      setHouseVars({ ...houseVars, location: value });
                    }}
                    freeSolo
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="location"
                        value={houseVars.location}
                        onClick={onChangeInputs}
                        label="Location"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                {/* BATH */}
                <TextField
                  type="number"
                  size="large"
                  min="0"
                  oninput="validity.valid||(value='');"
                  name="bath"
                  value={houseVars.bath}
                  onChange={onChangeInputs}
                  id="standard-basic"
                  variant="outlined"
                  label="Bath(s)"
                />
                {/* BEDS */}
                <TextField
                  type="number"
                  size="large"
                  name="bed"
                  value={houseVars.bed}
                  onChange={onChangeInputs}
                  id="standard-basic"
                  variant="outlined"
                  label="Bed(s)"
                />
              </div>
            </div>
            <div className="house-menu-right">
              <Button
                variant="contained"
                color="primary"
                onClick={calculatePrice}
              >
                Calculate
              </Button>
              <div className="calculated-price">
                Calculated Price :
                {isLoading == false ? (
                  <span> {houseVars.price} PKR</span>
                ) : (
                  <CircularProgress
                    size="20px"
                    style={{ marginLeft: "80px" }}
                    disableShrink
                  />
                )}
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <span
                style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}
              >
                {houseVars.error}
              </span>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.panel}>
          <div>
            <div>
              <PredictedPlots />
            </div>
          </div>
        </TabPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    stock: state.stock,
  };
};
export default SimpleTabs;

import React, { Component } from "react";
import ReactApexCharts from "react-apexcharts";
import { withStyles } from "@material-ui/core/styles";
import fire from "../config/fire";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { GiConsoleController } from "react-icons/gi";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 300,
  },
});
export class PredictedPlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotAreas: [
        "AGHOSH",
        "AWT",
        "Airport Enclave",
        "Airport Green Garden",
        "Aiza Garden",
        "F-18",
        "B-17",
        "Bahria Enclave",
        "Bahria Garden City",
        "Bani Gala",
        "Bhara kahu",
        "Blue Area",
        "C-15",
        "C-16",
        "CBR Town",
        "E-16",
        "E-17",
        "H-13",
        "DHA Phase 5",
        "Chatha Bakhtawar",
        "Lehtarar Road",
        "D-12",
        "D-13",
        "D-18",
        "DHA Phase 1",
        "DHA Phase 2",
        "DHA Phase 3",
        "DHA Phase 4",
        "DHA Serene City",
        "E-11",
        "E-12",
        "Emaar Canyon Views",
        "Engineering Co-operative Housing",
        "F-10",
        "F-11",
        "F-14",
        "F-15",
        "F-16",
        "F-17",
        "F-7",
        "F-8",
        "FOECHS",
        "F-19",
        "Fateh Jang Road",
        "Fazaia Housing Scheme",
        "G-13",
        "G-14",
        "G-15",
        "G-16",
        "G-17",
        "Gandhara City",
        "Ghauri Town",
        "Gulberg Greens",
        "Gulberg Residencia",
        "Gulshan-e-Sehat",
        "Kashmir Highway",
        "I-10",
        "I-11",
        "I-12",
        "I-14",
        "I-15",
        "I-16",
        "ICHS",
        "Jinnah Gardens",
        "Korang Town",
        "MPCHS",
        "Margalla View Society",
        "Model Town",
        "Multi Residencia & Orchards",
        "Mumtaz City",
        "National Police Foundation",
        "Naval Anchorage",
        "Naval Farms",
        "Airport Town",
        "OPF Valley",
        "PAF Tarnol",
        "PECHS",
        "PWD",
        "Pakistan Town",
        "Thanda Pani",
        "Park Enclave",
        "Pir Sohawa",
        "Shaheen Town",
        "Shalimar Town",
        "Simly Dam Road",
        "D-17",
        "Soan Garden",
        "Top City 9",
        "Top City 8",
        "Top City 7",
        "Top City 6",
        "Top City 5",
        "Top City 4",
        "Top City 3",
        "Top City 1",
        "University Town",
      ],
      series: [
        {
          name: "Historical",
          data: [
            {
              x: 0,
              y: [],
            },
          ],
        },
      ],
      options: {
        colors: ["#247BA0", "#FF1654"],
        grid: {
          borderColor: "#f1f1f1",
        },
        chart: {
          type: "line",
          height: 1050,
        },
        datalabels: {},
        stroke: {
          width: 2,
        },
        title: {
          text: "Predicted Line Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
      area: "AGHOSH",
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    var histPlusPred = [];
    let myHistList = [];
    let myPredList = [];
    this.setState({
      isLoading: true,
    });
    fetch(
      `https://plotprediction.herokuapp.com/historical/?area=${this.state.area}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        Object.keys(responseData).map((date, index) => {
          myHistList.push({
            x: new Date(date),
            y: responseData[date],
          });
        });
      });

    fetch(
      `https://plotprediction.herokuapp.com/predictions/?area=${this.state.area}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        // let myPredList = [];
        Object.keys(responseData).map((date, index) => {
          myPredList.push({
            x: new Date(date),
            y: responseData[date],
          });
        });

        histPlusPred.push(
          { name: "historical", data: myHistList },
          { name: "predicted", data: myPredList }
        );
        this.setState({
          series: histPlusPred,
          isLoading: false,
        });
      });
  };
  handleChange = (event) => {
    this.setState(
      {
        area: event.target.value,
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const { classes } = this.props;
    // (this.state.area)
    return (
      <div>
        <div
          className="plotAreas"
          style={{ height: "50px", zIndex: "0", marginBottom: "15px" }}
        >
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel
              style={{ height: "100px" }}
              id="demo-simple-select-outlined-label"
            >
              View Area
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.area}
              onChange={this.handleChange}
              // onClick={this.fetchData}
              label="Age"
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {this.state.plotAreas.map((options) => {
                return <MenuItem value={options}>{options}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="plot-graph">
          {this.state.isLoading == true ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                color: "black",
                textAlign: "center",
              }}
            >
              <span style={{ fontFamily: "Do Hyeon, sans-serif" }}>
                The Graph will be displayed in a Jiffy :)
              </span>
              <CircularProgress
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                size={60}
                disableShrink
              />
            </div>
          ) : (
            <ReactApexCharts
              options={this.state.options}
              series={this.state.series}
              type="line"
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PredictedPlots);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import fire from "../config/fire";
import "../StyleSheets/StockMainPage.css";
import ReactApexCharts from "react-apexcharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  tab: {
    backgroundColor: "white",
    color: "black",
  },
  container: {
    maxHeight: 440,
  },
});

export class PredictedStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      techArr: [],
      selectedValue: this.props.selector,
      mainCompanies: this.props.mainCompanies,
      page: 0,
      rowsPerPage: 10,
      isLoading: true,
      rows: [],
      value: "1",
      series: [
        {
          name: "Historical",
          data: [
            {
              x: 0,
              y: [],
              color: "black",
            },
          ],
        },
        {
          name: "Predicted",
          data: [
            {
              x: 0,
              y: [1],
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
    };
  }

  getHistoricalTableData = () => {
    let tableData = [];
    fire
      .database()
      .ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`)
      .limitToLast(30)
      .on("value", (snapshot) => {
        snapshot.forEach((openSnapShot) => {
          var val = openSnapShot.val();
          const ros = {
            open: val.Open,
            high: val.High,
            low: val.Low,
            close: val.Close,
            change: val.Change,
            volume: val.Volume,
            date: val.Date,
          };
          tableData.push(ros);
        });
        this.setState({
          rows: tableData,
        });
      });
  };

  getHistoricalGraphData = () => {
    let data = [];
    fire
      .database()
      .ref(`historicaldatafyp-default-rtdb/Stocks/${this.state.selectedValue}`)
      .limitToLast(30)
      .on("value", (snapshot) => {
        snapshot.forEach((openSnapShot) => {
          var val = openSnapShot.val();
          let data1 = [];
          data1.push(val.Close);
          data.push({
            x: new Date(val.Date),
            y: data1,
          });
        });
        this.setState({
          ...this.state.series,
          series: [
            {
              name: "Historical",
              data: data,
            },
          ],
        });
      });
  };
  getPredictedStockData = () => {
    //need array of objects data = [{x:date,y:price}]
    fetch(
      `https://ml-stock.herokuapp.com/predictions/?Ticker=${this.state.selectedValue}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        let myList = [];
        Object.keys(responseData).map((date, index) => {
          myList.push({
            x: new Date(date),
            y: responseData[date],
          });
        });
        //historical prices
        var hist = this.state.series[0];
        var histPluspred = [];
        //history + Predictions
        histPluspred.push(hist, { name: "Predicted", data: myList });
        this.setState({
          ...this.state.series,
          series: histPluspred,
          isLoading: false,
        });
      });
  };
  componentDidMount() {
    this.getHistoricalGraphData();
    this.getPredictedStockData();
    this.getTechnicalAnalysis();
  }
  getTechnicalAnalysis = () => {
    var arr = [];
    fetch(
      `https://ml-stock.herokuapp.com/technical/?Ticker=${this.state.selectedValue}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        Object.keys(responseData).forEach((i) => {
          arr.push(responseData[i]);
        });
        this.setState({
          techArr: arr,
        });
      });
  };
  handleRadioChange = (event) => {
    this.setState(
      {
        ...this.state.selectedValue,
        selectedValue: event.target.value,
        isLoading: true,
      },
      () => {
        this.getHistoricalGraphData();
        this.getPredictedStockData();
        this.getTechnicalAnalysis();
        // this.getHistoricalTableData()
      }
    );

    // this.forceUpdate()
  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className="stock-graph">
          <ReactApexCharts
            options={this.state.options}
            series={this.state.series}
            type="line"
          />
          <div className="stock-radio-buttons">
            {this.state.mainCompanies.map((row, index) => {
              return (
                <label>
                  <Radio
                    checked={this.state.selectedValue === row}
                    onChange={this.handleRadioChange}
                    value={row}
                    name="radio-button-demo"
                    inputProps={{ "aria-label": row }}
                    color="primary"
                  />
                  {row}
                </label>
              );
            })}
          </div>
          <div className="techinalAnal-table">
            <table>
              <h1>Technical Analysis</h1>
              <tr className="techAnalysis-row">
                <th>Name</th>
                <th>Action</th>
              </tr>
              <tr className="techAnalysis-row">
                <td>RSI Calculation</td>

                <td>
                  {this.state.isLoading == true ? (
                    <CircularProgress size={20} />
                  ) : (
                    this.state.techArr[2]
                  )}
                </td>
              </tr>
              <tr className="techAnalysis-row">
                <td>On-Balance Volume</td>
                <td>
                  {this.state.isLoading == true ? (
                    <CircularProgress size={20} />
                  ) : (
                    this.state.techArr[1]
                  )}
                </td>
              </tr>
              <tr className="techAnalysis-row">
                <td>MACD Calculation</td>
                <td>
                  {this.state.isLoading == true ? (
                    <CircularProgress size={20} />
                  ) : (
                    this.state.techArr[0]
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PredictedStock);

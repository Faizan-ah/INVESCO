import React, { Component } from "react";
import Header from "./Header";
import ReactToPrint from "react-to-print";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import fire from "../config/fire";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
class Example extends React.Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {/*############################################## Header ############################################## */}
        <Header />
        <div></div>
        <ReactToPrint
          trigger={() => (
            <div
              style={{
                width: "10%",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "1%",
                // border: "1px solid black",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  textAlign: "center",
                }}
              >
                Print Report!
              </Button>
            </div>
          )}
          content={() => this.componentRef}
        />
        <Favourites ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "0",
      isLoading: true,
      rowsPerPage: "10",
      rows: [],
      companyName: [],
      company: {
        apl: {
          name: "apl",
          category: "oil",
          open: "20",
          high: "20",
        },
        acpl: {
          name: "acpl",
          category: "oil",
          open: "40",
          high: "30",
        },
      },
      subscribed: [],
    };
  }
  componentDidMount() {
    this.getSubscriptions();
  }
  getSubscriptions = async () => {
    const isAuthenticated = localStorage.getItem("uid");
    if (isAuthenticated == null) {
      this.props.history.push("/login");
    } else {
      const uid = localStorage.getItem("uid");
      const user = await fire
        .database()
        .ref("Users/" + uid)
        .once("value");
      //key
      const userData = user.val()[Object.keys(user.val())[0]];
      this.setState({
        subscribed:
          userData.subscriptions == null ? [] : userData.subscriptions,
      });
    }
    console.log("subscribed companies", this.state.subscribed);
    let tableData = [];
    let compName = [];
    this.state.subscribed.map((title) => {
      fire
        .database()
        .ref(`historicaldatafyp-default-rtdb/Stocks/${title}`)
        .limitToLast(1)
        .on("value", (snapshot) => {
          snapshot.forEach((openSnapShot) => {
            var val = openSnapShot.val();
            const ros = {
              name: title,
              open: val.Open,
              high: val.High,
              low: val.Low,
              close: val.Close,
              change: val.Change,
              volume: val.Volume,
              date: val.Date,
            };
            const nam = {
              name: title,
            };
            compName.push(nam);
            tableData.push(ros);
          });
          this.setState({
            rows: tableData,
            companyName: compName,
            isLoading: false,
          });
        });
      console.log("asd", this.state.rows);
      // console.log('comp', this.state.companyName)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Favourites</h1>
        <div className="stock-table">
          <TableContainer>
            <Table
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Companies</TableCell>
                  <TableCell align="right">OPEN</TableCell>
                  <TableCell align="right">HIGH</TableCell>
                  <TableCell align="right">LOW</TableCell>
                  <TableCell align="right">CLOSE</TableCell>
                  <TableCell align="right">CHANGE</TableCell>
                  <TableCell align="right">VOLUME</TableCell>
                  <TableCell align="right">DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.isLoading == true ? (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      height: "50px",
                    }}
                  >
                    <CircularProgress
                      style={{ marginLeft: "300%" }}
                      disableShrink
                    />
                  </div>
                ) : (
                  this.state.rows.map((row, index) => {
                    console.log("asdasdasd", this.state.subscribed[index]);
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Link
                            to={{
                              pathname: "/StockPrediction",
                              state: this.state.subscribed[index],
                            }}
                            size="50"
                          >
                            {this.state.subscribed[index]}
                          </Link>
                        </TableCell>

                        <TableCell align="right">{row.open}</TableCell>
                        <TableCell align="right">{row.high}</TableCell>
                        <TableCell align="right">{row.low}</TableCell>
                        <TableCell align="right">{row.close}</TableCell>
                        <TableCell align="right">{row.change}</TableCell>
                        <TableCell align="right">{row.volume}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                      </TableRow>
                    );
                    // }
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Example);

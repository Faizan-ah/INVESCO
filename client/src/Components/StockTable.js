import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import fire from "../config/fire";
import CircularProgress from "@material-ui/core/CircularProgress";
import Login from "../Login";
const useStyles = {
  table: {
    // minWidth: '50%',
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
  },
};

class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [
        "ACPL",
        "AGHA",
        "APL",
        "ASC",
        "ASTL",
        "ATRL",
        "BOP",
        "BYCO",
        "DCL",
        "DOL",
        "EFERT",
        "EPCL",
        "FCCL",
        "FFBL",
        "FFL",
        "GAIL",
        "GGL",
        "GTYR",
        "HASCOL",
        "HBL",
        "HUBC",
        "HUMNL",
        "ICL",
        "ISL",
        "KAPCO",
        "KEL",
        "MDTL",
        "PIAA",
        "PRL",
        "PSMC",
        "SAZEW",
        "SILK",
        "SNGP",
        "TELE",
        "TRG",
        "UNITY",
      ],
      rows: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getLatestData();
  }
  getLatestData = () => {
    let data = [];

    fire
      .database()
      .ref(`historicaldatafyp-default-rtdb/Stocks/`)
      .on("value", (snapshot) => {
        var qwe = [];
        snapshot.forEach((ss) => {
          var val = ss.val();
          let x = Object.keys(val);
          let lastVal = val[x[x.length - 1]];
          qwe.push(lastVal);
        });
        this.setState({
          ...this.state,
          rows: qwe,
          isLoading: false,
        });
      });
  };
  createData = (name, calories, fat, carbs, protein, A, B) => {
    return { name, calories, fat, carbs, protein, A, B };
  };
  sendValue = (row) => {
    this.props.stockReducerValue(row.name);
    this.getLatestData();
    return;
  };
  render() {
    const isAuthenticated = this.props.user.isAuth;
    const { classes } = this.props;
    if (!isAuthenticated) {
      return <Login />;
    } else {
      return (
        <div>
          <Header />
          <div className="stock-main-heading">
            <h1>STOCK TABLE</h1>
          </div>
          <div className="stock-table">
            <TableContainer>
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
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <Link
                              to={{
                                pathname: "/StockPrediction",
                                state: this.state.companies[index],
                              }}
                              size="50"
                              onClick={this.sendValue.bind(this, row)}
                            >
                              {this.state.companies[index]}
                            </Link>
                          </TableCell>
                          <TableCell align="right">{row.Open}</TableCell>
                          <TableCell align="right">{row.High}</TableCell>
                          <TableCell align="right">{row.Low}</TableCell>
                          <TableCell align="right">{row.Close}</TableCell>
                          <TableCell align="right">{row.Change}</TableCell>
                          <TableCell align="right">{row.Volume}</TableCell>
                          <TableCell align="right">{row.Date}</TableCell>
                        </TableRow>
                      );
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
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    stock: state.stock,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    stockReducerValue: (value) => {
      dispatch({
        type: "UPDATE_INPUT",
        payload: value,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(StockTable));

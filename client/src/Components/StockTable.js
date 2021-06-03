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

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import readXlsxFile from "read-excel-file";
import fs from "fs";

const useStyles = (theme) => ({
  table: {
    // minWidth: '50%',
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
  },
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

class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "ALL COMPANIES",
      category: [
        "ALL COMPANIES",
        "OIL AND GAS",
        "POWER",
        "BANKS",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "CEMENT",
        "CHEMICAL",
        "TECHNOLOGY & COMMUNICATION",
        "ENGINEERING",
        "FERTILIZER",
        "FOOD & PERSONAL CARE PRODUCTS",
        "REFINERY",
      ],
      excel: [
        "CEMENT",
        "ENGINEERING",
        "OIL AND GAS",
        "FOOD & PERSONAL CARE PRODUCTS",
        "ENGINEERING",
        "REFINERY",
        "BANKS",
        "REFINERY",
        "CEMENT",
        "CHEMICAL",
        "FERTILIZER",
        "CHEMICAL",
        "CEMENT",
        "FERTILIZER",
        "FOOD & PERSONAL CARE PRODUCTS",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "CHEMICAL",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "OIL AND GAS",
        "BANKS",
        "POWER",
        "TECHNOLOGY & COMMUNICATION",
        "CHEMICAL",
        "ENGINEERING",
        "POWER",
        "POWER",
        "TECHNOLOGY & COMMUNICATION",
        "Type",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "REFINERY",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "AUTOMOBILE, TRANSPORT AND ACCESSORIES",
        "BANKS",
        "OIL AND GAS",
        "TECHNOLOGY & COMMUNICATION",
        "TECHNOLOGY & COMMUNICATION",
        "FOOD & PERSONAL CARE PRODUCTS",
      ],
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
      temp: [],
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
  handleChange = (event) => {
    this.setState(
      {
        cat: event.target.value,
      },
      () => {
        var temps = [];
        for (let i in this.state.excel) {
          if (this.state.excel[i] == this.state.cat) {
            temps.push(i);
          }
        }
        this.setState({
          temp: temps,
        });
      }
    );
  };
  render() {
    console.log("category", this.state.cat);
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
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel
              style={{ height: "100px" }}
              id="demo-simple-select-outlined-label"
            >
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.cat}
              onChange={this.handleChange}
              // onClick={this.fetchData}
              label="Category"
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {this.state.category.map((options) => {
                return <MenuItem value={options}>{options}</MenuItem>;
              })}
            </Select>
          </FormControl>
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
                      console.log(index, "asdasd", this.state.temp);
                      if (
                        this.state.temp.includes(index.toString()) ||
                        this.state.temp.length == 0
                      ) {
                        console.log("asdasdasd");
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
                      }
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

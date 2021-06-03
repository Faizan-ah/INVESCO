import React from "react";
import "../StyleSheets/Header.css";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import fire from "../config/fire";
import * as RiIcon from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { SidebarData } from "./SidebarData";
// import Popover from 'react-awesome-popover'

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import NotificationsIcon from "@material-ui/icons/Notifications";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = () => ({
  list: {
    width: 10,
  },
  fullList: {
    width: "0",
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      homescreen: false,
      right: false,
      anchorEl: null,
      data: [],
      tempData: [],
      loading: true,
      delArray: [],
    };
  }
  async componentDidMount() {}
  getData = async () => {
    const uid = localStorage.getItem("uid");
    fire.database().ref("historicaldatafyp-default-rtdb/Stocks/");
    const user = await fire
      .database()
      .ref("Users/" + uid)
      .once("value");
    //key

    const userData = user.val()[Object.keys(user.val())[0]];
    var temp = [];
    for (let i in userData.subscriptions) {
      //company name
      // console.log(userData.subscriptions[i])
      //latest value
      const lastval = await fire
        .database()
        .ref(
          `historicaldatafyp-default-rtdb/Stocks/${userData.subscriptions[i]}`
        )
        .limitToLast(1)
        .once("value");
      var notif = "";
      if (lastval != undefined) {
        for (let j in lastval.val()) {
          const Close = lastval.val()[j].Close;
          const Date = lastval.val()[j].Date;
          const Open = lastval.val()[j].Open;
          const High = lastval.val()[j].High;
          const Low = lastval.val()[j].Low;
          notif =
            userData.subscriptions[i] +
            ": OHLC for " +
            Date +
            " is " +
            " O:" +
            Open +
            " H:" +
            High +
            " L:" +
            Low +
            " C:" +
            Close;
        }
        temp.push(notif);
        fire
          .database()
          .ref("Users/" + uid)
          .once("value", (snap) => {
            snap.forEach((doc) => {
              fire
                .database()
                .ref("Users/" + uid + "/" + doc.key)
                .update({
                  Notifications: temp,
                });
            });
          });
        // this.setState({
        //     data:temp
        // })
      }
      var notifications = userData.Notifications;
      notifications.reverse();

      this.setState({
        ...this.state,
        tempData: notifications,
      });
    }
  };

  saveInOriginal = async () => {
    const isAuthenticated = this.props.user.isAuth;
    if (!isAuthenticated) {
      console.log("");
    } else {
      this.setState({
        data: this.state.tempData,
        loading: false,
      });

      const uid = localStorage.getItem("uid");
      const user = await fire
        .database()
        .ref("Users/" + uid)
        .once("value");
      //key
      const userData = user.val()[Object.keys(user.val())[0]];

      var arr = [];
      for (let i in this.state.data) {
        for (let j in userData.RemovedNotifications)
          var arr = this.state.data.filter((e) => {
            if (this.state.data[i] === userData.RemovedNotifications[j]) {
              return false;
            } else {
              return true;
            }
          });
      }
    }
  };

  handleClick = async (event) => {
    this.setState({ anchorEl: event.currentTarget });
    await this.getData();
    await this.saveInOriginal();
    await this.onCloseClick();

    // this.handleClick();
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ ...this.state, [anchor]: open });
  };

  showSideBar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
      homescreen: !this.state.homescreen,
    });
    // this.props.checkSide(this.state.sidebar)
    this.props.data(this.state.homescreen);
    this.props.dataSide(this.state.sidebar);
  };

  logout() {
    fire.auth().signOut();
    localStorage.removeItem("uid");
  }

  list = (anchor) => (
    <div
      className="asd"
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {[
          "Change Email",
          "Change Password",
          "View History",
          "Delete Account",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  onCloseClick = async (index) => {
    const userID = localStorage.getItem("uid");

    var temp = this.state.delArray;

    const delVal = this.state.data.filter((e, i) => {
      return i == index;
    });
    temp = [...temp, ...delVal];
    this.setState({
      delArray: temp,
    });
    const newArr = this.state.data.filter((e, i) => {
      return i !== index;
    });

    //setting state
    this.setState({
      data: newArr,
    });
    //setting database
    await fire
      .database()
      .ref("Users/" + userID)
      .once("value", (snap) => {
        snap.forEach((doc) => {
          fire
            .database()
            .ref("Users/" + userID + "/" + doc.key)
            .update({
              Notifications: newArr,
              // RemovedNotifications: delVal
            });
        });
      });

    await fire
      .database()
      .ref("Users/" + userID)
      .once("value", (snap) => {
        snap.forEach((doc) => {
          fire
            .database()
            .ref("Users/" + userID + "/" + doc.key)
            .update({
              RemovedNotifications: this.state.delArray,
            });
        });
      });
  };

  render() {
    return (
      <div>
        <ul className="topbar">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link onClick={this.handleClick}>
              <NotificationsIcon />
            </Link>
          </li>

          <li>
            <Link to="/" onClick={this.logout}>
              <RiIcon.RiLogoutBoxLine size={29} />
            </Link>
          </li>
          <li onClick={this.toggleDrawer("right", true)}>
            <Link to="#">
              <RiUserSettingsFill size="30px" color="white" />
            </Link>
          </li>
        </ul>
        <div>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            className="notificationMenu"
          >
            {this.state.loading == true ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  height: "50px",
                  width: "320px",
                }}
              >
                <CircularProgress style={{}} disableShrink />
              </div>
            ) : this.state.data.length > 0 ? (
              this.state.data.map((key, index) => {
                return (
                  <div>
                    <div className="notifications" name={index} key={index}>
                      <p>{key}</p>
                      <CloseIcon
                        fontSize="small"
                        style={{ marginTop: "20px" }}
                        onClick={() => this.onCloseClick(index)}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  height: "50px",
                  width: "320px",
                }}
              >
                You don't have any notifications
              </div>
            )}
          </Menu>
        </div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={this.state[anchor]}
              onClose={this.toggleDrawer(anchor, false)}
              onOpen={this.toggleDrawer(anchor, true)}
            >
              <div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <BiArrowBack
                      style={{ marginTop: "2", cursor: "pointer" }}
                      size={30}
                      onClick={this.toggleDrawer(anchor, false)}
                    />
                  </div>
                  <div>Account Settings</div>
                </div>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </div>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
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
export default connect(mapStateToProps)(withStyles(useStyles)(Header));

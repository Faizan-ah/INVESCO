import React from 'react';
import '../StyleSheets/Header.css';
import {RiUserSettingsFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import fire from '../config/fire'
import * as RiIcon from 'react-icons/ri'
import {BiArrowBack} from 'react-icons/bi'
import {SidebarData} from './SidebarData'
// import Popover from 'react-awesome-popover'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
const useStyles = ()=>({
    list: {
      width: 10,
    },
    fullList: {
      width: '0',
    },
  });


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            sidebar:false,
            homescreen:false,
            right:false,
            anchorEl: null,
            data : ["SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "PEL: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "PEL: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            ]
        }
        console.log("qwe",this.state.homescreen)
    }

    handleClick = (event) => {
        console.log('asdasdasdasdasd')
        this.setState({anchorEl:event.currentTarget})
      };
      handleClose = () => {
        console.log('asdasdasdasdasqweqwed')
        this.setState({anchorEl:null});
      };

    toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state, [anchor]: open });
      };

    showSideBar= ()=>{
        this.setState({
            sidebar:!this.state.sidebar,
            homescreen:!this.state.homescreen
        })
        // this.props.checkSide(this.state.sidebar)
        console.log('in header sidebar', this.state.sidebar)
        this.props.data(this.state.homescreen)
        this.props.dataSide(this.state.sidebar)
    }
  
    logout() {
        fire.auth().signOut();
        console.log('you are logged out')
    }

    list = (anchor) => (
        <div
          className = 'asd'
          role="presentation"
          onClick={this.toggleDrawer(anchor, false)}
          onKeyDown={this.toggleDrawer(anchor, false)}
        >
          <List>
          
            {['Change Email', 'Change Password', 'View History', 'Delete Account'].map((text, index) => (
              <ListItem button key={text}>
                 
                <ListItemText primary={text} />
              </ListItem>
             
            ))}
             
          </List>
          <Divider />
         
        </div>
      );

      onCloseClick = (index)=>{
        const newArr = this.state.data.filter((e,i) => {
            return i!==index
        } ) 
        this.setState({
            data: newArr    
        })  
        console.log(newArr)
        }

         
    render(){
        console.log(this.state.anchorEl)
        return(
            <div>
               <ul className="topbar">
                   <li><Link to="/Home">Home</Link></li>
                   <li><Link onClick={this.handleClick}><NotificationsIcon/></Link></li>
                   
                   <li><Link to="/" onClick={this.logout}><RiIcon.RiLogoutBoxLine size={29}/></Link></li> 
                   <li onClick={this.toggleDrawer('right',true)}><Link to="#"><RiUserSettingsFill size='30px' color="white" /></Link></li>
               </ul>
               <div>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        className='notificationMenu'
                        >
                        {this.state.data.map((key,index)=>{
                            return(
                                <div>
                                    <div className="notifications" name={index} key={index}>
                                        <p>{key}</p>
                                        <CloseIcon 
                                            fontSize='small' 
                                            style={{marginTop:'20px'}} 
                                            onClick={()=>this.onCloseClick(index)}
                                        />
                                    </div>
                                
                                </div>
                                
                                
                            )
                        })}
                        {/* <div className="notifications">SNGP: OHLC for today is O:200 H:320 L:212 C: 212</div>
                        <div className="notifications">PEL: OHLC for today is O:200 H:320 L:212 C: 212</div>
                        <div className="notifications">KAPCO: OHLC for today is O:200 H:320 L:212 C: 212</div> */}
                            {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}
                    </Menu>
                    </div>
                        {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={this.state[anchor]}
                                onClose={this.toggleDrawer(anchor, false)}
                                onOpen={this.toggleDrawer(anchor, true)}
                            >
                                <div>
                                    <div style={{textAlign:'center', fontSize:'25px', marginBottom:'10px',display:'flex',flexDirection:'row', justifyContent:'space-evenly', marginTop:'10px'}}>
                                    <div>
                                    <BiArrowBack style={{marginTop:'2',cursor:'pointer'}} size={30} onClick={this.toggleDrawer(anchor,false)}/>
                                    </div>
                                    <div>
                                    Account Settings 
                                    </div>
                                       
                                    </div>
                                {SidebarData.map((item,  index)=>{
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                                </div>
                            </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                        
            </div>
        );
    
    }
}
export default withStyles(useStyles)(Header);
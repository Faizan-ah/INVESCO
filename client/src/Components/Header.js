import React from 'react';
import '../StyleSheets/Header.css';
import {RiUserSettingsFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import fire from '../config/fire'
// import * as FaIcon from 'react-icons/fa'
// import * as AiIconX from 'react-icons/ai'
import * as RiIcon from 'react-icons/ri'


import {SidebarData} from './SidebarData'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sidebar:false,
            homescreen:false
        }
        console.log("qwe",this.state.homescreen)
    }

    showSideBar= ()=>{
        
        this.setState({
            sidebar:!this.state.sidebar,
            homescreen:!this.state.homescreen
        })
        this.props.data(this.state.homescreen)
    }

    logout() {
        fire.auth().signOut();
        console.log('you are logged out')
    }
    
    render(){
        return(
            <div>
               <ul className="topbar">
                   <li><Link to="/Home">Home</Link></li>
                   <li><Link to="/news">News</Link></li>
                   <li><Link to="/contact">Contact</Link></li>
                   <li><Link to="/" onClick={this.logout}><RiIcon.RiLogoutBoxLine size={29}/></Link></li>
                   <li onClick={this.showSideBar}><Link to="#"><RiUserSettingsFill size='30px' color="white" /></Link></li>
               </ul>

               <nav className={this.state.sidebar ? 'nav-menu active': 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={this.showSideBar}>
                        <li className='navbar-toggle'>
                            <Link to="#" className="menu-bars">
                                <span>Account Settings</span>
                            </Link>
                            
                        </li>
                        {
                            SidebarData.map((item,  index)=>{
                                return(
                                    <li key={index} className={item.cName}>
                                        {/* <div onClick={item.onClick}> */}
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        {/* </div> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
               </nav>
            </div>
        );
    
    }
}
export default Header;
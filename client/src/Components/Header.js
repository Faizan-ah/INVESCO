import React from 'react';
import '../StyleSheets/Header.css';
import {RiUserSettingsFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import fire from '../config/fire'
import * as RiIcon from 'react-icons/ri'
import {BiArrowBack} from 'react-icons/bi'
import {SidebarData} from './SidebarData'
// import Popover from 'react-awesome-popover'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            sidebar:false,
            homescreen:false,
            anchorEl:false,
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
        console.log('qwerty',this.state.anchorEl)
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
                                <div id="back-arrow"><BiArrowBack size={25} /></div>
                                
                                <span>User Account</span>
                            </Link>
                        </li>
                        {
                            SidebarData.map((item,  index)=>{
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
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
import React from 'react';
import '../StyleSheets/Header.css';
import {RiUserSettingsFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Header (){
    
        return(
            <div>
               <ul>
                   <li><Link to="/Home">Home</Link></li>
                   <li><Link to="/news">News</Link></li>
                   <li><Link to="/contact">Contact</Link></li>
                   <li><Link to="/login"><RiUserSettingsFill size='30px' color="white"/></Link></li>
                   
               </ul>
            </div>
        );
    
}
export default Header;
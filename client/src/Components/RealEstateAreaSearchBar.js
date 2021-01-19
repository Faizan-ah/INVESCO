import React, { Component } from 'react'
import {AreaSidebarData} from './AreaSidebarData'
import {Link} from 'react-router-dom'
import '../StyleSheets/AreaSidebar.css'
import * as FaIcon from 'react-icons/fa'
export class RealEstateAreaSearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSearchbar:false,
            searchFeild: '',
        }
    }

    showSearchSidebar = () =>{
        this.setState({
            showSearchbar:!this.state.showSearchbar
        })
    }

    render() {
        const buttonStyle = {
            display : this.state.showSearchbar ? 'none':'block',
        }
        return (
            <div>
                <div className="area-button" id="areaButton" style={buttonStyle} onClick={this.showSearchSidebar}>
                    <Link to="#" className="area-bars">
                            <FaIcon.FaBars/>
                            <span>View Areas</span>
                    </Link>
                </div>
                <nav className= {this.state.showSearchbar ? "area-nav active": 'area-nav'}>
                    
                    <ul className= 'area-nav-item-holder' >
                        <li className='area-toggle' onClick={this.showSearchSidebar}>
                            <Link t0="#" className="area-bars">
                                <FaIcon.FaBars/>
                                <span>View Areas</span>
                            </Link>
                            
                        </li>
                        <input 
                            type="Search" 
                            className='search-bar'
                            placeholder="Search.." 
                            onChange={(e)=>{
                                this.setState({
                                    searchFeild: e.target.value
                                })
                            }}
                        >
                        </input>
                        {
                            AreaSidebarData.filter((val)=>{
                                if(this.state.searchFeild == ''){
                                    return val
                                }
                                else if(val.title.toLowerCase().includes(this.state.searchFeild.toLowerCase())){
                                    return val
                                }
                            }).map((index , id)=>{
                                return(
                                    <li key={id} className={index.cName}>
                                        <Link to={index.path}>
                                            <span className='span-text'>{index.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default RealEstateAreaSearchBar

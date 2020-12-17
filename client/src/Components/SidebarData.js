import React from 'react';
import * as FaIcon from 'react-icons/fa'
import * as AiIcon from 'react-icons/ai'
import * as RiIcon from 'react-icons/ri'
export const SidebarData = [
    {
        title:"Change Email",
        path:"#",
        icon: <AiIcon.AiOutlineMail/>,
        cName: 'nav-text'
    },
    {
        title:"Change Password",
        path:"#",
        icon: <RiIcon.RiLockPasswordLine/>,
        cName: 'nav-text'
    },
    {
        title:"View History",
        path:"#",
        icon: <AiIcon.AiOutlineHistory/>,
        cName: 'nav-text'
    },
    {
        title:"Delete Account",
        path:"#",
        icon: <RiIcon.RiAccountCircleLine/>,
        cName: 'nav-text'
    },
    {
        title:"Logout",
        path:"/",
        icon: <RiIcon.RiLogoutBoxLine/>,
        cName: 'nav-text'
    },
]
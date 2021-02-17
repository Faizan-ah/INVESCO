import React from 'react';
import * as AiIcon from 'react-icons/ai'
import * as RiIcon from 'react-icons/ri'
import ChangeEmail from './ChangeEmail'

export const SidebarData = [
    {
        title:"Change Email",
        path:"/ChangeEmail",
        icon: <AiIcon.AiOutlineMail/>,
        cName: 'nav-text'
    },
    {
        title:"Change Password",
        path:"/ChangePassword",
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
        cName: 'nav-text',
        // onClick: thisisLogout
    },
]
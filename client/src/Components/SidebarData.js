import React from 'react';
import * as AiIcon from 'react-icons/ai'
import * as RiIcon from 'react-icons/ri'

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
        path:"/History",
        icon: <AiIcon.AiOutlineHistory/>,
        cName: 'nav-text'
    },
    {
        title:"Delete Account",
        path:"/DeleteAccount",
        icon: <RiIcon.RiAccountCircleLine/>,
        cName: 'nav-text'
    },
    
]
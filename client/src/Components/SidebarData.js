import React from "react";
import * as AiIcon from "react-icons/ai";
import * as RiIcon from "react-icons/ri";

export const SidebarData = [
  {
    title: "Change Email",
    path: "/ChangeEmail",
    icon: <AiIcon.AiOutlineMail />,
    cName: "nav-text",
  },
  {
    title: "Change Password",
    path: "/ChangePassword",
    icon: <RiIcon.RiLockPasswordLine />,
    cName: "nav-text",
  },
  {
    title: "Delete Account",
    path: "/DeleteAccount",
    icon: <AiIcon.AiOutlineUserDelete />,
    cName: "nav-text",
  },
  {
    title: "Favourites",
    path: "/Favourites",
    icon: <RiIcon.RiStarLine />,
    cName: "nav-text",
  },
];

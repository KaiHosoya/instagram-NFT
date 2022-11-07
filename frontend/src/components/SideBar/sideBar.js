import React from "react";
import { useNavigate } from "react-router-dom"

import "./sideBar.css"

import { Avatar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SideBar = () => {
const navigate = useNavigate();

  const SideBarData = [
    {
      title: "ホーム",
      icon: <HomeIcon />,
      link: "/"
    },
    {
      title: "投稿",
      icon: <AddAPhotoIcon />,
      link: "/post"
    },
    {
      title: "プロフィール",
      icon: <AccountBoxIcon />,
      link: "/profile"
    }
  ]

  return (
    <div className="Sidebar">
      <div className="profile">
        {/* アイコン画像とメアド */}
        <Avatar src="https://fontmeme.com/permalink/221107/9bdea4ed9cb8ace3e9b75c8c78854a43.png" />
        {/* <p className="profileName">chaichai</p> */}
        {/* <p className="profileName">{ currentUser?.name }</p> */}
      </div>
      <ul className="SidebarList">
        {SideBarData.map((value, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              className="row"
              onClick={() => {
                navigate(value.link)
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default SideBar;
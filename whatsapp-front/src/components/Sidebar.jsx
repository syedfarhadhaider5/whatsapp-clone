import React from 'react'
import "./Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className='Sidebar'>
       <div className="sidebar_header">
          <div className="sidebar_left">
              <Avatar src='/images/syedbadshah.jpg' />
          </div>
          <div className="sidebar_right">
              <IconButton>
                  <DonutLargeIcon />
              </IconButton>
              <IconButton>
                  <ChatIcon />
              </IconButton>
              <IconButton>
                  <MoreVertIcon />
              </IconButton>
          </div>
       </div>
       <div className='sidebar_search'>
            <div className='sidebar_search_container'>
                <SearchIcon />
                <input type="search" placeholder='Search or new chat' />
            </div>
       </div>
       <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
       </div>
    </div>
  )
}

export default Sidebar
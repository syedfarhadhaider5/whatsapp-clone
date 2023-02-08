import { Avatar } from '@mui/material';
import React from 'react'
import "./SidebarChat.css";

function SidebarChat() {
  return (
    <div className='SidebarChat'>
        <Avatar />
        <div className="sidebar_chat_info">
            <h2>Ali</h2>
            <p>ok no issues</p>
        </div>
    </div>
  )
}

export default SidebarChat
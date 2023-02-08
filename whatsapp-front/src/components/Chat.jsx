import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import "./Chat.css";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MicIcon from '@mui/icons-material/Mic';
import axios from "../axious";

function Chat({messages}) {
  const [input, setInput] = useState("")
  const sendMessages = (e) =>{
      e.preventDefault();
      const dat =  new Date().toLocaleTimeString()
      axios.post("/messages/new",{
          name: "Syed",
          message: input,
          timestamp: dat,
          received: false,
      })
      setInput("");
  }
  return (
    <div className='Chat'>
      <div className="header">
          <Avatar />
          <div className="chat_header_info">
              <h3>Farhad Shah</h3>
              <p>last seen....</p>
          </div>
          <div className="chat_header_right">
          <IconButton>
                  <SearchIcon />
              </IconButton>
              <IconButton>
                  <AttachFileIcon />
              </IconButton>
              <IconButton>
                  <MoreVertIcon />
              </IconButton>
          </div>
      </div>
      <div className="chat_body">
        {
          messages.map((message) =>(
            <p className={`chat_message ${message.received && "chat_message_reciver"}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>
              {message.timestamp}
            </span> 
          </p>
          ))
        }
          
         
      </div>
      <div className="chat__footer">
            <TagFacesIcon />
            <form>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}  placeholder='Type a message'/>
                <button type='submit' onClick={(e) => sendMessages(e)}>send message</button>
            </form>
            <MicIcon />
      </div>
    </div>
  )
}

export default Chat
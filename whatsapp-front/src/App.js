import React, {useEffect, useState} from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Pusher from "pusher-js"
import "./App.css";
import axios from "./axious";
function App() {
  const [messages, Setmessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then(response => {
      Setmessages(response.data);

    })
   
  },[]);
  // please care take of this 
  useEffect(() => {
    const pusher = new Pusher('71d9378fae64d94c822e', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messageChanel');
    channel.bind('insertedEvent', function(data) {
    //  alert(JSON.stringify(data));
          Setmessages([...messages,data]);
    })
    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
  };
  },[messages]);
  console.log(messages);

  return (
    <div className='app'>
        <div className='app__body'>
           <Sidebar  />
           <Chat messages={messages} />
        </div>
    </div>
  )
}

export default App
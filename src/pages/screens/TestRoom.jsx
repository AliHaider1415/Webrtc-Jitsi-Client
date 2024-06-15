import React, { useRef, useEffect} from 'react';
import { json, useNavigate, useParams } from "react-router-dom";
import url from "../../utils/api";
import { JitsiMeeting } from '@jitsi/react-sdk';

export default function TestRoom() {
  const { id } = useParams();
  const connection = useRef(null)

  useEffect(() => {
    const socket = new WebSocket(`ws://${url}/ws/video/${id}/?token=${localStorage.getItem("access")}`)

    socket.addEventListener("open", (event) => {
      console.log("Connection Successful");
  
      socket.send(JSON.stringify({  // Gets all participants
        type: "get_participants"
      }))

    })

    socket.addEventListener("message", (event) => {
      handleSocketMessage(event.data);
    })

    socket.addEventListener("close", (event) => {
      console.log("Connection Closed")
    })

    connection.current = socket

    return () => connection.current.close()
  }, [])

  const handleSocketMessage = (message) => {
    if (message.type === "connection_msg"){
      console.log("Connection Success!")
    }

    else if(message.type === "get_participants"){
      console.log("All Participants: ", message.participants);
    }
  }

  const roomName = "Test Room 1";   // make it dynamic
  const domain = "meet.jit.si";     // Own server domain

  return (
    <div style = {{height: "100vh", display: "grid", flexDirection: "column"}}>
      <JitsiMeeting
      roomName = {roomName}
      displayName = {"Ali Haider"}
      domain = {domain}
      containerStyles = {{display: "flex", flex: 1}}
      
      />
    </div>
  )
}

import io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
const socket=io.connect("http://localhost:4000/")
function App(){
  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showFlag,setShowFlag]=useState(false)
  function handleJoin(){
      if(username&&room){
      socket.emit("join_meet",room)
      }
      setShowFlag(true)
  }
  return(
      <div>
        {!showFlag ?
        <div id="join-form">
          <h1 id="header">Join a meet</h1>
          <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} /><br></br>
          <input type="text" placeholder="Room" onChange={(e)=>setRoom(e.target.value)} value={room} /><br></br>
          <button onClick={()=>handleJoin()} className='btn btn-primary'>Join</button>
        </div>
          :<Chat username={username} room={room} socket={socket} />
        }
      </div>
  )
}
export default App;
   

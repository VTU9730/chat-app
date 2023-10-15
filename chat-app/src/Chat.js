import {useEffect, useState} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket,username,room}){
    const [message,setMessage]=useState("")
    const [messages,setMessages]=useState([])
    async function handleSend(){
        const currentMessage={
            room,username,message,time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getMilliseconds()
        }
        await socket.emit("send_message",currentMessage)
        setMessages((messages)=>[...messages,currentMessage])
        setMessage("")
    }
    useEffect(()=>{
        socket.on("receive",(data)=>{
            setMessages((messages)=>[...messages,data])
            console.log(messages);
        })
        console.log(messages);
    },[socket])
    return(
        <div id="chat-box">
            <div id="chat-header">
                <h2 id="header2">Live Chat</h2>
            </div>
            <div id="chat-body">
                <ScrollToBottom className='chat-boxx' mode="bottom">
                {messages&&messages.map(ele=>{
                    return(
                        <div>
                        <div key={ele.time} className={username===ele.username?"you":"other"}>
                            <p>{ele.message}</p><br></br>
                            
                        </div>
                        <div className={username===ele.username?"you1":"other1"}>
                        <p><span>{ele.time.slice(0,5)}</span> <strong><span>{ele.username}</span></strong></p>
                        </div>
                        
                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div id="chat-footer">
                <input type="text" placeholder="Message" onChange={(e)=>setMessage(e.target.value)} value={message} />
                <button onClick={()=>handleSend()} className='btn btn-info'>Send</button>
            </div>
        </div>
    )
}
export default Chat ;
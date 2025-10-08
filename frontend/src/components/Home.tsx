import { useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type message = {
    id: string,
    msg: string
}
const Home = () => {


    const [id, setId] = useState<string | null>(null);
    const socket = useRef<Socket | null>(null);
    const [sendtext, setSendtext] = useState<string>("");
    const [message, setMessage] = useState<message[]>([]);


    const ConnectSocket = async () => {
        if (socket.current) {
            console.log("Socket already connected");
            return;
        }
        socket.current = io('http://localhost:3000');

        socket.current.on('connect', () => {
            console.log('Connected to server');
            setId(socket.current?.id || null);
        });
        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
            setId(null);
        });
        socket.current.on('allmessages', (msgs: message[]) => {
            setMessage([...msgs]);
        });
        socket.current.on('message', (msg: message) => {
            setMessage((prev) => [...prev, msg]);
        });

    }

    const SendMessage = (message: string) => {
        if (socket.current?.connected) {
            socket.current.emit('message', message);
            setSendtext("");
        }
    }

    const DisconnectSocket = () => {
        socket.current?.disconnect();
        socket.current = null;
        setId(null);
        setMessage([]);
    }

    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', }}>
                {message.map((msg) => (
                    <li style={{ color: msg.id === id ? 'blue' : 'black', marginLeft: msg.id === id ? '50vw' : '0' }} key={msg.id}>{msg.msg} <sup>{msg.id?.slice(0, 4)}</sup></li>
                ))}
            </ul>
            <input style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' ,marginBottom:'10px'}} disabled={!id} type="text" placeholder="Type Message" id="messageInput" value={sendtext} onChange={(e) => setSendtext(e.target.value)} />
              <br />
            <button onClick={() => SendMessage(sendtext)}> Send Message </button>
            <button onClick={ConnectSocket}> Connect Socket </button>
            <button onClick={DisconnectSocket}> Disconnect Socket </button>
        </div>
    )

}

export default Home
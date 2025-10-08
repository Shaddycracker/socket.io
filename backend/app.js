import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:5173'];

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGINS,
        methods: ["GET", "POST"]
    }
});

const messages = [];

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        messages.push({ id: socket.id, msg });
        io.emit('allmessages', messages);
    });
}); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello World!'});
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

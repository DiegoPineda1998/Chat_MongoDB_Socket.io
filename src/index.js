//Requires
const path = require('path');
const morgan = require('morgan');
const engine = require('ejs-mate');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

//Initializations
require('./dbconnection');
const chat = require('./models/Schemachat');

//Settings
app.set('port', process.env.PORT || 5000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/', require('./routes/routes'));

//static files
app.use(express.static(path.join(__dirname , 'public')));

//Start the server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


//websocket
const io = socketIO(server);
io.on('connection', async(socket) => {
    console.log('new user connect');

    const allmessage = await chat.find();
    socket.emit('allmessage', allmessage);

    socket.on('input', async(message) => {
        const newmessage = new chat({
            user : message.user,
            message : message.message
        });
        await newmessage.save();
        
        //Emit all user connect
        io.sockets.emit('output', message);
    })
});
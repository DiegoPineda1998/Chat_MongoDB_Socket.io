//DB Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chat2mongodb', {useNewUrlParser: true})
    .then(db => console.log('DB CONNECTED'))
    .catch(err => console.log(err));
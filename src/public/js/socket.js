socket = io();

button = document.getElementById('sendmessage');
user = document.getElementById('user');
message = document.getElementById('message');

button.addEventListener('click', function() {
    socket.emit('input', {
        user : user.value,
        message : message.value
    });

    user.value = "";
    message.value = "";
});

socket.on('output', (message) => {
    console.log(message);

    onemessage = document.createElement('div');
    onemessage.innerHTML = `
        <div class="col-md-12">
            <div class="alert alert-info">
                <b><span class="text-primary">${message.user}</span></b>
                <span class="text-info">${message.message}</span>
            </div>
        </div>
    `;
    document.getElementById('chat').appendChild(onemessage);
});

socket.on('allmessage', (allmessage) => {
    allmessage.forEach(message => {
        onemessage = document.createElement('div');
        onemessage.innerHTML = `
            <div class="col-md-12">
                <div class="alert alert-info">
                    <b><span class="text-primary">${message.user}</span></b>
                    <span class="text-info">${message.message}</span>
                </div>
            </div>
        `;
        document.getElementById('chat').appendChild(onemessage);
    });
});
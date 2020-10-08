const messageTypes = {LEFT: 'left', RIGHT: 'right', LOGIN: 'login'};

//Chat stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messagesInput = document.getElementById('messagesInput');
const sendBtn = document.getElementById('sendBtn');

//Login Stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}

var socket = io();

socket.on('message', message => {
    //Update type of message based on username
    if(message.type !== messageTypes.LOGIN) {
        if (message.author === username) {
            message.type = messageTypes.RIGHT;
        } else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();

    //scroll to the bottom 
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

//take in message object, and return corresponding message HTML
const createMessageHTML = message => {
    if(message.type === messageTypes.LOGIN){
        return `
        <p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>
        `;
    }

    return `
        <div class="message ${message.type === messageTypes.LEFT ? 'message-left': 'message-right'}">
            <div id="message-details" class="flex">
                <p class="flex-grow-1 message-author">${message.type === messageTypes.LEFT ? message.author: ''}</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content"> ${message.content}</p>
        </div>
    `;
}

displayMessages = () => {
    const messagesHTML = messages
        .map(message => createMessageHTML(message))
        .join('');
    messagesList.innerHTML= messagesHTML;
}

//sendbtn callback
sendBtn.addEventListener('click', e => {
    e.preventDefault();
    if(!messageInput.value) {
        return console.log('must supply a message');
    }

    const date = new Date();
    const month =('0'+ date.getMonth()).slice(0,2);
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = `${month}/${day}/${year}`;

    const message = {
        author: username,
        date: dateString,
        content: messageInput.value
    };

    sendMessage(message);

    messageInput.value = '';
});

//loginbtn callback
loginBtn.addEventListener('click', e => {
    //prevent default of a form
    e.preventDefault();
    //set the username and create logged in message
    if(!usernameInput.value){
        return console.log("must supply a username")
    }

    username = usernameInput.value; 
    sendMessage({ author: username, type: messageTypes.LOGIN});
    
    //hide login and show chat window
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
});

sendMessage = message => {
    socket.emit('message', message);
};
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

//take in message object, and return corresponding message HTML
const createMessageHTML = (message) => {
    if(message.type === messageTypes.LOGIN){
        return `
        <p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>
        `;
    }

    return `
        <div class="message ${message.type === messageTypes.LEFT ? 'message-left': 'message-right'}">
            <div id="message-details" class="flex">
                <p class="flex-grow-1 message-author">${message.author}</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content"> ${message.content}</p>
        </div>
    `;
}

displayMessages = () => {
    console.log('displaying messages');
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

    const message = {
        author: username,
        date: new Date(),
        content: messageInput.value,
        type: messageTypes.RIGHT
    };

    messages.push(message);
    displayMessages();

    //scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    //clear input 
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
z
    messages.push({
        author: username,
        type: messageTypes.LOGIN
    });
    displayMessages();
    
    //hide login and show chat window
    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
});
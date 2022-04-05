// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');
const containerChat = document.querySelector('.containerChat');
const containerLogin = document.querySelector('.containerLogin');
const joinButton = document.querySelector('#joinButton');
const leaveBtn = document.querySelector('#leaveBtn');
const msgScroll = document.querySelector('#scrollMsg');
const btnSize = document.querySelectorAll('.chat-rooms .btn');
console.log(btnSize);

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  // this statement returns a promise
  chatroomObj.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// join anonymously
joinButton.addEventListener('click', e => {
  e.preventDefault();
  chatroomObj.updateName('Anonymous');
  containerLogin.classList.add('d-none');
  containerChat.classList.remove('d-none');
  msgScroll.scrollTop = msgScroll.scrollHeight;
});

// leave chat
leaveBtn.addEventListener('click', e => {
  e.preventDefault();
  chatroomObj.leaveChat();
  containerLogin.classList.remove('d-none');
  containerChat.classList.add('d-none');
});

// update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom 
  const newName = newNameForm.name.value.trim();
  chatroomObj.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  // updateMsg.innerHTML = `Your name was updated to <b>${newName}</b>`;
  // setTimeout(() => updateMsg.innerHTML = '', 3000);
  containerLogin.classList.add('d-none');
  containerChat.classList.remove('d-none');
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
   

    // if(e.target.classList.contains('btn-lg')) {
    //   e.target.classList.remove('btn-lg');
    // } else {
    //   e.target.classList.add('btn-lg');
    // }

    chatUIObj.clear();
    chatroomObj.updateRoom(e.target.getAttribute('id'));
    chatroomObj.getChats(chat => chatUIObj.render(chat));
    btnSize.forEach(btn => {
      if(btn.classList.contains('btn-lg')) {
        console.log('naa');
        btn.classList.remove('btn-lg');
      } else {
        console.log('wala');
        e.target.classList.add('btn-lg');
      }
    });
  }
});

if(localStorage.username) {
  console.log('naay sud');
  console.log(localStorage.username);
  containerLogin.classList.add('d-none');
  containerChat.classList.remove('d-none');
} 

// check local storage for a name 
const username = localStorage.username ? localStorage.username : 'Anonymous';

// class instances
const chatUIObj = new ChatUI(chatList);
// 'chatroomObj' already exists even before the user submits the form in the event listener
const chatroomObj = new Chatroom('general', username);

// get chats and render
chatroomObj.getChats(data => chatUIObj.render(data));


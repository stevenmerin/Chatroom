// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

// the 'Chatroom' class manages all the chatroom data
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    // reference to the 'chats' collection in the firestore db
    this.chats = db.collection('chats'); 
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    const dateNow = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(dateNow) 
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  // this will not be a async method because it's not a one time call, this is a regular method using a realtime listener and returns a response everytime there is a change
  getChats(callback) { 
    // if we call this.unsub, it will unsubscribe the changes to this listener
    this.unsub = this.chats // this.chats returns a function 
      .where('room', '==', this.room) // query
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        // this gets the array of all the changes
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added') {
            // update the ui
            callback(change.doc.data());
          }
        }); 
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  leaveChat() {
    localStorage.removeItem('username');
  }
  
  // only updating the room property & unsubcribing from changes to the old room, not listening to changes on the new room, not setting up a new real time listener
  updateRoom(room) {
    this.room = room;
    console.log('room updated');
    // check if this.unsub has a value & if there is a value then it returns true
    if(this.unsub) {
      this.unsub();
    }
  }
}

// setTimeout(() => {
//   chatroomObj.updateRoom('gaming');
//   chatroomObj.updateName('yoshi');
//   // this callback function is firing everytime there's a change
//   chatroomObj.getChats(data => {
//     console.log(data);
//   });
//   chatroomObj.addChat('what game?');
// }, 3000);

// returns a promise
// chatroom.addChat('hello everyone')
//   .then(() => console.log('chat added'))
//   .catch(err => console.log(err));
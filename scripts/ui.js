// render chat templates to the DOM
// clear the list of chats (when the room changes)


class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = '';
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {addSuffix: true } );
    // const when = dateFns.formatRelative(subDays(data.created_at.toDate(), 3), new Date());
    
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}: </span>  
        <span class="message">${data.message}</span>  
        <div class="time">${when}</div>
      </li>
    `;
    this.list.innerHTML += html;
    
    // const len = document.getElementsByClassName('list-group-item').length;
    // document.getElementsByClassName('list-group-item')[len-1].scrollIntoView({behavior: 'smooth'});
    // msgScroll.scrollTop = msgScroll.scrollHeight - msgScroll.clientHeight;
    msgScroll.scrollTop = msgScroll.scrollHeight;
    // msgScroll.scrollIntoView({block: 'end', behavior: 'smooth'});
    // console.log(msgScroll.innerHeight());
    // console.log(len);
    
  }
}


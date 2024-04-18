const socket = io();
const btnSend = document.getElementById('btnSend');
let txtVal = document.getElementById('txtMsg');
let msgArea = document.querySelector('.msgWrapper');
let userName = 'user1';

window.onload = () => {
  do {
    userName = prompt('Enter Your Name : ');
    document.getElementById('user').innerHTML = userName;
  } while (!userName);
  msgArea.scrollTo(0, msgArea.scrollHeight);
};

txtVal.addEventListener('keyup', (e) => {
  if (e.target.value && e.key === 'Enter') {
    sendMsg(e);
  }
});

btnSend.addEventListener('click', (e) => {
  sendMsg(e);
});

function sendMsg(e) {
  e.preventDefault();
  if (txtVal.value) {
    let msgVal = txtVal.value.trim();
    let messgeInfo = {
      user: userName,
      msg: msgVal,
    };
    socket.emit('chat', messgeInfo);
    txtVal.value = '';

    appendMsg(messgeInfo, 'OutgoingMsg');
  }
}

function appendMsg(msg, type) {
  let elem = document.createElement('div');
  elem.classList.add(type);

  let msgContent = `<h4>${msg.user}</h4>
    <p>${msg.msg}
    
    <span class='timeStamp'>${new Date(Date.now()).toLocaleTimeString([], {
      timeStyle: 'short',
    })}</span>
    </p>
    `;

  elem.innerHTML = msgContent;
  msgArea.appendChild(elem);
  msgArea.scrollTo(0, msgArea.scrollHeight);
}

socket.on('chat', (msg) => {
  appendMsg(msg, 'incomingMsg');
});

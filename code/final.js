document.addEventListener("DOMContentLoaded", () => {
    const score = localStorage.getItem("cameraScore") || 0;
    const scoreEl = document.getElementById("scoreMessage");
    scoreEl.innerHTML = `Congratulations! You got  <span class="highlight-score">${score}</span>  geese!`;
});

document.getElementById('submitBtn').addEventListener('click', function () {
    let username = document.getElementById('username').value;
    let message = document.getElementById('message').value;

    if (message === '') {
        alert('Please enter content');
        return;
    }

    if (username === '') {
        username = 'No name';
    }

    const messageBoard = document.getElementById('messageBoard');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');

    newMessage.innerHTML = '<div class="mes-info"><div class="info"><img src="asset/firstGoose.PNG" alt="head portrait" width="50" height="50"><strong>'
        + username + '</strong></div><span>Posted at:' + getCurrentTime() +
        '</span></div><div class="content">' + message + '</div>';

    messageBoard.insertBefore(newMessage, messageBoard.firstChild);

    document.getElementById('username').value = '';
    document.getElementById('message').value = '';
});

function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
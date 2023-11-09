import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
    update,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';

const appSettings = {
    databaseURL: 'https://thinkful-88088-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const blogPostInDb = ref(database, 'blogList');
const postId = [];

const publishBtn = document.querySelector('.publish-btn');
const postSection = document.querySelector('.container');
const postInput = document.getElementById('input-field');

let upVoteCount = 0;
let downVoteCount = 0;

onValue(blogPostInDb, function (snapshot) {
    clearElement();
    snapshot.forEach((childSnapshot) => {
        let post = childSnapshot.val();
        let itemValue = post.text;
        let postUpVoteCount = post.upVotes;
        let postDownVoteCount = post.downVotes;
        let id = childSnapshot.key;
        postId.push(id);
        addPost(itemValue, postUpVoteCount, postDownVoteCount, id);
    });
});


function addPost(itemValue, upVotes, downVotes, id) {
    let newEl = document.createElement('div');
    newEl.className = 'post-container';

    let postText = document.createElement('p');
    postText.textContent = itemValue;
    newEl.appendChild(postText);

    let upVoteDisplay = document.createElement('p');
    upVoteDisplay.className = 'up-vote-display';
    upVoteDisplay.textContent = upVotes;
    newEl.appendChild(upVoteDisplay);

    let downVoteDisplay = document.createElement('p');
    downVoteDisplay.className = 'down-vote-display';
    downVoteDisplay.textContent = downVotes;
    newEl.appendChild(downVoteDisplay);

    let upVoteImg = document.createElement('img');
    upVoteImg.src = 'images/up.png';
    upVoteImg.className = 'up-img';
    newEl.appendChild(upVoteImg);

    upVoteImg.addEventListener('click', () => {
        upVotes++;
        upVoteDisplay.textContent = upVotes;
        saveVoteCountsToDatabase(id, upVotes, downVotes);
    });

    let downVoteImg = document.createElement('img');
    downVoteImg.src = 'images/down.png';
    downVoteImg.className = 'down-img';
    newEl.appendChild(downVoteImg);

    downVoteImg.addEventListener('click', () => {
        downVotes++;
        downVoteDisplay.textContent = downVotes;
        saveVoteCountsToDatabase(id, upVotes, downVotes);
    });

    let removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove from feed';
    newEl.appendChild(removeBtn);

    removeBtn.addEventListener('click', () => {
        const postRef = ref(database, 'blogList/' + id);
        remove(postRef);
        console.log(id);
    });

    postSection.appendChild(newEl);
}

function saveVoteCountsToDatabase(postId, upVotes, downVotes) {
    const postRef = ref(database, 'blogList/' + postId);
    update(postRef, {
        upVotes: upVotes,
        downVotes: downVotes,
    });
}

function clearElement() {
    postSection.innerHTML = '';
}

function clear() {
    document.getElementById('input-field').value = '';
}

publishBtn.addEventListener('click', () => {
    let inputValue = postInput.value;

    push(blogPostInDb, {
        text: inputValue,
        upVotes: upVoteCount,
        downVotes: downVoteCount,
    });

    clear();
});

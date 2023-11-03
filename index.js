import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import {
    getDatabase,
    ref,
    push,
    onValue,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';

const appSettings = {
    databaseURL: 'https://thinkful-88088-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const blogPostInDb = ref(database, 'blogList');

const publishBtn = document.querySelector('.publish-btn');
const postSection = document.querySelector('.container');
const postInput = document.getElementById('input-field');

onValue(blogPostInDb, function (snapshot) {
    //turn object into array
    let blogPostArray = Object.values(snapshot.val());
    clearElement();
    //loop through the array
    for (let i = 0; i < blogPostArray.length; i++) {
        let currentPost = blogPostArray[i];
        addPost(currentPost);
    }
});

function addPost(itemValue) {
    let newEl = document.createElement('p');
    newEl.textContent = itemValue;
    newEl.className = 'post-container';
    postSection.appendChild(newEl);
}

function clearElement() {
    postSection.innerHTML = '';
}

function clear() {
    document.getElementById('input-field').value = '';
}

publishBtn.addEventListener('click', () => {
    let inputValue = postInput.value;
    console.log(inputValue);
    push(blogPostInDb, inputValue);
    clear();
});

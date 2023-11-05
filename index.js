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

    downVoteImg()
    upVoteImg()
    removeBtn()
    
}

let downVoteCount = ""
let upVoteCount = ""

function downVoteImg() {
    let postContainer = document.querySelector(".post-container")
    let downVoteImg = document.createElement("img")

    downVoteImg.src = "images/down.png"
    downVoteImg.className = "down-img"
    postContainer.appendChild(downVoteImg)
    
    let countDisplay = document.createElement("p");
    countDisplay.className = "down-vote-display";
    countDisplay.textContent = downVoteCount;
    postContainer.appendChild(countDisplay);

    downVoteImg.addEventListener("click", () => {
        downVoteCount++;
        countDisplay.textContent = downVoteCount;
    })
}

function upVoteImg() {
    let postContainer = document.querySelector(".post-container")
    let upVoteImg = document.createElement("img")

    upVoteImg.src = "images/up.png"
    upVoteImg.className = "up-img"
    postContainer.appendChild(upVoteImg)

    let countDisplay = document.createElement("p");
    countDisplay.className = "up-vote-display";
    countDisplay.textContent = upVoteCount;
    postContainer.appendChild(countDisplay);

    upVoteImg.addEventListener("click", () => {
        upVoteCount++;
        countDisplay.textContent = upVoteCount;
    })

}


function removeBtn() {
    let postContainer = document.querySelector(".post-container")
    let removeBtn = document.createElement("button")
    removeBtn.className="remove-btn"
    removeBtn.textContent="Remove from feed"
    postContainer.appendChild(removeBtn)
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



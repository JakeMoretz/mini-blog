const publishBtn = document.querySelector(".publish-btn")
const postSection = document.querySelector(".container")
const postInput = document.getElementById("input-field")

function addPost() {
    let newEl = document.createElement('p')
    newEl.textContent = document.getElementById("input-field").value
    newEl.className = "post-container"
    postSection.appendChild(newEl)
}

publishBtn.addEventListener("click", () => {
    addPost()
})
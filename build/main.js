document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("idea-form");
    const briefForm = document.getElementById("brief-form")
    const input = document.getElementById("idea-input");
    const ideaList = document.getElementById("idea-list");
    const brief = document.getElementById("brief");
    const briefText = document.getElementById("briefText")

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const ideaText = input.value;
        const hashBrief = brief.value
        if (ideaText) {
            addTodoItem(ideaText);
            saveTodoItem(ideaText, hashBrief);
            input.value = "";
            brief.value = ""
        }
    });
    briefForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const hash = urlParams.get("hash");
        const ideaText = hash

        const hashBrief = briefText.value
        if (hashBrief) {

            saveBrief(ideaText, hashBrief);
            input.value = "";
            briefText.value = ""
        }
    });
    function addTodoItem(ideaText,id) {
        const listItem = document.createElement("div");
        listItem.innerHTML = `<div><a href="./timeline.html?hash=${ideaText}"><i class="ri-hashtag"></i>${ideaText}</a></div><article><a href="./addBrief.html?hash=${ideaText}" ><i class="ri-edit-box-fill"  ></i></a><i class="ri-delete-bin-line" id="${id}" onclick="deleteIdea(this)"></i></article>`


        listItem.addEventListener("click", function () {
            listItem.classList.toggle("completed");
        });

        ideaList.appendChild(listItem);
    }
    function saveTodoItem(ideaText, hashBrief) {
        const ideaItem = { hash: ideaText.trim(), brief: hashBrief };
        fetch("http://localhost:5000/addIdea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ideaItem)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log("Error saving idea:", error));
    }
    function saveBrief(ideaText, hashBrief) {
        const ideaItem = { hash: ideaText, brief: hashBrief };
        fetch("http://localhost:5000/addBrief", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ideaItem)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log("Error saving idea:", error));
    }

    

    // Retrieve ideas from the backend on page load
    fetch("http://localhost:5000/allIdeas")
        .then(response => response.json())
        .then(ideas => {
            ideas.forEach(idea => {
                console.log(idea);
                addTodoItem(idea.hash,idea._id);
            });
        })
        .catch(error => console.log("Error retrieving ideas:", error));
});

function loadTimeline(){
console.log("timeline loading start");

}

function deleteIdea(e){
    console.log(e.id);
    let eid = e.id
    fetch("http://localhost:5000/deleteIdea", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({eid})
    })
        .then(response => response.json())
        .then(data => {console.log(data);window.location.reload()})
        .catch(error => console.log("Error saving idea:", error));
        }
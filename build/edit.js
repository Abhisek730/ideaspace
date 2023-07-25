const briefForm = document.getElementById("brief-form")

const briefText = document.getElementById("briefText")


briefForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get("hash");
    const ideaText = hash

    const hashBrief = briefText.value
    if (hashBrief) {

        saveBrief(ideaText, hashBrief);

        briefText.value = ""
    }
});

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
        .then(data => { console.log(data); location.href = "/" })
        .catch(error => console.log("Error saving idea:", error));
}
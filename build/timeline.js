

document.addEventListener("DOMContentLoaded", function(){
    const timeline = document.getElementById("timeline")
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get("hash");
    console.log(hash);
     fetch(`http://localhost:5000/briefs?hash=${hash}`)
     .then(response => response.json())
     .then(ideas => {
        console.log(ideas);
        if(ideas.briefs.length > 0){
            ideas.briefs.forEach((element,i) => {
                console.log(element);
                const dateObj = new Date(element.timestamp);

const readableDate = dateObj.toLocaleDateString(); // Get readable date string
const readableTime = dateObj.toLocaleTimeString(); // Get readable time string
timeline.innerHTML += `
<div class="timeline-item">
          <div class="timeline-content">
            <h3 class="timeline-title">Event ${i+1}</h3>
            <p class="timeline-description">${element.brief}</p>
            <span class="timeline-date">${readableDate} - ${readableTime}</span>
          </div>
        </div>`
            });
        }
        //  ideas.forEach(idea => {
        //      console.log(idea);
             
        //  });
     })
     .catch(error => console.log("Error retrieving ideas:", error));
})
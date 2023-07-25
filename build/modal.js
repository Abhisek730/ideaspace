const openModalButton = document.getElementById("addBtn");
const closeModalButton = document.getElementById("close-modal-btn");
const modal = document.getElementById("addModal");

openModalButton.addEventListener("click", function() {
  modal.classList.add("show");
});

closeModalButton.addEventListener("click", function() {
  modal.classList.remove("show");
});
// const openModalButton2 = document.getElementById("editModalBtn");
// const closeModalButton2 = document.getElementById("close-modal-btn-edit");
// const modal2 = document.getElementById("editModal");

// openModalButton2.addEventListener("click", function() {
//   modal2.classList.add("show");
// });

// closeModalButton2.addEventListener("click", function() {
//   modal2.classList.remove("show");
// });

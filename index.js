// Parent element to store cards
const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

// Global Storage
const globalStore = [];


const newCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top" alt="Image">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`

const loadInitialTaskCards = () => {
  // access LocalStorage
  const getInitialData = localStorage.getItem("tasky");
  if(!getInitialData)
  {
    return;
  }

  // Convert stringify Object to Object
  const { cards } = JSON.parse(getInitialData);

  // Map around the Array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard); // Converting datas from DOM to HTML

    globalStore.push(taskData); // Storing datas in an Array

    // Call Application Programming Interface (API) to update Array containing element in Local Storage
    localStorage.setItem("tasky", JSON.stringify({cards : globalStore}));

    // parent object browser -> window
    // parent object html -> DOM -> document

};
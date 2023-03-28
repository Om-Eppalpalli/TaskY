// Parent element to store cards
const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

// Global Storage
let globalStore = [];


const newCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" id=${id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)"><i class="fa-solid fa-pencil" id=${id} onclick="editCard.apply(this, arguments)"></i></button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)"><i class="fa-solid fa-trash-can" id=${id} onclick="deleteCard.apply(this, arguments)"></i></button>
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
    <button type="button" id=${id} class="btn btn-outline-primary float-end">Open Task</button>
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

const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

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
    updateLocalStorage();

    // parent object browser -> window
    // parent object html -> DOM -> document

};

const deleteCard = (event) => {
  // id
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // search the globalStore, remove the Object which matches with the id
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

  updateLocalStorage();

  // access DOM to remove them
  // When user click on delete button
  if(tagname === "BUTTON")
  {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }

  // When user click on icon of delete button
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
};

// Content Edit Able
const editCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;
  if(tagname == "BUTTON")
  {
    parentElement = event.target.parentNode.parentNode;
  }
  else
  {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];
  // SetAttribute
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEditchanges.apply(this, arguments)");
  submitButton.innerHTML = "Save Chanegs";
};

const saveEditchanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;
  if(tagname == "BUTTON")
  {
    parentElement = event.target.parentNode.parentNode;
  }
  else
  {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };

  globalStore = globalStore.map((task) => {
    if(task.id === targetID)
    {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task;
  });
  updateLocalStorage();
};
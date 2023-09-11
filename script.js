//Global variables
const toDoList = document.querySelector("#toDoList");
const toDoItem = document.querySelector(".toDoItem");
const newItemBtn = document.querySelector("#newItemBtn");
const textForNewToDo = document.querySelector("#textForNewToDo");

//Event handler functions
//  Example: function toDoClickHandler (event) {
//     code
// }
function newItemBtnClickHandler(e) {
    e.preventDefault();
    //variables
    const newToDoItem = document.createElement("li");
    const newCheckDoneBtn = document.createElement("button");
    const newToDoText = document.createElement("p");
    const newDeleteBtn = document.createElement("button");
    //add appropriate classes
    newToDoItem.classList.add("toDoItem");
    newCheckDoneBtn.classList.add("checkDoneBtn");
    newToDoText.classList.add("toDoText");
    newDeleteBtn.classList.add("deleteBtn");
    //add appropriate textContent
    newCheckDoneBtn.textContent = "□";
    newToDoText.textContent = `${textForNewToDo.value}`;
    newDeleteBtn.textContent = "Delete";
    //append children to li
    newToDoItem.appendChild(newCheckDoneBtn);
    newToDoItem.appendChild(newToDoText);
    newToDoItem.appendChild(newDeleteBtn);

    //append new item to list
    toDoList.appendChild(newToDoItem);
}

//Events
// Example: toDoList.addEventListener("click", toDoClickHandler);
newItemBtn.addEventListener("click", newItemBtnClickHandler);

//Global variables
const toDoList = document.querySelector("#toDoList");
const toDoItem = document.querySelector(".toDoItem");
const toDoText = document.querySelector(".toDoText");
const newItemBtn = document.querySelector("#newItemBtn");
const textEditor = document.querySelector("#textEditor");
const editTextPopupWrapper = document.querySelector("#editTextPopupWrapper");
const editTextBtn = document.querySelector("#editTextBtn");
const closePopupBtn = document.querySelector("#closePopupBtn");
const allToDoTexts = document.getElementsByClassName("toDoText");

//Event handler functions
//  Example: function toDoClickHandler (event) {
//     code
// }
function newItemBtnClickHandler(e) {
    const textForNewToDo = document.querySelector("#textForNewToDo");
    e.preventDefault();
    if (textForNewToDo.value) {
        //variables
        const newToDoItem = document.createElement("li");
        const newLiLeftDiv = document.createElement("div");
        const newCheckDoneBtn = document.createElement("button");
        const newToDoText = document.createElement("p");
        const newDeleteBtn = document.createElement("button");
        //add appropriate classes
        newToDoItem.classList.add("toDoItem");
        newLiLeftDiv.classList.add("li-left");
        newCheckDoneBtn.classList.add("checkDoneBtn");
        newToDoText.classList.add("toDoText");
        newDeleteBtn.classList.add("deleteBtn");
        //add appropriate textContent
        newCheckDoneBtn.textContent = "□";
        newToDoText.textContent = `${textForNewToDo.value}`;
        newDeleteBtn.textContent = "";
        //append li-left children
        newLiLeftDiv.appendChild(newCheckDoneBtn);
        newLiLeftDiv.appendChild(newToDoText);

        //append children to li
        newToDoItem.appendChild(newLiLeftDiv);
        newToDoItem.appendChild(newDeleteBtn);

        //append new item to list
        toDoList.appendChild(newToDoItem);

        //update node list so each new one will have the event listener
        Array.from(allToDoTexts).forEach((toDoText) => {
            toDoText.addEventListener("click", toDoTextClickHandler);
            toDoText.addEventListener("mouseover", toDoMouseOverHandler);
            toDoText.addEventListener("mouseout", toDoMouseOutHandler);
        });
        //reset text box
        textForNewToDo.value = "";
    }
}
function toDoTextClickHandler(e) {
    Array.from(allToDoTexts).forEach((toDoText) => {
        toDoText.removeEventListener("mouseout", toDoMouseOutHandler);
    });
    e.target.classList.add("current");
    console.log(e.target);
    editTextPopupWrapper.style.display = "flex";
    textEditor.value = `${this.textContent}`;
}
function editTxtBtnClickHandler(e) {
    e.preventDefault();
    const currentToDo = document.querySelector(".current");
    currentToDo.textContent = textEditor.value;
    Array.from(allToDoTexts).forEach((toDoText) => {
        toDoText.addEventListener("mouseout", toDoMouseOutHandler);
    });
    editTextPopupWrapper.style.display = "none";
}
function closePopupBtnClickHandler(e) {
    e.preventDefault();
    Array.from(allToDoTexts).forEach((toDoText) => {
        toDoText.addEventListener("mouseout", toDoMouseOutHandler);
    });

    editTextPopupWrapper.style.display = "none";
}
function toDoMouseOverHandler(e) {
    e.target.classList.add("current");
}
function toDoMouseOutHandler(e) {
    e.target.classList.remove("current");
}
//Events
// Example: toDoList.addEventListener("click", toDoClickHandler);
console.log(allToDoTexts);
newItemBtn.addEventListener("click", newItemBtnClickHandler);
Array.from(allToDoTexts).forEach((toDoText) =>
    toDoText.addEventListener("click", toDoTextClickHandler)
);
editTextBtn.addEventListener("click", editTxtBtnClickHandler);
closePopupBtn.addEventListener("click", closePopupBtnClickHandler);
toDoText.addEventListener("mouseover", toDoMouseOverHandler);
toDoText.addEventListener("mouseout", toDoMouseOutHandler);


// Done Actions //
toDoList.addEventListener("click", toggleDone);

function toggleDone(event) {
  if (event.target.classList.contains("checkDoneBtn")) {
    const parentLi = event.target.closest(".toDoItem");

    parentLi.classList.toggle("done");

    const checkDoneBtn = parentLi.querySelector(".checkDoneBtn");
    checkDoneBtn.textContent = parentLi.classList.contains("done") ? "\u2610" : "\u2611";
  }
}



// Delete Actions //
toDoList.addEventListener("click", deleteItem);

function deleteItem(event) {
  if (event.target.classList.contains("deleteBtn")) {
    const parentLi = event.target.closest(".toDoItem");

    toDoList.removeChild(parentLi);
  }
}


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

loadToDos();
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
        const newI = document.createElement("i");
        //add appropriate classes
        newToDoItem.classList.add("toDoItem");
        newLiLeftDiv.classList.add("li-left");
        newCheckDoneBtn.classList.add("checkDoneBtn");
        newToDoText.classList.add("toDoText");
        newDeleteBtn.classList.add("deleteBtn");
        newI.classList.add("fa fa-trash");
        //add appropriate textContent
        newCheckDoneBtn.textContent = "☐";
        newToDoText.textContent = `${textForNewToDo.value}`;
        //append li-left children
        newLiLeftDiv.appendChild(newCheckDoneBtn);
        newLiLeftDiv.appendChild(newToDoText);
        //append i to button
        newDeleteBtn.appendChild(newI);
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

        //add to local storage
        addToDoItemToLocalStorage(textForNewToDo);
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
        //switched codes here so it is checked when done
        checkDoneBtn.textContent = parentLi.classList.contains("done")
            ? "\u2611"
            : "\u2610";
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

//localstorage with my messy idea that doesn't involve any objects
function addToDoItemToLocalStorage(item) {
    console.log("I was called.");
    localStorage.setItem(`To do: ${item.value}`, item.value);
}

function loadToDos() {
    Object.keys(localStorage).forEach((key) => {
        const newToDoItem = document.createElement("li");
        newToDoItem.classList.add("toDoItem");
        newToDoItem.innerHTML = `<div class="li-left">
              <button class="checkDoneBtn">
                ☐
              </button>
              <p class="toDoText">${localStorage.getItem(key)}</p>
            </div>
            <button class="deleteBtn"><i class="fa fa-trash"></i></button>`;
        toDoList.appendChild(newToDoItem);
        console.log(localStorage.getItem(key));
    });
}

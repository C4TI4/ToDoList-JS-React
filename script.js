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
const checkDoneBtn = document.querySelector(".checkDoneBtn");
const allCheckDoneBtns = document.getElementsByClassName("checkDoneBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const allDeleteBtns = document.getElementsByClassName("deleteBtn");

//localstorage variables
loadToDos();

// local storage functions

function loadToDos() {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) return;
    const parseTodos = JSON.parse(storedTodos);
    parseTodos.forEach((todo) => {
        const newToDoItem = document.createElement("li");
        newToDoItem.classList.add("toDoItem");
        newToDoItem.innerHTML = `<div class="li-left">
                  <button class="checkDoneBtn">
                    ☐
                  </button>
                  <p class="toDoText ${todo.done ? "done" : ""}">${
            todo.title
        }</p>
                </div>
                <button class="deleteBtn"><i class="fa fa-trash"></i></button>`;
        toDoList.appendChild(newToDoItem);
        console.log(todo.done);
    });
    // Object.keys(localStorage).forEach((key) => {
    //     const newToDoItem = document.createElement("li");
    //     newToDoItem.classList.add("toDoItem");
    //     newToDoItem.innerHTML = `<div class="li-left">
    //           <button class="checkDoneBtn">
    //             ☐
    //           </button>
    //           <p class="toDoText">${localStorage.getItem(key)}</p>
    //         </div>
    //         <button class="deleteBtn"><i class="fa fa-trash"></i></button>`;
    //     toDoList.appendChild(newToDoItem);
    //     console.log(localStorage.getItem(key));
    // });
}

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
        newI.classList.add("fa", "fa-trash");
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

        // event listener for check done and delete
        Array.from(allCheckDoneBtns).forEach((checkDoneBtn) =>
            checkDoneBtn.addEventListener("click", toggleDone)
        );
        Array.from(allDeleteBtns).forEach((deleteBtn) =>
            deleteBtn.addEventListener("click", deleteItem)
        );
        //add to todos array
        const storedTodos = localStorage.getItem("todos");
        const todos = JSON.parse(storedTodos) || [];
        todos.push({ title: textForNewToDo.value, done: false });
        console.log("todos", todos);
        //add to local storage
        localStorage.setItem("todos", JSON.stringify(todos));
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

    //add to local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach((todo) => {
            if (todo.title === currentToDo.textContent) {
                todo.title = textEditor.value;
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    currentToDo.textContent = textEditor.value;
    //add mouseout back
    currentToDo.classList.remove("current");
    Array.from(allToDoTexts).forEach((toDoText) => {
        toDoText.addEventListener("mouseout", toDoMouseOutHandler);
    });
    editTextPopupWrapper.style.display = "none";
}
function closePopupBtnClickHandler(e) {
    e.preventDefault();
    const currentToDo = document.querySelector(".current");
    currentToDo.classList.remove("current");
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
function toggleDone(event) {
    // if event target is button you can use nextElementSibling to change the styling of the text

    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach((todo) => {
            if (todo.title === event.target.nextElementSibling.textContent) {
                todo.done = !todo.done;
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    event.target.nextElementSibling.classList.toggle("done");
    //  if (event.target.classList.contains("checkDoneBtn")) {
    //         const parentLi = event.target.closest(".toDoItem");
    //         const checkDoneBtn = parentLi.querySelector(".checkDoneBtn");
    //         parentLi.classList.toggle("done");
    // switched codes here so it is checked when done
    // checkDoneBtn.textContent = parentLi.classList.contains("done")
    //     ? "\u2611"
    //     : "\u2610";
    // }
}
function deleteItem() {
    const todoText = this.previousElementSibling.lastElementChild.textContent;
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach((todo, i) => {
            if (todo.title === todoText) {
                todos.splice(i, 1);
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        if (todos.length === 0) {
            localStorage.removeItem("todos");
        }
    }
    this.parentElement.remove();

    // event.target.parentElement.remove();
    // if (event.target.classList.contains("deleteBtn")) {
    //     const parentLi = event.target.closest(".toDoItem");
    //     toDoList.removeChild(parentLi);
    // }
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
Array.from(allToDoTexts).forEach((toDoText) =>
    toDoText.addEventListener("mouseover", toDoMouseOverHandler)
);
Array.from(allToDoTexts).forEach((toDoText) =>
    toDoText.addEventListener("mouseout", toDoMouseOutHandler)
);
checkDoneBtn.addEventListener("click", toggleDone);
Array.from(allCheckDoneBtns).forEach((checkDoneBtn) =>
    checkDoneBtn.addEventListener("click", toggleDone)
);
deleteBtn.addEventListener("click", deleteItem);
Array.from(allDeleteBtns).forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", deleteItem)
);

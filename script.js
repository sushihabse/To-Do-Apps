//Find the elements 
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodu");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("todoList");
const messaElement = document.getElementById("message");

//showmessage
const showMessage = (text, status) => {
    messaElement.textContent = text;
    messaElement.classList.add(`bg-${ status}`);
    setTimeout(() => {
        messaElement.textContent = "";
        messaElement.classList.remove(`bg-${ status}`);
    }, 1000);
}

//createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.classList.add("li-style");
    todoElement.id = todoId;
    todoElement.innerHTML = `
    <span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i><button></span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)
}

//deleteTodo
const deleteTodo = (event) =>{
    const selectTodo = event.target.parentElement.parentElement.parentElement;

    todoLists.removeChild(selectTodo);
    showMessage("Successfully deleted", "danger");

    let todos = getTodosFromLoacalstrorage();
    todos = todos.filter((todo)=> todo.todoId !== selectTodo.id)
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

// Get Todos from locals storage

const getTodosFromLoacalstrorage = () =>{
    return localStorage.getItem("mytodos")
     ? JSON.parse(localStorage.getItem("mytodos"))
     :[];

};

//addTod
const addTodo = (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    //unique id
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage("New member successfully added", "success");

    //addin todo to local storage
    const todos = getTodosFromLoacalstrorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos)
    );

    todoInput.value = "";
}

//loadTodos
const LoadTodos = ()=>{
    const todos = getTodosFromLoacalstrorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
};

//Adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", LoadTodos);


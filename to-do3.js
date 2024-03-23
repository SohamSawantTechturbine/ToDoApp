let inputBox = document.getElementById("input-box");
let listcontainer = document.getElementById("list-container");
let arr = JSON.parse(localStorage.getItem("data")) || [];

function addTask() {
    if (inputBox.value === '') {
        alert("empty");
    } else {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.innerHTML = "edit";
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li);

        alert(`your task added successfully ${inputBox.value}`);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.appendChild(button);
        arr.push({ content: inputBox.value, checked: false });

        console.log(arr);
        saveData();
    }

    inputBox.value = "";
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateState(e.target);
    } else if (e.target.tagName === "SPAN") {
        let taskToRemove = e.target.parentElement.firstChild.textContent;
        e.target.parentElement.remove();
        arr = arr.filter(task => task.content !== taskToRemove);
        saveData();
    } else if (e.target.tagName === "BUTTON") {
        editdata(e);
    }
}, false);

function editdata(e) {
    let takevalue = prompt("Enter to edit todo");
    if (takevalue !== null) {
        let tdElement = e.target.parentElement;
        let taskContent = tdElement.firstChild.textContent;
        tdElement.firstChild.textContent = takevalue;

        let index = arr.findIndex(task => task.content === taskContent);
        if (index !== -1) {
            arr[index].content = takevalue;
            saveData();
        }
    }
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(arr));
}

function updateState(liElement) {
   
    let taskContent = liElement.textContent;
    let index = arr.findIndex(task => task.content + '×edit' === taskContent);
    if (index !== -1) {
        
        arr[index].checked = liElement.classList.contains("checked");
        saveData();
    }
}

function showtask() {
    arr.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element.content;
        if (element.checked) {
            li.classList.add("checked");
        }
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let button = document.createElement("button");
        button.innerHTML = "edit";
        li.appendChild(button);
    });
}
let serarchbtn = document.getElementById("search1");
let serachbar = document.getElementById("searchBar");
function searchTasks() {
    let searchTerm = serachbar.value.trim().toLowerCase(); 
    listcontainer.innerHTML = ""; 
    
    let filteredTasks = arr.filter(task => task.content.toLowerCase().includes(searchTerm)); 
    
    if (filteredTasks.length > 0) {
        filteredTasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.content;
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.textContent = "\u00d7";
            let button = document.createElement("button");
            button.textContent = "edit";
            
            li.appendChild(span);
            li.appendChild(button);
            
            listcontainer.appendChild(li);
        });
    } else {
        let message = document.createElement("p");
        message.textContent = "No matching tasks found";
        listcontainer.appendChild(message);
    }
}


serarchbtn.addEventListener("click", searchTasks);

showtask();

const app = document.getElementById('app');
const home = document.getElementById('home');
const register = document.getElementById('register');
const login = document.getElementById('loginSection');
const signUpButton = document.getElementById('signup');
const loginButton = document.getElementById('login');
const sections = document.querySelectorAll('.sect');

const loginSubmit = document.getElementById('loginSubmit');
const submitButton = document.getElementById('submit');
const errorForRegister = document.getElementById('errRegister');
const errorForLogin = document.getElementById('errLogin');

const dashboard = document.getElementById('dashboard');
const createTodoButton = document.getElementById('createTodo');

const createTodo = document.getElementById('create');
const firstname = document.getElementById('name');

const subtask = document.getElementById('subtask');
const subbtn = document.getElementById('subbtn');

const loginForm = document.getElementById('loginForm');
const regForm = document.getElementById('regForm');

const tasklist = document.getElementById('tasklist');

const dasboardGrid = document.getElementById('dashboard-task');

const singleTodo = document.getElementById('singleTodo');

const addaTask = document.getElementById('addaTask');

const editList = document.getElementById('editList');

const editBtn = document.getElementById('editBtn');

const editTasksForm = document.getElementById('editTasksForm');

const checked = document.getElementById('done');

const editAddTask = document.getElementById('editAddTask');

createTodoButton.addEventListener('click', showCreateTodo);

//registration and login
signUpButton.addEventListener('click', showRegister);
loginButton.addEventListener('click', showLogin);

loginForm.addEventListener('submit', loginCheck);
regForm.addEventListener('submit', registrationCheck);

tasklist.addEventListener('submit', addTask);

dasboardGrid.addEventListener('click', showSingleTodo);

addaTask.addEventListener('click', addTaskField);

editAddTask.addEventListener('click', addEditTask);

editBtn.addEventListener('click', editTodo);

editTasksForm.addEventListener('submit', editTask);

checked.addEventListener('click', toggleAsDone);

//dashboard
function showRegister() {
    home.classList.add('hidden');
    register.classList.remove('hidden');
}

function showLogin() {
    home.classList.add('hidden');
    login.classList.remove('hidden');
}

function registrationCheck(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const mail = document.getElementById('mail').value;
    const pass = document.getElementById('pass').value;
    const checkbox = document.getElementById('checkbox').checked;
    
    const user = {
        'firstName': firstName,
        'lastName': lastName,
        'mail': mail,
        'pass': pass,
        'checkbox': checkbox
    };

    for(key in user) {
        if(user[key] === '' || !user[key]) {
            errorForRegister.innerText = `${user[key]} must not be empty`;
            return;
        }
    }
    localStorage.setItem("user", JSON.stringify(user));
    
    errorForRegister.innerText = '';
    register.classList.add('hidden');

    localStorage.setItem('loggedIn', true);

    firstname.innerText = user['firstName'];
    dashboard.classList.remove('hidden');
}

function loginCheck(e) {
    e.preventDefault();

    const mail = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    if(mail === '' || pass === '') {

        errorForLogin.innerText = 'Input must not be empty';
        console.log('input must not be empty');
        return;

    } else {
        const user = JSON.parse(localStorage.getItem('user'));

        if(mail !== user.mail || pass !== user.pass) {
            errorForLogin.innerText = 'These credentials do not match our records';
            return;
        }

        localStorage.setItem('loggedIn', true);

        errorForLogin.innerText = '';
        login.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }
}

function logout() {
    localStorage.setItem('loggedIn', false);
}

function showCreateTodo() {
    dashboard.classList.add('hidden');
    createTodo.classList.remove('hidden');
}

function addTask(e) {
    e.preventDefault();
    const title = document.getElementById('title');
    const subtaskList = document.getElementsByClassName('subtask'); 
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user['mail'];
    const subtask = [];
    const allTasks = [];

    for(let key of subtaskList) {
        subtask.push(key.value);
    }

    const task = {
        user: userEmail,
        title: title.value,
        tasks: subtask,
        done: false,
    };

    allTasks.push(task);

    let tasks = JSON.parse(localStorage.getItem('task'));

    if(tasks) {
        for(let key of tasks) {
            console.log('key is ', key);
            if(key.title === task.title) {
                alert('this task already exists');
                return;
            }
            allTasks.push(key)
        }
    };
    console.log(allTasks);
    // localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(allTasks));
    tasklist.reset();
    alert('successful');
    location.reload();
}

function showDashboard() {
    dashboard.classList.remove('hidden');
    let tasks = JSON.parse(localStorage.getItem('task'));

    console.log('dashboard tasks ', tasks);
    if(tasks) {
        for(key of tasks) {
            let list = document.createElement('div');
            list.classList.add('list');
            list.classList.add('pointer');
            if(key.done === true) {
                list.innerHTML = `
                    <hr class="list-hr-done">
                    <p class="task-title"> ${key.title} </p>
                `;
            } else {
                list.innerHTML = `
                    <hr class="list-hr">
                    <p class="task-title"> ${key.title} </p>
                `;
            }
            dasboardGrid.appendChild(list);
        }
    }
}

function showSingleTodo(e) {
    let title;
    let singleTitle = document.getElementById('singleTitle');
    let titleList = document.getElementById('titleList');
    let completed = document.getElementById('completed');
    
    dashboard.classList.add('hidden');
    singleTodo.classList.remove('hidden');

    if(e.target.className === 'list pointer' || e.target.tagName === 'P' || e.target.tagName === 'HR') {
        if(e.target.tagName === 'HR') {
            title = e.target.parentNode.textContent.trim();
        } else title = e.target.textContent.trim();
    }

    let tasks = JSON.parse(localStorage.getItem('task'));

    for(let key of tasks) {
        if(key.title === title) {
            singleTitle.innerText = key.title;
            if(key.done === true) {
                completed.classList.remove('hidden');
            }
            for(let taskey of key.tasks) {
                let li = document.createElement('li');
                li.innerText = taskey;
                titleList.appendChild(li);
            }
            return;
        }
    }
}

function addTaskField() {
    const inputField = document.getElementById('inputField');
    const input = document.createElement('input');
    input.classList.add('subtask');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'subtask');
    input.setAttribute('placeholder', 'Sub task');
    inputField.appendChild(input);
}

function addEditTask() {
    const inputField = document.getElementById('editsingle');
    const input = document.createElement('input');
    input.classList.add('editSubtask');
    input.setAttribute('type', 'text');
    inputField.appendChild(input);
}


function editTodo() {
    singleTodo.classList.add('hidden');
    editList.classList.remove('hidden');
    let singleTitle = document.getElementById('singleTitle').textContent;
    let editTasks = document.getElementById('editsingle');

    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'inputtitle');
    titleInput.value = singleTitle;

    let secretInput = document.createElement('input');
    secretInput.setAttribute('type', 'text');
    secretInput.setAttribute('id', 'secret');
    secretInput.setAttribute('hidden', true);
    secretInput.value = singleTitle;

    editTasks.appendChild(secretInput);
    editTasks.appendChild(titleInput);

    let tasks = JSON.parse(localStorage.getItem('task'));
    for(let key of tasks) {
        if(key.title === singleTitle) {
            if(key.done === true){
                checked.checked = true;
            } else checked.checked = false;
            for(let taskey of key.tasks) {
                let subtask = document.createElement('input');
                subtask.setAttribute('type', 'text');
                subtask.classList.add('editSubtask');
                subtask.value = taskey;
                editTasks.appendChild(subtask);
            }
            return;
        }
    }

}

function editTask(e) {
    e.preventDefault();
    let title = document.getElementById('inputtitle').value;
    let secretTitle = document.getElementById('secret').value;
    let tasks = JSON.parse(localStorage.getItem('task'));
    const subtaskList = document.getElementsByClassName('editSubtask'); 
    
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user['mail'];
    const subtask = [];
    const allTasks = [];

    for(let key of subtaskList) {
        subtask.push(key.value);
    }

    const task = {
        user: userEmail,
        title: title,
        tasks: subtask,
        done: false,
    };

    allTasks.push(task);

    if(tasks) {
        for(const key of tasks) {
            if(key.title == secretTitle) continue; 
            else if (key.title === title) return alert('This task already exists');
            allTasks.push(key)
        }
    };
    console.log(allTasks);
    localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(allTasks));
    editTasksForm.reset();
    alert('successful');
    location.reload();
        
}

function toggleAsDone() {
    let secretTitle = document.getElementById('secret').value;
    let tasks = JSON.parse(localStorage.getItem('task'));
    const allTasks = [];
    let isDone = checked.checked;
    console.log('is done', isDone);

    for(const key of tasks) {
        if(key.title === secretTitle) {
            let doneTask = {
                user: key.user,
                title: key.title,
                tasks: key.tasks,
                done: isDone,
            }
            allTasks.push(doneTask);
            continue;
        }
        allTasks.push(key);
    }
    alert('successful');
    localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(allTasks));
    location.reload();
}

var loggedin = localStorage.getItem('loggedIn');
if(loggedin) {
    showDashboard();
}
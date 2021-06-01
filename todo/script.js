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

createTodoButton.addEventListener('click', showCreateTodo);

//registration and login
signUpButton.addEventListener('click', showRegister);
loginButton.addEventListener('click', showLogin);

loginForm.addEventListener('submit', loginCheck);
regForm.addEventListener('submit', registrationCheck);

tasklist.addEventListener('submit', addTask);

dasboardGrid.addEventListener('click', showSingleTodo);

//dashboard
function showRegister() {
    home.classList.add('sect');
    register.classList.remove('sect');
}

function showLogin() {
    home.classList.add('sect');
    login.classList.remove('sect');
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
    register.classList.add('sect');

    localStorage.setItem('loggedIn', true);

    firstname.innerText = user['firstName'];
    dashboard.classList.remove('sect');
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
        login.classList.add('sect');
        dashboard.classList.remove('sect');
    }
}

function logout() {
    localStorage.setItem('loggedIn', false);
}

function showCreateTodo() {
    dashboard.classList.add('sect');
    createTodo.classList.remove('sect');
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
        tasks: subtask
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
    dashboard.classList.remove('sect');
    let tasks = JSON.parse(localStorage.getItem('task'));

    console.log('dashboard tasks ', tasks);
    if(tasks) {
        for(key of tasks) {
            let list = document.createElement('div');
            list.classList.add('list');
            list.innerHTML = `
                <hr class="list-hr">
                <p class="task-title"> ${key.title} </p>
            `;
            dasboardGrid.appendChild(list);
        }
    }
}

function showSingleTodo(e) {
    let title;
    let singleTitle = document.getElementById('singleTitle');
    let titleList = document.getElementById('titleList');

    if(e.target.className === 'list' || e.target.tagName === 'P' || e.target.tagName === 'HR') {
        if(e.target.tagName === 'HR') {
            title = e.target.parentNode.textContent.trim();
        } else title = e.target.textContent.trim();
    }

    let tasks = JSON.parse(localStorage.getItem('task'));
    for(let key of tasks) {
        if(key.title === title) {
            singleTitle.innerText = key.title;
            for(let taskey of key.tasks) {
                let li = document.createElement('li');
                li.innerText = taskey;
                titleList.appendChild(li);
                index++;
            }
            return;
        }
    }
}

var loggedin = localStorage.getItem('loggedIn');
if(loggedin) {
    showDashboard();
}
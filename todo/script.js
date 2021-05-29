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

createTodoButton.addEventListener('click', showCreateTodo);

//registration and login
signUpButton.addEventListener('click', showRegister);
loginButton.addEventListener('click', showLogin);

loginForm.addEventListener('submit', loginCheck);
regForm.addEventListener('submit', registrationCheck);

tasklist.addEventListener('click', addTask);

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
    const title = document.getElementById('title');
    const subtaskList = document.getElementsByClassName('subtask'); 
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user['email'];
    const subtask = [];

    for(key in subtaskList) {
        subtask.push(subtaskList[key]);
    }

    console.log(subtask);;

    const task = {
        user: userEmail['email'],
        title: title.value,
        tasks: subtask
    };

    localStorage.setItem('task', JSON.stringify(task));
    alert('successful');
}

var loggedin = localStorage.getItem('loggedIn');
if(loggedin) {
    dashboard.classList.remove('sect');
}
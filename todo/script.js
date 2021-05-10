const app = document.getElementById('app');
const home = document.getElementById('home');
const register = document.getElementById('register');
const login = document.getElementById('loginSection');
const signUpButton = document.getElementById('signup');
const loginButton = document.getElementById('login');
const sections = document.querySelectorAll('.sect');

const loginform = document.getElementById('loginform');
const submitButton = document.getElementById('submit');

const dashboard = document.getElementById('dashboard');
const createTodoButton = document.getElementById('createTodo');

const createTodo = document.getElementById('create');

signUpButton.addEventListener('click', showRegister);
loginButton.addEventListener('click', showLogin);
submitButton.addEventListener('click', registrationCheck);
createTodoButton.addEventListener('click', showCreateTodo);


function showRegister() {
    home.classList.add('sect');
    register.classList.remove('sect');
}

function showLogin() {
    home.classList.add('sect');
    login.classList.remove('sect');
}

function registrationCheck(e) {
    console.log('hello');
    e.preventDefault();
    register.classList.add('sect');
    dashboard.classList.remove('sect');
}

function showCreateTodo() {
    dashboard.classList.add('sect');
    createTodo.classList.remove('sect');
}
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

const logOut = document.getElementById('logout');
const myAccount = document.getElementById('myAccount');
const account = document.getElementById('account');

const reglog = document.getElementById('reglog');
const logreg = document.getElementById('logreg');

const updateAccount = document.getElementById('updateAccount');

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

logOut.addEventListener('click', logUserOut);
myAccount.addEventListener('click', showUserAccount);

reglog.addEventListener('click', showRegister);
logreg.addEventListener('click', showLogin);

updateAccount.addEventListener('submit', updateUserAccount);

//dashboard
function showRegister() {
    hideAll();
    // localStorage.removeItem('user');
    register.classList.remove('hidden');
}

function showLogin() {
    hideAll()
    login.classList.remove('hidden');
}

function registrationCheck(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const mail = document.getElementById('mail').value;
    const pass = document.getElementById('pass').value;
    const checkbox = document.getElementById('checkbox').checked;
    const users = JSON.parse(localStorage.getItem('user'));
    const allUsers = [];
    
    const user = {
        'id': Math.random(),
        'firstName': firstName,
        'lastName': lastName,
        'mail': mail,
        'pass': pass,
        'checkbox': checkbox,
        'loggedIn': true,
    };

    for(key in user) {
        if(user[key] === '' || !user[key]) {
            errorForRegister.innerText = `${user[key]} must not be empty`;
            return;
        }
    }

    if(users) {
        for(let key of users) {
            if(key.mail === user.mail) {
                alert('We already have a user with this mail. Please log in');
                return;
            }
            if(key.id === user.id) {
                user.id = Math.random() + Math.floor(Math.random(), Math.random());
            }
            allUsers.push(key);
        }
    }
    
    allUsers.push(user);

    localStorage.setItem("user", JSON.stringify(allUsers));
    
    errorForRegister.innerText = '';
    location.reload();
}

function loginCheck(e) {
    e.preventDefault();

    const mail = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    if(mail === '' || pass === '') {

        errorForLogin.innerText = 'Input must not be empty';
        return;

    } else {
        const users = JSON.parse(localStorage.getItem('user'));
        const allUsers = [];
        let log = false;

        for(let key of users ){
            if(mail === key.mail && pass === key.pass) {
                log = true;

                key.loggedIn = true;
                allUsers.push(key);
                continue;
            }
            allUsers.push(key);
        }
        
        if(log) {
            localStorage.setItem('user', JSON.stringify(allUsers));
            errorForLogin.innerText = '';
            logOut.textContent = 'Log Out';
            location.reload();
            return;
        }

        errorForLogin.innerText = 'These credentials do not match our records';
        return;
    }
}

function showDashboard() {
    hideAll();
    dashboard.classList.remove('hidden');

    let tasks = JSON.parse(localStorage.getItem('task'));
    let name = document.getElementById('name');
    name.textContent = userLoggedIn.firstName;

    if(tasks) {
        for(key of tasks) {
            if(key.userid === userLoggedIn.id) {
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
}

function showSingleTodo(e) {
    hideAll();
    singleTodo.classList.remove('hidden');

    let title;
    let singleTitle = document.getElementById('singleTitle');
    let titleList = document.getElementById('titleList');
    let completed = document.getElementById('completed');

    if(e.target.className === 'list pointer' || e.target.tagName === 'P' || e.target.tagName === 'HR') {
        if(e.target.tagName === 'HR') {
            title = e.target.parentNode.textContent.trim();
        } else title = e.target.textContent.trim();
    } else {
        location.reload();
    }

    let tasks = JSON.parse(localStorage.getItem('task'));

    for(let key of tasks) {
        if(key.title === title) {
            singleTitle.innerText = key.title;
            if(key.done === true) {
                completed.classList.remove('hidden');
            }
            if(key.tasks) {
                for(let taskey of key.tasks) {
                    let li = document.createElement('li');
                    li.innerText = taskey;
                    titleList.appendChild(li);
                }
            }
            return;
        }
    }
}

function showCreateTodo() {
    hideAll();
    createTodo.classList.remove('hidden');
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

function addTask(e) {
    e.preventDefault();
    const title = document.getElementById('title');
    const subtaskList = document.getElementsByClassName('subtask'); 
    const subtask = [];
    const allTasks = [];

    for(let key of subtaskList) {
        subtask.push(key.value);
    }

    const task = {
        userid: userLoggedIn.id,
        title: title.value,
        tasks: subtask,
        done: false,
    };

    allTasks.push(task);

    let tasks = JSON.parse(localStorage.getItem('task'));

    if(tasks) {
        for(let key of tasks) {
            if(key.title === task.title) {
                alert('this task already exists');
                return;
            }
            allTasks.push(key)
        }
    };
    // localStorage.removeItem('task');
    localStorage.setItem('task', JSON.stringify(allTasks));
    tasklist.reset();
    alert('successful');
    location.reload();
}

function editTodo() {
    hideAll();
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

function addEditTask() {
    const inputField = document.getElementById('editsingle');
    const input = document.createElement('input');
    input.classList.add('editSubtask');
    input.setAttribute('type', 'text');
    inputField.appendChild(input);
}

function editTask(e) {
    e.preventDefault();
    let title = document.getElementById('inputtitle').value;
    let secretTitle = document.getElementById('secret').value;
    let tasks = JSON.parse(localStorage.getItem('task'));
    const subtaskList = document.getElementsByClassName('editSubtask'); 
    
    const subtask = [];
    const allTasks = [];

    for(let key of subtaskList) {
        subtask.push(key.value);
    }

    const task = {
        userid: userLoggedIn.id,
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

    for(const key of tasks) {
        if(key.title === secretTitle) {
            let doneTask = {
                userid: userLoggedIn.id,
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

function logUserOut() {
    let users = JSON.parse(localStorage.getItem('user'));
    const allUsers = [];

    if(userLoggedIn.loggedIn === true) {
        userLoggedIn.loggedIn = false;
    
        allUsers.push(userLoggedIn);
    
        if(users) {
            for(let key of users) {
                if(key.mail === userLoggedIn.mail) {
                    continue;
                }
                allUsers.push(key);
            }
        }
        localStorage.setItem('user', JSON.stringify(allUsers));
        location.reload();
        logOut.textContent = 'Log In';
    } else {
        showLogin();
    }
}

function showUserAccount() {
    hideAll();
    account.classList.remove('hidden');

    let userFirstName = document.getElementById('acctFirst');
    let userLastName = document.getElementById('acctLast');
    let userEmail = document.getElementById('acctEmail');
    let userPassword = document.getElementById('acctPass');
    let userid = document.getElementById('userid');

    userFirstName.value = userLoggedIn.firstName;
    userLastName.value = userLoggedIn.lastName;
    userEmail.value = userLoggedIn.mail;
    userid.value = userLoggedIn.id;
    userPassword.value = userLoggedIn.pass;
}

function updateUserAccount() {
    let userFirstName = document.getElementById('acctFirst').value;
    let userLastName = document.getElementById('acctLast').value;
    let userEmail = document.getElementById('acctEmail').value;
    let userPassword = document.getElementById('acctPass').value;
    let userid = document.getElementById('mail').value;

    let users = localStorage.getItem('user');
    let allUsers = [];

    let newUser = {
        'firstName': userFirstName,
        'lastName': userLastName,
        'mail': userEmail,
        'pass': userPassword,
        'checkbox': true,
        'loggedIn': true,
    };
    allUsers.push(newUser);

    if(users) {
        for(let key of users) {
            if(key.id === newUser.userid) {
                continue;
            }
            allUsers.push(key);
        }
    }

    localStorage.setItem("user", JSON.stringify(allUsers));
}

function hideAll() {
    const sections = document.getElementsByClassName('section');
    for(let section of sections) {
        section.classList.add('hidden');
    }
}


// localStorage.removeItem('user');
let userLoggedIn = false;
// let users = JSON.parse(localStorage.getItem('user'));
var users = JSON.parse(localStorage.getItem('user'));

if(users) {
    for(let user of users ){
        if(user.loggedIn === true) {
            userLoggedIn = user;
            break;
        }
    }
}


if(userLoggedIn.loggedIn === true) {
    hideAll();
    showDashboard();
    logOut.textContent = 'Log Out';
    myAccount.classList.remove('hidden');
} else {
    hideAll();
    home.classList.remove('hidden');
    logOut.textContent = 'Log In';
    myAccount.classList.add('hidden');
}
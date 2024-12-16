const register = document.querySelector('.register');
const login = document.querySelector('.login');

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const usernameLogin = document.querySelector('.usernameLogin');
const passwordLogin = document.querySelector('.passwordLogin');

let account = false;
let token = null




function createAccount(){
    register.style.display = 'flex';
    const signUp = document.querySelector('.signUp');
    signUp.addEventListener('click', () => {
        registerForm(username.value, password.value)
            .then((res) => {
                loginForm()
                console.log(res);
            })
    })
}
function loginForm(){
    register.style.display = 'none';
    login.style.display = 'flex';
    document.querySelector('.signIn').addEventListener('click', () => {
        getToken(usernameLogin.value, passwordLogin.value)
            .then((res) => {
                if(res){
                    console.log(res);
                    displayInterfaceList()
                }




            })
    })
}
function displayInterfaceList(){

    const list = document.querySelector('.navListCourses');
    list.style.display = 'flex';
    login.style.display = 'none';
    whoami().then((res) => {
        console.log(res);
        const profil = document.querySelector('.profil');
        profil.innerHTML = res.username;
    })

    getList().then((responses) => {
        console.log(responses);
        responses.forEach((item) => {
            displayListCourses(item)
        })

    })
}
function displayListCourses(item){
    const listCourses = document.querySelector('.navListCourses');
    const divItem = document.createElement('div');
    const nameItems = document.createElement('p');
    const description = document.createElement('p');
    const status = document.createElement('p');
    nameItems.innerHTML = item.name;
    nameItems.classList.add('nameItems');
    description.innerHTML = item.description;

    if(item.status === false){
        status.innerHTML = "en attente";
        status.style.color = 'red';
    }else{
        status.innerHTML = "acheté";
        status.style.color = 'green';
    }

    divItem.classList.add('divItem');
    divItem.appendChild(nameItems);
    divItem.appendChild(description);
    divItem.appendChild(status);

    listCourses.appendChild(divItem);
}


if(!token){
   loginForm();
}


// FETCH
async function registerForm(username, password){
    let params ={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username: username,
            password: password,

        })
    }
    return await fetch(" https://partiel-s1-b1dev-2425.esdlyon.dev/api/register", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

async function getToken(usernameLogin, passwordLogin) {
    let params ={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username: usernameLogin,
            password: passwordLogin,

        })
    }
    return await fetch(" https://partiel-s1-b1dev-2425.esdlyon.dev/api/login", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            token = data.token;
            return token
        })
}

async function whoami(){
    let params ={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

    }
    return await fetch(" https://partiel-s1-b1dev-2425.esdlyon.dev/api/whoami", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data

        })
}

async function getList(){
    let params ={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    return await fetch("https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
}




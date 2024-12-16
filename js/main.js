
const register = document.querySelector('.register');
const login = document.querySelector('.login');

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const usernameLogin = document.querySelector('.usernameLogin');
const passwordLogin = document.querySelector('.passwordLogin');
const btnAdd = document.querySelector('.addItem');
const sendItem = document.querySelector('.sendItem');
const formItem = document.querySelector('.formItem');

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

    const refresh = document.querySelector('.refresh');
    refresh.removeEventListener('click', refreshList);
    refresh.addEventListener('click', refreshList);
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
    btnAddToggle()
    clearAll()
}
function displayListCourses(item){
    const listCourses = document.querySelector('.listCourses');
    const divItem = document.createElement('div');
    divItem.setAttribute('data-id', item.id);
    const nameItems = document.createElement('p');
    const descriptionItems = document.createElement('p');
    const trash = document.createElement('p');
    const status = document.createElement('p');

    listCourses.classList.add('listCourses');
    nameItems.innerHTML = item.name;
    nameItems.classList.add('nameItems');
    descriptionItems.innerHTML = item.description;
    trash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="black"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>`

    if(item.status === false){
        status.innerHTML = "en attente";
        status.style.color = 'red';
    }else{
        status.innerHTML = "acheté";
        status.style.color = 'green';
    }

    divItem.classList.add('divItem');
    divItem.appendChild(nameItems);
    divItem.appendChild(descriptionItems);
    divItem.appendChild(status);
    divItem.appendChild(trash);

    listCourses.appendChild(divItem);

    status.addEventListener('click', () => {
        changeStatus(item, status);
    })
    trash.addEventListener('click', () => {
        deleteFromList(item)
    })

}
function refreshList() {
    console.log('vide')

    const listContainer = document.querySelector('.listCourses');
    listContainer.innerHTML = '';
    getList().then(items => {

        items.forEach(item => {
            displayListCourses(item);
        });
    });
}



function deleteFromList(item){
    deleteItem(item.id).then((res)=>{
        console.log(res);
        if(res.success){
            const divItems = document.querySelectorAll('.divItem');
            divItems.forEach(divItem => {

                console.log(divItem.getAttribute('data-id'));
                if(divItem.getAttribute('data-id') == item.id){ //compare l'attribut data-id avec Id de l'item
                    divItem.remove();



                }

            })

        }
    })
}

function changeStatus(item, status){
    switchStatus(item.id).then((res) => {
        console.log(res);
        if(res.status === false){
            status.innerHTML = "en attente";
            status.style.color = 'red';
        }else{
            status.innerHTML = "acheté";
            status.style.color = 'green';
        }

    })
}
function btnAddToggle(){
    const nameAddItem = document.querySelector('.nameAddItem');
    const descriptionAddItem = document.querySelector('.descriptionAddItem');


    btnAdd.addEventListener('click', ()=>{

        formItem.style.display = 'flex';
        sendItem.addEventListener('click', ()=>{
            addItemToList(nameAddItem.value, descriptionAddItem.value);
            clearForm()
        })

    })
}

function addItemToList(nameAddItem, descriptionAddItem){
    getItem(nameAddItem, descriptionAddItem).then((responses) => {
        if(responses && responses.name){
            displayListCourses(responses);
        }


    })
}
function clearForm(){
    const nameAddItem = document.querySelector('.nameAddItem');
    const descriptionAddItem = document.querySelector('.descriptionAddItem');

    nameAddItem.value = '';
    descriptionAddItem.value = '';
    const formItem = document.querySelector('.formItem');
    formItem.style.display = 'none';
}
function clearAll(){
    const clear = document.querySelector('.clearAll');
    clear.addEventListener('click', ()=>{
        getClean().then((data)=>{
            refreshList()
        })
    })
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
    return await fetch("https://partiel-s1-b1dev-2425.esdlyon.dev/api/login", params)
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

async function switchStatus(id){
    let params ={
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    return await fetch(`https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/switchstatus/${id}`, params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
}
async function deleteItem(id){
    let params ={
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    return await fetch(`https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/delete/${id}`, params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })

}
async function getItem(nameAddItem, descriptionAddItem){
    let params ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
            name : nameAddItem,
            description : descriptionAddItem
        })
    }
    return await fetch("https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/new", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })

}
async function getClean(){
    let params ={
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },

    }
    return await fetch("https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/clear", params)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })

}











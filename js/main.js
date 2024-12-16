const register = document.querySelector('.register');
const login = document.querySelector('.login');

const username = document.querySelector('.username');
const password = document.querySelector('.password');

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
        getToken(username.value, password.value)
            .then((res) => {
                console.log(res);
            })
    })
}
loginForm()


//if(!account){
   // createAccount();
//}


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

async function getToken(username, password) {
    let params ={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username: "emilie",
            password: "ghjklmwx",

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


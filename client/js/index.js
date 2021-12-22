import {BASE_URL, displayMessage, convertDateToYearMonthDate} from "./tools.js"

const buttomSignUp = document.getElementById("button-sign-up");
const buttomLogIn = document.getElementById("button-log-in");

// id, name
const getGroups = async () => {
    const token = sessionStorage.getItem("token");   
    console.log({token});
    
    try {
        const groups = await fetch(`${BASE_URL}/accounts/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        
        const groupsJson = await groups.json();
        // console.log(groupsJson);
        
        return groupsJson;
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

const signUpUser = async (userObject) => {
    try {
        rez = await fetch(`${BASE_URL}/auth/register`, {
            headers: {"content-type": "application/json"},
            method: 'POST',
            body: JSON.stringify(userObject)
        });
        
        return await rez.json();
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return error;
    }
}

const logInUser = async (userObject) => {
    try {
        const rez = await fetch(`${BASE_URL}/auth/login`, {
            headers: {"content-type": "application/json"},
            method: 'POST',
            body: JSON.stringify(userObject)
        });
        
        const data = await rez.json();
        
        if (data.error) throw new Error(data.error);

        sessionStorage.setItem("token", data.token);
        console.log(`Login token: ${data.token}`);
        // displayMessage(`Log in successfully`, true); 
        return data;
    } catch (error) {
        sessionStorage.setItem("token", "");
        console.error(`Error: ${error.message}`);
        // displayMessage(`Error: ${rez.errors[0].msg}, ${rez.errors[0].param}`, false); 
    }
}

const logInSignUpUser = async (signUp) => {
    
    const modalElement = document.getElementById("user-modal");
    const modalCloseButton = document.getElementsByClassName("modal-close")[0];
    const modalCancelButton = document.getElementsByClassName("js-modal-cancel")[0];
    const modalContent = document.getElementsByClassName("modal-content")[0];
    const formElement = document.getElementById("js-form-register");
    const contFullName = document.getElementById("container-fullname");
    const contConfirmPassword = document.getElementById("container-confirm_password");
    const elementConfirmPassword = document.getElementById("modal-confirm_password");
    const elementPassword = document.getElementById("modal-password");
    const elementMessage = document.getElementById("modal-message");
    const modalSubmit = document.getElementById("modal-submit-button");
    const modalEmail = document.getElementById("modal-email");
    const modalPassword = document.getElementById("modal-password");
    console.log({signUp});
    modalContent.style.width = "95%";
    
    modalCloseButton.onclick = () =>{
        modalElement.style.display = "none";
    }
    
    modalCancelButton.onclick = (event) =>{
        event.preventDefault(); 
        modalElement.style.display = "none";
    }
    
    window.onclick = (event) =>{
        if (event.target.className == "modal-background") {
            modalElement.style.display = "none";
        }    
    }
    
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const formData = new FormData(formElement);
        
        const userObject = {
            email: formData.get('email'),
            password: formData.get('password')
        };
    
        console.log(`Modal Form submit signUp: ${signUp}`);
        if(signUp){
            if(elementPassword.value !== elementConfirmPassword.value){
                elementMessage.style.color = 'red';
                elementMessage.innerHTML = `Passwords Don't Match!`;
                return false;
            }
            else{
                elementMessage.innerHTML = ``;
            }
            const userObject = {
                full_name: formData.get('full_name'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            const rez = await signUpUser(userObject);
        }else{
            const userObject = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            const rez = await logInUser(userObject);
        }
        
        modalElement.style.display = "none";
        await getAndDisplayTutorials();
       
    });
    
    if(!signUp) {
        contFullName.hidden = true;
        contConfirmPassword.hidden = true;
        modalSubmit.innerHTML ="Log In";
    }
    else{
        contFullName.hidden = false;
        contConfirmPassword.hidden = false;
        elementMessage.innerHTML = ``;
        modalSubmit.innerHTML ="Submit";
    }
    
    console.log(`modalEmail.val: ${modalEmail.innerHTML}`);
    modalEmail.value = "";
    modalPassword.value = "";   
     
    modalElement.style.display = "block";      
};

const displayGroups = (tutorials) => {
    const tutorialsWraper = document.querySelector(".js-tutorials-wrapper");
    tutorialsWraper.innerHTML = '';
    const elements = tutorials.map((tutorial) => {
        const tutorialElement = document.createElement('div');
        tutorialElement.className = "column is-3";   
        
        const tutorialElementChild = document.createElement('div');
        tutorialElementChild.className = 'box';
        
        const tutorialTitle = document.createElement('H1');
        tutorialTitle.className = 'is-size-6';
        tutorialTitle.innerHTML = `ID: ${tutorial.id}`;
        
       
        const tutorialContent = document.createElement('p');
        tutorialContent.className = 'is-size-7 mt-1';
        tutorialContent.innerHTML = tutorial.name;
      
        tutorialElementChild.append(tutorialTitle,  tutorialContent);
        tutorialElement.append(tutorialElementChild);
        tutorialsWraper.append(tutorialElement);
    });
}

const getAndDisplayGroups = async () => {
    const groups = await getGroups();
    console.log(groups);
    console.log(groups.groups);
    
    displayGroups(groups.groups);
}


buttomSignUp.onclick = (event) =>{
    // event.preventDefault(); 
    logInSignUpUser(1);
}

buttomLogIn.onclick = (event) =>{
    logInSignUpUser(0);
}

getAndDisplayGroups();

import {BASE_URL, displayMessage} from "./tools.js"

const formElement = document.getElementById("js-form-register");

// id, name
const getGroups = async () => {
    const token = sessionStorage.getItem("token");   
    console.log({token});
    
    try {
        const groups = await fetch(`${BASE_URL}/accounts/groups`, {
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

const addGroup = async (groupObject) => {
    const token = sessionStorage.getItem("token");  
    
    try {
        const res = await fetch(`${BASE_URL}/accounts/`, {
            headers: {"content-type": "application/json",
                      authorization: `Bearer ${token}`, 
            },
            method: 'POST',
            body: JSON.stringify(groupObject)
        });
        // console.log(`OK: ${res.ok}`);
        return res.json();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        
    }
}

// group_id
formElement.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const formData = new FormData(formElement);
    
    const groupObject = {
        group_id: formData.get('group_id'),
    };

    const rez = await addGroup(groupObject);
    // console.log({rez});
    // console.log(rez.ok);
    if (rez.errors) {
        displayMessage(`Error: ${rez.errors[0].msg}, ${rez.errors[0].param}`, false); 
    }
    else{
        displayMessage(`Your group added successfully`, true); 
    }
    getAndDisplayGroups();
});

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
    // console.log(groups);
    // console.log(groups.groups);
    
    displayGroups(groups.groups);
}

getAndDisplayGroups();

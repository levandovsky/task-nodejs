import {BASE_URL, displayMessage} from "./tools.js"

const formElement = document.getElementById("js-form-register");
// const containerGroupId = document.getElementById("container-group_id");
// containerGroupId.hidden = true;

// id, name
const getBills = async () => {
    const token = sessionStorage.getItem("token");   
    const group_id = sessionStorage.getItem("group_id");   
    console.log({group_id});
    
    try {
        const bills = await fetch(`${BASE_URL}/bills/id/${group_id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        
        const billsJson = await bills.json();
        // console.log(groupsJson);
        
        return billsJson;
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

const addBill = async (billObject) => {
    const token = sessionStorage.getItem("token");  
    
    try {
        const res = await fetch(`${BASE_URL}/bills/`, {
            headers: {"content-type": "application/json",
                      authorization: `Bearer ${token}`, 
            },
            method: 'POST',
            body: JSON.stringify(billObject)
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
    const group_id = sessionStorage.getItem("group_id");  
    const formData = new FormData(formElement);
    
    const billObject = {
        group_id: group_id,
        amount: formData.get('amount'),
        description: formData.get('description'),
    };

    const rez = await addBill(billObject);
    // console.log({rez});
    // console.log(rez.ok);
    if (rez.errors) {
        displayMessage(`Error: ${rez.errors[0].msg}, ${rez.errors[0].param}`, false); 
    }
    else{
        displayMessage(`Your bill added successfully`, true); 
    }
    getAndDisplayBills();
});

const displayBills = (tutorials) => {
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
        tutorialContent.innerHTML = tutorial.description;
      
        const tutorialAmount = document.createElement('p');
        tutorialAmount.className = 'is-size-7 mt-1';
        tutorialAmount.innerHTML = `&#x20AC; ${tutorial.amount}`;
      
        tutorialElementChild.append(tutorialTitle,  tutorialContent, tutorialAmount);
        tutorialElement.append(tutorialElementChild);
        tutorialsWraper.append(tutorialElement);
    });
}

const getAndDisplayBills = async () => {
    const bills = await getBills();
    // console.log(groups);
    // console.log(groups.groups);
    
    displayBills(bills.bills);
}

getAndDisplayBills();

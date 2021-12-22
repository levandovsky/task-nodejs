export const BASE_URL = "http://localhost:8080";


const deletMessage = (element) => {
    element.className = "";
    element.innerHTML = "";
};

export const displayMessage = (message, type) => {
    const notificationWrapper = document.getElementById("notification-wrapper")
    deletMessage(notificationWrapper);
    
    const messageType = type ? "notification is-success is-light" : "notification is-danger is-light";
    
    const buttonDelete = document.createElement('button');
    buttonDelete.id = "delete-message";
    buttonDelete.className = "delete";
    notificationWrapper.className = messageType;
    notificationWrapper.innerHTML = message;
    
    buttonDelete.addEventListener("click", () =>{
        deletMessage(notificationWrapper);
    });
    
    notificationWrapper.append(buttonDelete);
    
}

export const addDateZero = (element) => {
  return element.toString().length < 2 ? "0" : "";  
};

export const convertDateToYearMonthDate = (date) => {
    return date.getFullYear() + '-' + addDateZero(date.getMonth()) + date.getMonth() + '-' + addDateZero(date.getDate()) + date.getDate();
}


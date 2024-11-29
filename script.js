document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");
    const recordList = document.getElementById("recordList");

    //gets the data from local storage -> returns empty array if no data
    const getData = () => {
        return JSON.parse(localStorage.getItem("students")) || [];
    }

    //save data to local storage
    const saveData = (data) => {
        localStorage.setItem("students", JSON.stringify(data));
    }

    //updates the table with the student data
    const addDataToTable = () => {
        const data = getData();
        recordList.innerHTML = ''; //clear table before new data

        //create new row for each entry
        data.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.ID}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
            </td>`
        recordList.appendChild(row);
        });
    };

    //adds new record to the table
    const addStudent = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const ID = document.getElementById("ID").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();
        
        //validate name to not have mumeric values
        const regex = /^[a-zA-Z\s]+$/;
        if(!regex.test(name)) {
            alert("Name should only contain letters and spaces");
            return;
        }
        if (!name || !ID || !email || !contact){
            alert("One of the following is missing: name, ID, email, contact");
            return;
        }

        const data = getData();
        data.push({name, ID, email, contact});
        saveData(data);
        form.reset();
        addDataToTable();
    };

    //edit functionality
    window.editStudent = (index) => {
        const data = getData();
        const student = data[index];
        document.getElementById("name").value = student.name;
        document.getElementById("ID").value = student.ID;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;
        data.splice(index, 1);
        saveData(data);
        addDataToTable();
    };

    //delete functionality
    window.deleteStudent = (index) => {
        const data = getData();
        data.splice(index, 1);
        saveData(data);
        addDataToTable();
    };

    form.addEventListener("submit", addStudent);
    addDataToTable();
});
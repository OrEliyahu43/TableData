
const mainURL = 'https://capsules-asb6.herokuapp.com/api/teacher/toam';
const userIdData = 'https://capsules-asb6.herokuapp.com/api/user'
const table = document.querySelector('table');
let currentEdit = null;

async function fetchData(url1, url2) {
    const tableHead = document.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    const response = await fetch(url1)
    const dataRepo = await response.json();

    
    tableBody.innerHTML = ""
    for (row of dataRepo) {
        const id = row.id;
        const responseUser = await fetch(`${url2}/${id}`)
        const responseUserData = await responseUser.json();
        const rowElement = document.createElement('tr');


        for (key in responseUserData) {
            const cellElement = document.createElement('td');
            cellElement.textContent = responseUserData[key];
            rowElement.appendChild(cellElement);

        }
        const editButtonElement = document.createElement('td')
        const editBtn = document.createElement('button')
        editBtn.innerText = 'Edit'
        editButtonElement.appendChild(editBtn);

        const removeButtonElement = document.createElement('td')
        const removeBtn = document.createElement('button')
        removeBtn.innerText = 'Remove'
        removeButtonElement.appendChild(removeBtn);
        rowElement.append(removeButtonElement, editButtonElement)


        removeBtn.addEventListener('click', () => {
            rowElement.remove();
        })


        table.appendChild(rowElement);
        editBtn.addEventListener('click', function () {
            editRow(rowElement, editBtn, removeBtn)
            this.removeEventListener('click', arguments.callee);
        });

    }

}


function editRow(row, editbtn, removebtn) {
    console.log("I am working")
    const fields = row.querySelectorAll('td');
    for (let i = 1; i < fields.length - 2; i++) {
        const input = document.createElement('input');
        input.value = fields[i].textContent;
        fields[i].innerHTML = '';
        fields[i].appendChild(input);

    }
    removebtn.innerText = 'cancel'
    editbtn.innerText = 'confirm'


    this.removeEventListener('click', arguments.callee);

    editbtn.addEventListener('click', () => { confirmChange(row, editbtn, removebtn) })

}


function confirmChange(row, editbtn, removebtn) {

    const fields = row.querySelectorAll('td');
    for (let i = 1; i < fields.length - 2; i++) {
        const input = fields[i].querySelector('input');
        const textField = input.value;
        console.log("check", textField);
        fields[i].textContent = textField;
        input.remove()


    }

    removebtn.innerText = 'remove';
    editbtn.innerText = 'edit';



}


fetchData(mainURL, userIdData);


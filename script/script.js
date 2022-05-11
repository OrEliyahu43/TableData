
const mainURL = 'https://capsules-asb6.herokuapp.com/api/teacher/toam';
const userIdData = 'https://capsules-asb6.herokuapp.com/api/user'
const table = document.querySelector('table');


async function fetchData(url1,url2) {
    const tableHead = document.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    const response = await fetch(url1)
    const dataRepo = await response.json();

    // console.log(dataRepo);
    // const id = dataRepo[0].id;
    // const responseUser = await fetch(`${url2}/${id}`)
    // const responseUserData = await responseUser.json();
    

    //clear table
    tableBody.innerHTML = ""
    for(row of dataRepo){
        const id = row.id;
        const responseUser = await fetch(`${url2}/${id}`)
        const responseUserData = await responseUser.json();
        const rowElement = document.createElement('tr');
        
        
        for(key in responseUserData){
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
        editBtn.addEventListener('click', () => {editRow(rowElement,removeBtn,editBtn)});
        
    }

}

function editRow(row,removebtn,editbtn){
    const fields = row.querySelectorAll('td');
    for(let i=1; i < fields.length-2 ; i++){
        const input = document.createElement('input');
        input.value = fields[i].textContent;
        fields[i].innerHTML = '';
        input.focus();
        fields[i].appendChild(input);
        
    }
    removebtn.innerText = 'cancel'
    editbtn.innerText = 'confirm'

    editbtn.addEventListener('click', () => {confirmChange(row ,editbtn,removebtn)})
}


function confirmChange(row,editbtn,removebtn){

    const fields = row.querySelectorAll('td');
    for(let i=1; i < fields.length-2 ; i++){
        const input = fields[i].querySelector('input');
        console.log(input)
        // console.log(row.querySelectorAll('td'));
        // console.log(fields);
        // console.log(fields[i]);
        // console.log(input);
        // console.log(textField);
        fields[i].textContent = textField;
        // input.remove()

        
    }
    removebtn.innerText = 'remove';
    editbtn.innerText = 'edit';

    // function cancelEdit(rowElement){

    // }

}


fetchData(mainURL,userIdData);


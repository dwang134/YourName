//READ
document.addEventListener('DOMContentLoaded', ()=> {
    fetch('https://yourname-mysql.herokuapp.com/getAll')
    .then(response=> response.json())
    .then(data=> loadHTMLTable(data['data']));
})

//click event handle
document.querySelector('table tbody').addEventListener('click', (event)=> {
    // console.log(event.target);
    if (event.target.id == "delete-btn"){
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.id === "edit-btn"){
        editRowById(event.target.dataset.id);
    }
});

//SEARCH
const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function(){
    const searchValue = document.querySelector('#search-input').value;

    if (!searchValue){
        fetch('https://yourname-mysql.herokuapp.com/getAll')
        .then(response=> response.json())
        .then(data=> loadHTMLTable(data['data']));
    }else{
        fetch('https://yourname-mysql.herokuapp.com/search/'+ searchValue)
        .then(response=> response.json())
        .then(data=> loadHTMLTable(data['data']));
    }
}


//UPDATE
const editRowById= (id) => {
    //toggle visibility
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;

    document.querySelector('#update-name-input').dataset.id = id;
}

const updateBtn = document.querySelector('#update-btn');

updateBtn.onclick = () => {
    const updatedName= document.querySelector('#update-name-input');
    fetch('https://yourname-mysql.herokuapp.com/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updatedName.dataset.id,
            name: updatedName.value
        })
    })
    .then(res=> res.json())
    .then(data => {
        if (data.success){
            location.reload();
        }
    })
}


//DELETE
const deleteRowById= (id) => {
    fetch('https://yourname-mysql.herokuapp.com/delete/' + id, {
        method: 'DELETE'
    })
    .then(res=> res.json())
    .then(data=> {
        if (data.success){
            location.reload();
        }
    });
}

//CREATE
const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = ()=> {
    const nameInput= document.querySelector('#name-input');
    const name = nameInput.value;
    if (!name){
        alert('Please enter a valid name');
    }else{
            //clear
    nameInput.value = "";
    fetch('https://yourname-mysql.herokuapp.com/insert',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
    })
    .then(res=> res.json())
    .then(data => insertRowIntoTable(data['data']));
    }
}

const insertRowIntoTable = (data)=> {
    const table = document.querySelector('table tbody');
    const isTableData= table.querySelector('.no-data');
    let tableHTML= "<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>";

    for (var key in data){
        if (data.hasOwnProperty(key)){
            if(key === 'dateAdded'){
                data[key] = new Date(data[key]).toLocaleString();
            }
            if(key === 'id'){
                tableHTML+=  `<th class= 'px-6 py-4'>${data[key]}</th>`
            }else{
                tableHTML+= `<td class= 'px-6 py-4'>${data[key]}</td>`
            }
        }    
    }

    // const keys= Object.keys(data); //convert obj to key array
    // console.log(keys);

    tableHTML+= `<td class= 'px-6 py-4 text-right'><a href= '#' id= 'edit-btn' class= 'font-medium text-blue-600 dark:text-blue-500' data-id=${data.id}>Edit</a></td>`
    tableHTML+= `<td class= 'px-6 py-4 text-right'><a href= '#' id= 'delete-btn' class= 'font-medium text-blue-600 dark:text-blue-500' data-id=${data.id}>Delete</a></td>`
    tableHTML+= "</tr>"

    if (isTableData){
        table.innerHTML = tableHTML;
    }else{
        const newRow= table.insertRow();
        newRow.innerHTML = tableHTML;

    }
}


const loadHTMLTable = (data)=> {
    const table = document.querySelector('table tbody');
    if (data.length=== 0){
        console.log('no data');
        table.innerHTML =
        "<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'><td class='no-data text-white font-medium text-center' colspan='5'>No Data</td></tr>";
    }else{
    let tableHTML = "";
    data.forEach(function ({id, name, date_added}){
        tableHTML+= "<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>";
        tableHTML+= `<th class= 'px-6 py-4'>${id}</th>`
        tableHTML+= `<td class= 'px-6 py-4'>${name}</td>`
        tableHTML+= `<td class= 'px-6 py-4'>${new Date(date_added).toLocaleString()}</td>`
        tableHTML+= `<td class= 'px-6 py-4 text-right'><a href= '#' id= 'edit-btn' class= 'font-medium text-blue-600 dark:text-blue-500' data-id=${id}>Edit</a></td>`
        tableHTML+= `<td class= 'px-6 py-4 text-right'><a href= '#' id= 'delete-btn' class= 'font-medium text-blue-600 dark:text-blue-500' data-id=${id}>Delete</a></td>`
        tableHTML+= "</tr>";
    });
    table.innerHTML = tableHTML;
    }   
}
document.addEventListener('DOMContentLoaded', ()=> {
    fetch('http://localhost:5000/getAll')
    .then(response=> response.json())
    .then(data=> loadHTMLTable(data['data']));
})

const addBtn = document.querySelector('#add-name-btn');

addBtn.onlick = ()=> {
    const nameInput= document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";
    fetch('http://localhost:5000/insert',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
    })
    .then(res=> res.json())
    .then(data=> )
    
}

const insertRowIntoTable(data) => {
    
}

const loadHTMLTable = (data)=> {
    const table = document.querySelector('table tbody');
    // let tableHTML = "";
    console.log(data);
    if (data.length=== 0){
        console.log('no data');
        table.innerHTML =
          "<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'><td class='no-data text-white font-medium text-center' colspan='5'>No Data</td></tr>";
    }
}
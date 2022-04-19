document.addEventListener('DOMContentLoaded', ()=> {
    loadHTMLTable([]);
})

const loadHTMLTable = (data)=> {
    const table = document.querySelector('table tbody');
    // let tableHTML = "";
    if (data.length=== 0){
        console.log('no data');
        table.innerHTML =
          "<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'><td class='no-data text-white font-medium text-center' colspan='5'>No Data</td></tr>";
    }
}
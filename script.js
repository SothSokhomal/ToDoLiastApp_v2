import PocketBase from './pocketbase.es.mjs'

const url = 'https://skill-canal.pockethost.io/'
const client = new PocketBase(url)
// console.log(client)

// // // get all records
async function getAllrecord(){
    const records = await client.collection('todolistapp').getFullList()
    return records
} 
// // display all task
async function displayAllTask(){
    const tasks = await getAllrecord()
    console.log(tasks)
    const wrapper = document.querySelector('.tasks-wrapper')
    wrapper.innerHTML = ``
    for(let i = 0; i < tasks.length; i++){
        let currentTask = tasks[i]
        wrapper.innerHTML += `
        
       <div class="tasks-wrapper">
            <div class="task">
                <p>${currentTask.name}</p>
                <div class="bthgp">
                
                    <button id="edit" data-recordid = "${currentTask.id}">EDIT</button>
                    <button id="delete" data-recordid = "${currentTask.id}">DELETE</button>
                </div>
            </div>
           
        </div>
        `
   }
   adddelbtn()
}

// delete the task
function adddelbtn(){
    const deleteBtns = document.querySelectorAll('#delete')
    for(let i = 0; i < deleteBtns.length; i++){
        let currentDelBtn = deleteBtns[i]
        currentDelBtn.addEventListener('click', async () =>{
            const id = currentDelBtn.dataset.recordid
            console.log(id)
            await client.collection('todolistapp').delete(id)
            displayAllTask()
        })
}
}

// add new task
function AddNewTask(){
    const form = document.querySelector('#form')
    form.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const name = document.querySelector('#name')
    const addbtn = document.querySelector('#ADD')
    const data = {
        "name": name.value,
    };
    addbtn.addEventListener('click', async () =>{
        const record = await client.collection('todolistapp').create(data);
        alert('New data added!')
    })
    name.value = ``
    displayAllTask()

})

}

// edit new task



window.addEventListener("DOMContentLoaded", async () => {
    console.log("everything is ready")
    //  console.log(client)
    displayAllTask()
    AddNewTask()
    
});
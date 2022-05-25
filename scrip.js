let btnAdd =document.querySelector('.add')
let taskName=document.querySelector('#content')
clearAll = document.querySelector(".clear")
let tasks=getTasks()
renderTask(tasks)

btnAdd.addEventListener('click',function(){
    if(!taskName.value){
        alert("PLEASE ADD TASk")
        return false
    }
    let taskId=this.getAttribute('id')
    let tasks=getTasks()
    let task ={name:taskName.value,status: 0 }
    if(taskId==0 || taskId){
        tasks[taskId]= task
        this.removeAttribute('id')
    }
    else{
    tasks.push(task)
    }
    console.log(tasks)
    taskName.value=''
    localStorage.setItem('tasks',JSON.stringify(tasks))
    renderTask(tasks)
    console.log(task)
})
function editTask(id){
    let tasks=getTasks()
    taskName.value=tasks[id].name
    btnAdd.setAttribute('id',id)
}
function deleteTask(id){
    if(confirm('Are you sure you want to delete?')){
        let tasks=getTasks()
        tasks.splice(id,1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(getTasks())
    }

}
function renderTask(tasks=[]){
    let content='<ul>'
    tasks.forEach((task,index) =>{
        if(task.status==1){
            completed='checked'
        }
        else{
            completed=''
        }
        content +=`<li> 
        <input onclick="updateStatus(${index})" type="checkbox" id="${index}" ${completed}>
        <div class="task-name"> ${task.name} </div> 
        <a href="#" onclick="editTask(${index})">Edit </a> 
        <a href="#" onclick="deleteTask(${index})">Delete</a>
        </li>`
    })
    content+='</ul>'
    document.querySelector('#result').innerHTML=content
}
function getTasks(){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :[]
}
function updateStatus(id) {
    let tasks=getTasks()
     if(tasks[id].status==0){
        tasks[id].status=1
        }
        else{
            tasks[id].status=0
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(getTasks())
  
}
clearAll.addEventListener("click", () => {
    let tasks=getTasks()
    tasks.splice(0,tasks.length)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    renderTask(getTasks())
});
'use strict';

function rednerTaskLayout(task) {
    return`
        <div class="card">
            <div class="icon-wrapper">
                <a class="left-icon icon">
                    <img src="static/assets/chevron-left-solid.svg" />
                </a>
                <a class="right-icon icon">
                    <img src="static/assets/chevron-right-solid.svg" />
                </a>
                <a class="trash-icon icon">
                    <img src="static/assets/trash-solid.svg" />
                </a>
            </div>
            <div class="title" data-id="${task.id}" data-section="${task.column}"">
                <p>${ task.text }</p>
            </div>
        </div>`
    ;
}

async function getTasks() {
    const url = '/cards';
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderTasks() {
    const Tasks = await getTasks();
    let todoHtml = '';
    let htmlInProgress = '';
    let htmlDone = '';
    Tasks.forEach(task => {
        console.log(task.column);
        if (task.column == 1) {
            const htmlTodoSegment = rednerTaskLayout(task);
            todoHtml += htmlTodoSegment;            
        }
        if (task.column == 2) {
            const htmlInProgressSegment = rednerTaskLayout(task);
            htmlInProgress += htmlInProgressSegment;            
        }
        if (task.column == 3) {
            const htmlDoneSegment = rednerTaskLayout(task);
            htmlDone += htmlDoneSegment;            
        }
    });  
    const toDoContainer = document.getElementById('toDo')
    toDoContainer.innerHTML = todoHtml;
    const inProgressContainer = document.getElementById('inProgress')
    inProgressContainer.innerHTML = htmlInProgress;
    const doneContainer = document.getElementById('done')
    doneContainer.appen = htmlDone;
}


renderTasks();
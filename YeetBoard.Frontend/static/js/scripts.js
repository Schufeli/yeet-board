'use strict';

let text = "";
let htmlCard = 
    `<div class="card">
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
        <div class="title">
            <p>${ text }</p>
        </div>
    </div>`;
fetch('/cards')
  .then(response => response.json())
  .then(data => console.log(data))
  .then({
      
  });

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
            let htmlTodoSegment = `
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
                </div>`;
            todoHtml += htmlTodoSegment;            
        }
        if (task.column == 2) {
            let htmlInProgressSegment = `
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
                </div>`;
            htmlInProgress += htmlInProgressSegment;            
        }
        if (task.column == 3) {
            let htmlDoneSegment = `
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
                </div>`;
            htmlDone += htmlDoneSegment;            
        }
    });  
    const toDoContainer = document.getElementById('toDo')
    toDoContainer.innerHTML = todoHtml;
    const inProgressContainer = document.getElementById('inProgress')
    inProgressContainer.innerHTML = htmlInProgress;
    const doneContainer = document.getElementById('done')
    doneContainer.innerHTML = htmlDone;
}
renderTasks();
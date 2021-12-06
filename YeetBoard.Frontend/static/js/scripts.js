'use strict';


// call Main Taks Render Function
renderTasks();

// Redner the Layout of the Task
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
                <a class="trash-icon icon" onclick="deleteCard">
                    <img src="static/assets/trash-solid.svg" />
                </a>
            </div>
            <div class="title" data-id="${task.id}" data-section="${task.column}"">
                <p>${ task.text }</p>
            </div>
        </div>`
    ;
}

// get Tasks from Api
async function getTasks() {
    const url = '/cards';
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

// Render logic aspect of the Task with Sections
async function renderTasks() {
    const Tasks = await getTasks();
    let todoHtml = '';
    let htmlInProgress = '';
    let htmlDone = '';
    const toDoContainer = document.getElementById('toDo');
    toDoContainer.innerHTML = "";
    const inProgressContainer = document.getElementById('inProgress');
    inProgressContainer.innerHTML = "";
    const doneContainer = document.getElementById('done');
    doneContainer.innerHTML = "";
    Tasks.forEach(task => {
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
    toDoContainer.insertAdjacentHTML('beforeend', todoHtml);
    inProgressContainer.insertAdjacentHTML('beforeend',htmlInProgress);
    doneContainer.insertAdjacentHTML('beforeend',htmlDone);
}

setInterval(() => {
    const cards = document.getElementsByClassName('trash-icon');
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener('click', deleteCard)
    }
}, 500);

//TODO Delete Card
function deleteCard() {
    const uuid = getUuid(this);
    fetch(`/cards/${ uuid }`, { method: 'DELETE' })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            renderTasks();
            console.error('Delete successful');
        })
        .catch(error => {
            // element.parentElement.innerHTML = `Error: ${error}`;
            console.error('There was an error!', error);
        });
    console.log(getUuid(this));
}
function getUuid(el) {
    return el.closest(".card").querySelector(".title").getAttribute("data-id");
}

//TODO Move Left Card

//TODO Move Right Card

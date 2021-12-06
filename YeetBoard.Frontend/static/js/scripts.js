'use strict';

// set interval to add event listener everytime
setInterval(() => {
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const trashIcon = card.querySelector(".trash-icon")
        const leftIcon = card.querySelector(".left-icon")
        const rightIcon = card.querySelector(".right-icon")
        trashIcon.addEventListener('click', deleteCard)
        leftIcon.addEventListener('click', moveLeft)
        rightIcon.addEventListener('click', moveRight)
    }
}, 500);

// const addButtons = document.getElementsByClassName('add-icon');
// for (let i = 0; i < addButtons.length; i++) {
//     const addButton = addButtons[i];
//     addButton.addEventListener('click', addCard)
// }

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

//Delete Card with uuid and render tasks again
function deleteCard() {
    const uuid = getUuid(this);
    fetch(`/cards/${ uuid }`, { method: 'DELETE' })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            renderTasks();
            // TODO give User some Info that it deleted successfully
            console.log('Delete successful');
        })
        .catch(error => {
            // TODO give User some Info that it deleted not correctly
            console.error('There was an error with the Request!', error);
        });
}

// TODO: Update Card / function that you can call for almoust everything. Update text and position
function updateCard(el, position, text) {
    const uuid = getUuid(el);
    const data = `
        {
            "id": "${uuid}",
            "text": "${text}",
            "column": ${parseInt(position)}
        }
    `;
    fetch(`/cards`, { 
            method: 'PUT',
            body: JSON.parse(data)
        })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            renderTasks();
            // TODO give User some Info that it deleted successfully
            console.log('Updated successful');
        })
        .catch(error => {
            // TODO give User some Info that it deleted not correctly
            console.error('There was an error with the Request!', error);
        });
}
// Getting UUID from Object Data
function getUuid(el) {
    return el.closest(".card").querySelector(".title").getAttribute("data-id");
}
// Getting current position from Object Data returns 1, 2 or 3
function getCurrentPosition(el) {
    return el.closest(".card").querySelector(".title").getAttribute("data-section");
}
// Getting current text (non html) from Object Data
function getCurrentText(el) {
    console.log(el.closest(".card").querySelector(".title").innerText);
    return el.closest(".card").querySelector(".title").innerText;
}
//Move Left function for Card
function moveLeft() {
    const currentPositon = parseInt(getCurrentPosition(this));
    const currentText = getCurrentText(this);
    const nextPosition = currentPositon - 1;
    updateCard(this, nextPosition, currentText);
}
//Move Right function for Card
function moveRight() {
    const currentPositon = parseInt(getCurrentPosition(this));
    const currentText = getCurrentText(this);
    const nextPosition = currentPositon + 1;
    updateCard(this, nextPosition, currentText);
}

//jquery for Modal 
$('#taskModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget);
  const state = button.data('state');
  const modal = $(this);
  modal.find('.modal-title').text('New Task for ' + state);
  modal.find('.modal-body input').val(state);
});

$('#taskModal #save').on('click', function() {
    const title = $('#taskModal').children('#title-text');
    console.log(title.text());
    console.log(title);
    const column ='';
    $('#taskModal').modal('hide');
});
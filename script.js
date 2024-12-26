
const inputText = document.querySelector('.inputText');
const btn = document.querySelector('.btnAdd');
const elementBlock = document.querySelector('.list');
const arrayMassage = JSON.parse(localStorage.getItem('tasks')) || [];
function loadTasks() {
    arrayMassage.forEach(task => {
        const htmlLi = `<div id='${task.id}' class='element'>  
                            <span>${task.time}</span>
                            <div class='elementBlockFlex'>
                                <p class='text'>${task.value}</p> 
                                <button class='check ${task.completed ? 'active' : ''}'><i class="fa-solid fa-check"></i></button>
                                <button class='del'><i class="fa-solid fa-xmark"></i></button>
                            </div>     
                        </div>`;
        elementBlock.insertAdjacentHTML('beforeend', htmlLi);
    });
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(arrayMassage));
}
btn.addEventListener('click', getValue);
function getValue() {
    const value = inputText.value.trim();
    const time = new Date().toLocaleTimeString()
    if(value.length < 1) {
        return alert('Введите задачу которую хотите выполнить!')
    } else {
        const userTask = {
            id: Date.now(),
            value:  value,
            time: time,
            completed: false,
        }
        arrayMassage.push(userTask);
        console.log(arrayMassage)
        const htmlLi = `<div id='${userTask.id}' class='element'>  
                            <span>${time}</span>
                            <div class='elementBlockFlex'>
                                <p class='text'>${value}</p> 
                                <button class='check'><i class="fa-solid fa-check"></i></button>
                                <button class='del'><i class="fa-solid fa-xmark"></i></button>
                            </div>     
                        </div>`
        elementBlock.insertAdjacentHTML('beforeend', htmlLi)
        inputText.focus();
        inputText.value = '';
        saveTasks()
    }
};


function showComplete (event) {
    
}
elementBlock.addEventListener('click', (event) =>  {
    const checkButton = event.target.closest('.check');
    const elementLi = event.target.closest('.element');
    const id = Number(elementLi.id);
    if (checkButton) {
        checkButton.classList.toggle('active');
        checkButton.previousElementSibling.classList.toggle('active');
        const i = arrayMassage.findIndex((el) => el.id === id);
        if(i != -1) {
            arrayMassage[i].completed = !arrayMassage[i].completed;
        }
        console.log(arrayMassage)
    }
    if (event.target.closest('.del')) {
        const index = arrayMassage.findIndex((el) => el.id === id);
        if (index != -1) {
            arrayMassage.splice(index,1);
            elementLi.remove()
            saveTasks()
        }
        console.log(arrayMassage)
        
    }
});
loadTasks()

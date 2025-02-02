let taskTitle = [...document.querySelectorAll('[data-role=taskTitle]')],
    taskProgress = [...document.querySelectorAll('[data-role=taskProgress]')];

taskTitle.forEach(input=>{
    input.oninput = function(){
        if(this.value != ''){
            document.querySelector(`.button[data-role=taskStart][data-id=${this.dataset['id']}]`).classList.remove('disabled');
        }else{
            document.querySelector(`.button[data-role=taskStart][data-id=${this.dataset['id']}]`).classList.add('disabled');
        }
    }
})

function startTask(dataID){
    let startTime = new Date().getTime();
    document.querySelector(`.button[data-role=taskStart][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskReset][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskEnd][data-id=${dataID}]`).classList.remove('disabled');
    taskProgress.forEach(progress=>{
        if(progress.dataset['id'] == dataID){
            progress.dataset['start'] = startTime;
            progress.dataset['stop'] = '';
            progress.classList.add('active');
            progress.value = 0;
            document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = 0 + ' мин';
            document.querySelector(`.task__status[data-id=${progress.dataset['id']}]`).textContent = 'Запущен';
            localStorage.setItem(dataID + '_startTime', startTime);
            localStorage.setItem(dataID + '_title', document.querySelector(`.task__title[data-id=${progress.dataset['id']}]`).value);
            localStorage.setItem(dataID + '_stopTime', '');
        }
    });
}
function stopTask(dataID){
    let stopTime = new Date().getTime();
    document.querySelector(`.button[data-role=taskStart][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskEnd][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskReset][data-id=${dataID}]`).classList.remove('disabled');
    taskProgress.forEach(progress=>{
        if(progress.dataset['id'] == dataID){
            progress.dataset['stop'] = stopTime;
            progress.classList.remove('active');
            // progress.dataset['start'] = '';
            document.querySelector(`.task__status[data-id=${progress.dataset['id']}]`).textContent = 'Завершен';
            // localStorage.setItem(dataID + '_startTime', '');
            localStorage.setItem(dataID + '_stopTime', stopTime);
        }
    });
}
function resetTask(dataID){
    document.querySelector(`.button[data-role=taskStart][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskReset][data-id=${dataID}]`).classList.add('disabled');
    document.querySelector(`.button[data-role=taskEnd][data-id=${dataID}]`).classList.add('disabled');
    taskProgress.forEach(progress=>{
        if(progress.dataset['id'] == dataID){
            progress.dataset['stop'] = '';
            progress.dataset['start'] = '';
            progress.value = '0';
            document.querySelector(`.task__status[data-id=${progress.dataset['id']}]`).textContent = 'Остановлен';
            document.querySelector(`.task__title[data-id=${progress.dataset['id']}]`).value = '';
            document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = '0 мин';
            localStorage.setItem(dataID + '_startTime', '');
            localStorage.setItem(dataID + '_stopTime', '');
            localStorage.removeItem(dataID + '_title');

        }
    });
}
function checkTasksProgress(){
    taskProgress.forEach(progress=>{
        if(progress.dataset['start'] != '' && progress.dataset['stop'] == ''){
            let currentTime = new Date().getTime();
            let minutes = (currentTime - progress.dataset['start']) / 60_000;
            progress.value = minutes;
            document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = Math.round(minutes) + ' мин';
            if(+progress.value > 59.99){
                stopTask(progress.dataset['id']);
                document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = '60 мин';
            }
        }
    });
}
function initTasks(){
    taskProgress.forEach(progress=>{
        if(localStorage.getItem(progress.dataset['id'] + '_startTime')){ // если задача хоть раз запускаласть
            if(localStorage.getItem(progress.dataset['id'] + '_startTime') != ''){
                progress.dataset['start'] = localStorage.getItem(progress.dataset['id'] + '_startTime');
                progress.dataset['stop'] = localStorage.getItem(progress.dataset['id'] + '_stopTime');
                document.querySelector(`.button[data-role=taskStart][data-id=${progress.dataset['id']}]`).classList.add('disabled');
                document.querySelector(`.button[data-role=taskReset][data-id=${progress.dataset['id']}]`).classList.add('disabled');
                document.querySelector(`.button[data-role=taskEnd][data-id=${progress.dataset['id']}]`).classList.remove('disabled');
                // progress.dataset['stop'] = '';
                let currentTime = new Date().getTime();
                let minutes = (currentTime - progress.dataset['start']) / 60_000;
                document.querySelector(`.task__title[data-id=${progress.dataset['id']}]`).value = localStorage.getItem(progress.dataset['id'] + '_title');
                if(localStorage.getItem(progress.dataset['id'] + '_stopTime') != ''){
                    document.querySelector(`.task__status[data-id=${progress.dataset['id']}]`).textContent = 'Завершен';
                    document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = Math.round((progress.dataset['stop'] - progress.dataset['start']) / 60_000) + ' мин';
                    document.querySelector(`.button[data-role=taskStart][data-id=${progress.dataset['id']}]`).classList.add('disabled');
                    document.querySelector(`.button[data-role=taskReset][data-id=${progress.dataset['id']}]`).classList.remove('disabled');
                    document.querySelector(`.button[data-role=taskEnd][data-id=${progress.dataset['id']}]`).classList.add('disabled');
                    progress.value = (progress.dataset['stop'] - progress.dataset['start']) / 60_000;
                }else{
                    document.querySelector(`.task__status[data-id=${progress.dataset['id']}]`).textContent = 'Запущен';
                    document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = Math.round(minutes) + ' мин';
                    progress.classList.add('active');
                    progress.value = minutes;
                }
                if(+progress.value > 59.99){
                    stopTask(progress.dataset['id']);
                    document.querySelector(`.task__past-time[data-id=${progress.dataset['id']}]`).textContent = '60 мин';
                }
            }
        }
    });
}
initTasks();
setInterval(checkTasksProgress,10_000);

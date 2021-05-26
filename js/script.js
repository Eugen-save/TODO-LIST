{
    let tasks = [];
    let hideTasksDone = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(taskIndex, 0),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButton = document.querySelectorAll(".js-done");

        toggleDoneButton.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const toggleHideTasksDone = () => {
        hideTasksDone = !hideTasksDone;
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindToggleHideEvents = () => {
        const toggleHideButton = document.querySelector(".js-hide");

        if (toggleHideButton) {
            toggleHideButton.addEventListener("click", () => {
                toggleHideTasksDone();
            });
        };
    };

    const bindCompleteTasksEvents = () => {
        const completeTasksButton = document.querySelector(".js-complete");

        if (completeTasksButton) {

            completeTasksButton.addEventListener("click", () => {
                setAllTasksDone();
            });
        };
    };

    const bindButtonEvents = () => {
        bindToggleHideEvents();
        bindCompleteTasksEvents();
    };

    const renderTasks = () => {
        const taskToHtml = task => `
               <li class="tasks__item${task.done && hideTasksDone ? " tasks__item--hidden" : ""}">
          <button class="js-done tasks__button tasks__button--done">
              ${task.done ? "✔" : ""}
       </button>
          <span class="tasks__content${task.done ? "tasks__content--done" : ""}">
              ${task.content}
       </span>
       <button class="js-remove tasks__button tasks__button--remove">🗑️</button>
       </li>
       `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHtml).join("");
};

const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
        buttonsElement.innerHTML = "";
        return;
    }

       buttonsElement.innerHTML = `
            <button class="section__button js-hide">
                 ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
            </button>

            <button class="section__button js-complete" ${tasks.every(({done}) => done) ? "disabled" : ""}>
                     Ukończ wszystkie
            </button>
            `
};

const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonEvents();
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
        return;
    }

    newTaskContent.focus();

};

const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
};

init();
}
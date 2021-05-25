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
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
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

    const hideDoneTasks = () => {
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
            hideDoneTasks();
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
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
       <li class="tasks__item">
          <button class="js-done tasks__button tasks__button--done">
              ${task.done ? "✔" : ""}
       </button>
          <span class="tasks__content${task.done ? "tasks__content--done" : ""}">
              ${task.content}
       </span>
       <button class="js-remove tasks__button tasks__button--remove">🗑️</button>
       </li>
       `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtonsString = "";

        if (tasks.length > 0) {
            htmlButtonsString += `
            <button class="section__button js-hide">
                 ${hideTasksDone ? "Pokaż" : "Ukryj"} ukończone
            </button>

            <button class="section__button js-complete" ${tasks.every((task => task.done)) ? "disabled" : ""}>
                     Ukończ wszystkie
            </button>
            `
        }

        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
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
import { database } from '../firebaseConfig'

const ADD_TASK_INPUT_CHANGE = 'toDo/ADD_TASK_INPUT_CHANGE'
const RENDER_TASK_LIST = 'toDo/RENDER_TASK_LIST'
const CLEAN_ADD_TASK_INPUT = 'toDo/CLEAN_ADD_TASK_INPUT'
const FILTER_INPUT_CHANGE = 'toDo/FILTER_INPUT_CHANGE'
const SHOW_COMPLETED_TASKS = 'toDo/SHOW_COMPLETED_TASKS'
const SHOW_UNCOMPLETED_TASKS = 'toDo/SHOW_UNCOMPLETED_TASKS'
const SHOW_ALL_TASKS = 'toDo/SHOW_ALL_TASKS'

const INITIAL_STATE = {
    allToDos: null,
    visibleToDos: null,
    filterToDo: '',
    newTaskText: ''
}

export const addNewTaskToDbAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.newTaskText
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).push({
        text: newTask,
        completed: false
    })

    dispatch(cleanAddTaskInputAction())
}

export const toggleToDoAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        completed: !task.completed
    })
}

export const deleteTaskAsyncAction = (key) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).child(key).remove()
}

export const getTasksListFromDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const tasks = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]

                }))
                dispatch(renderTaskListAction(tasks))
            } else {
                dispatch(renderTaskListAction(null))
            }
        }
    )
}

const renderTaskListAction = tasks => ({
    type: RENDER_TASK_LIST,
    tasks
})

const cleanAddTaskInputAction = () => ({
    type: CLEAN_ADD_TASK_INPUT
})

export const showAllTasksAction = () => ({
    type: SHOW_ALL_TASKS
})

export const showUncompletedTasksAction = () => ({
    type: SHOW_UNCOMPLETED_TASKS
})

export const showCompletedTasksAction = () => ({
    type: SHOW_COMPLETED_TASKS
})

export const filterInputChangeAction = text => ({
    type: FILTER_INPUT_CHANGE,
    text
})

export const addTaskInputChangeAction = text => ({
    type: ADD_TASK_INPUT_CHANGE,
    text
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TASK_INPUT_CHANGE:
            return {
                ...state,
                newTaskText: action.text
            }
        case RENDER_TASK_LIST:
            return {
                ...state,
                allToDos: action.tasks,
                visibleToDos: action.tasks
            }
        case CLEAN_ADD_TASK_INPUT:
            return {
                ...state,
                newTaskText: ''
            }
        case FILTER_INPUT_CHANGE:
            return {
                ...state,
                filter: action.text,
                visibleToDos: state.allToDos.filter(todo => todo.text.toLowerCase().replace(/\s/g, '')
                    .includes(action.text.toLowerCase().replace(/\s/g, ''))
                )
            }
        case SHOW_ALL_TASKS:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(todo => todo.text.toLowerCase().replace(/\s/g, '')
                .includes(state.filter.toLowerCase().replace(/\s/g, '')))
            }
        case SHOW_COMPLETED_TASKS:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(todo => todo.completed === true).filter(todo => todo.text.toLowerCase().replace(/\s/g, '')
                .includes(state.filter.toLowerCase().replace(/\s/g, '')))
            }
        case SHOW_UNCOMPLETED_TASKS:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(todo => todo.completed === false).filter(todo => todo.text.toLowerCase().replace(/\s/g, '')
                .includes(state.filter.toLowerCase().replace(/\s/g, '')))
            }
        default:
            return state
    }
}
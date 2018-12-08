import { database } from '../firebaseConfig'

const ADD_TASK_INPUT_CHANGE = 'toDo/ADD_TASK_INPUT_CHANGE'
const RENDER_TASK_LIST = 'toDo/RENDER_TASK_LIST'

const INITIAL_STATE = {
    allToDos: null,
    visibleToDos: [],
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
}

export const toggleToDoAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        completed: !task.completed
    })
}

export const getTasksListFromDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            const tasks = Object.entries(
                snapshot.val()
            ).map(entry => ({
                ...entry[1],
                key: entry[0]

            }))
            dispatch(renderTaskListAction(tasks))
        }
    )
}

const renderTaskListAction = tasks => ({
    type: RENDER_TASK_LIST,
    tasks
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
                allToDos: action.tasks
            }
        default:
            return state
    }
}
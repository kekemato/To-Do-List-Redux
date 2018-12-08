import {database} from '../firebaseConfig'

const ADD_TASK_INPUT_CHANGE = 'toDo/ADD_TASK_INPUT_CHANGE'

const INITIAL_STATE = {
    allToDos: [],
    visibleToDos: [],
    filterToDo: '',
    newTaskText: ''
}

export const addNewTaskToDbAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.newTaskText
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).push({
        newTask
})
}

export const addTaskInputChangeAction = text => ({
    type: ADD_TASK_INPUT_CHANGE,
    text
})

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TASK_INPUT_CHANGE:
            return{
                ...state,
                newTaskText: action.text
            }
        default:
        return state
    }
}
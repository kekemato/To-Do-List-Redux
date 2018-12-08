import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import { Checkbox } from 'material-ui'

import {
    addTaskInputChangeAction,
    addNewTaskToDbAsyncAction,
    toggleToDoAsyncAction,
    deleteTaskAsyncAction,
    filterInputChangeAction,
    showCompletedTasksAction,
    showUncompletedTasksAction,
    showAllTasksAction
} from './state/toDo'

const ToDo = props => (
    <Paper
        style={{
            margin: 15,
            padding: 10
        }}
    >
        <TextField
            hintText='Add task'
            value={props._newTaskText}
            onChange={props._addTaskInputChangeAction}
        />
        <RaisedButton
            label='Add task'
            primary={true}
            style={{
                marginLeft: 10
            }}
            onClick={props._addNewTaskToDbAsyncAction}
        />
        <br />
        <TextField
            hintText='Find task'
            onChange={props._filterInputChangeAction}
        />
        <br />
        <RaisedButton
            label='All tasks'
            secondary={true}
            style={{
                marginLeft: 10
            }}
            onClick={props._showAllTasksAction}
        />
        <RaisedButton
            label='Uncompleted tasks'
            secondary={true}
            style={{
                marginLeft: 10
            }}
            onClick={props._showUncompletedTasksAction}
        />
        <RaisedButton
            label='Completed tasks'
            secondary={true}
            style={{
                marginLeft: 10
            }}
            onClick={props._showCompletedTasksAction}
        />
        <List>
            {
                props._visibleToDos &&
                    props._visibleToDos.map ?
                    props._visibleToDos.map(todo =>
                        <ListItem
                            primaryText={todo.text}
                            key={todo.key}
                            style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
                            leftCheckbox={
                                <Checkbox
                                    defaultChecked={todo.completed}
                                    onCheck={() => props._toggleToDoAsyncAction(todo)}
                                />
                            }
                            rightIconButton={
                                <IconButton
                                    onClick={() => props._deleteTaskAsyncAction(todo.key)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    )
                    : null
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    _newTaskText: state.toDo.newTaskText,
    _allToDos: state.toDo.allToDos,
    _filter: state.toDo.filter,
    _visibleToDos: state.toDo.visibleToDos
})

const mapDispatchToProps = dispatch => ({
    _filterInputChangeAction: event => dispatch(filterInputChangeAction(event.target.value)),
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
    _toggleToDoAsyncAction: (task) => dispatch(toggleToDoAsyncAction(task)),
    _deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key)),
    _showCompletedTasksAction: () => dispatch(showCompletedTasksAction()),
    _showUncompletedTasksAction: () => dispatch(showUncompletedTasksAction()),
    _showAllTasksAction: () => dispatch(showAllTasksAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
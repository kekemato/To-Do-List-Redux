import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

import { addTaskInputChangeAction, addNewTaskToDbAsyncAction, toggleToDoAsyncAction } from './state/toDo'
import { Checkbox } from 'material-ui';

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
        />
        <br />
        <RaisedButton
            label='All tasks'
            primary={true}
            style={{
                marginLeft: 10
            }}
        />
        <RaisedButton
            label='Uncompleted tasks'
            primary={true}
            style={{
                marginLeft: 10
            }}
        />
        <RaisedButton
            label='Completed tasks'
            primary={true}
            style={{
                marginLeft: 10
            }}
        />
        <List>
            {
                props._allToDos &&
                    props._allToDos.map ?
                    props._allToDos.map(todo =>
                        <ListItem
                            primaryText={todo.text}
                            key={todo.key}
                            style={ todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                            leftCheckbox={
                                <Checkbox
                                    defaultChecked={todo.completed}
                                    onCheck={() => props._toggleToDoAsyncAction(todo)}
                                />
                            }
                            rightIconButton={
                                <IconButton
                                    onClick={() => alert('not yet')}
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
    _allToDos: state.toDo.allToDos
})

const mapDispatchToProps = dispatch => ({
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
    _toggleToDoAsyncAction: (task) => dispatch(toggleToDoAsyncAction(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
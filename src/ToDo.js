import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'

import { addTaskInputChangeAction, addNewTaskToDbAsyncAction } from './state/toDo'

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

        </List>
    </Paper>
)

const mapStateToProps = state => ({
    _newTaskText: state.toDo.newTaskText
})

const mapDispatchToProps = dispatch => ({
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
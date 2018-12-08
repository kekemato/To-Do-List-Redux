import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'

const ToDo = props => (
    <Paper
        style={{
            margin: 15,
            padding: 10
        }}
    >
        <TextField
            hintText='Add task'
        />
        <RaisedButton
            label='Add task'
            primary={true}
            style={{
                marginLeft: 10
            }}
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

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
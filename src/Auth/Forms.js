import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField } from 'material-ui'

const Forms = props => (
    <Paper
        style={{
            margin: 15,
            padding: 10
        }}
    >
        <div
            style={{
                border: '1px solid #a6a6a6',
                width: '30%',
                marginLeft: '35%'
            }}
        >
            <TextField
                value={props.email}
                type="email"
                onChange={props.loginChangeAction}
                hintText="email"
                style={{
                    width: "80%",
                    margin: "10px 10%"
                }}
            >
            </TextField>
            <br />
            <TextField
                value={props.password}
                type="password"
                onChange={props.passwordChangeAction}
                hintText="hasło"
                style={{
                    width: "80%",
                    margin: "10px 10%"
                }}
            >
            </TextField>
        </div>

        <br />
        <RaisedButton
            onClick={props.handleLogInClick}
            primary={true}
            label="Zaloguj"
            style={{
                width: '20%',
                marginBottom: 50,
                marginLeft: '40%'
            }}
        >
        </RaisedButton>
        <RaisedButton
            onClick={props.handleLogInWithGoogleClick}
            secondary={true}
            label="Zaloguj z google"
            style={{
                width: '20%',
                marginBottom: 10,
                marginLeft: '40%'
            }}
        >
        </RaisedButton>
    </Paper>
)

export default Forms
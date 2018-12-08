import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField } from 'material-ui'

import '../css/Forms.css'

const Forms = props => (
    <Paper
        className="forms-container"
        style={{
            margin: 15,
            padding: 10
        }}
    >
        <div
            className='example-login'
        >
            <p>Example login and password:</p>
            <p>email: example@example.com</p>
            <p>password: example</p>
        </div>
        <div
            className="login-inputs-container"
        >
            <TextField
                className="login-input__email login-input"
                value={props.email}
                fullWidth={true}
                type="email"
                onChange={props.loginChangeAction}
                hintText="email"
            >
            </TextField>
            <br />
            <TextField
                className="login-input__password login-input"
                fullWidth={true}
                value={props.password}
                type="password"
                onChange={props.passwordChangeAction}
                hintText="password"
            >
            </TextField>
        </div>

        <br />
        <RaisedButton
            className="login-button"
            onClick={props.handleLogInClick}
            primary={true}
            label="Log in"
        >
        </RaisedButton>
        <br />
        <RaisedButton
            className="login-button"
            onClick={props.handleLogInWithGoogleClick}
            secondary={true}
            label="Log in with google"
        >
        </RaisedButton>
    </Paper>
)

export default Forms
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { connect } from 'react-redux'

import Forms from './Forms'

import { initAuthChangeListeningAsyncAction, logOutAsyncAction, logInWithGoogleAsyncAction, logInAsyncAction, loginChangeAction, passwordChangeAction } from '../state/auth'

class Auth extends React.Component {
    componentDidMount() {
        this.props._initAuthChangeListeningAsyncAction()
    }

    render() {
        return (
            this.props._isUserLoggedIn ?
                <div>
                    <FloatingActionButton
                        secondary={true}
                        style={{
                            position: "fixed",
                            top: 20,
                            right: 70,
                            zIndex: 999,
                            color: "white"
                        }
                        }
                        onClick={this.props._logOutAsyncAction}
                    >
                        Log Out
                    </FloatingActionButton>
                    {this.props.children}
                </div>
                :
                <Forms
                    email={this.props._email}
                    password={this.props._password}
                    loginChangeAction={this.props._loginChangeAction}
                    passwordChangeAction={this.props._passwordChangeAction}
                    handleLogInClick={this.props._logInAsyncAction}
                    handleLogInWithGoogleClick={this.props._logInWithGoogleAsyncAction}
                />
        )
    }
}

const mapStateToProps = state => ({
    _isUserLoggedIn: state.auth.isUserLoggedIn,
    _email: state.auth.email,
    _password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
    _initAuthChangeListeningAsyncAction: () => dispatch(initAuthChangeListeningAsyncAction()),
    _logOutAsyncAction: () => dispatch(logOutAsyncAction()),
    _logInWithGoogleAsyncAction: () => dispatch(logInWithGoogleAsyncAction()),
    _logInAsyncAction: () => dispatch(logInAsyncAction()),
    _loginChangeAction: (event) => dispatch(loginChangeAction(event.target.value)),
    _passwordChangeAction: (event) => dispatch(passwordChangeAction(event.target.value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)
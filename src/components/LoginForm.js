import React, { Component } from 'react';
import '../styles/LoginForm.css';
import { NavLink, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import Loading from './Loading';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameMessage: '',
            passwordMessage: '',
            checkLog: null,
            displayUsernameMessage: false,
            displayPasswordMessage: false,
        }
    }
    handleClick(e) {
        if (e.currentTarget.id === 'user') {
            this.setState({
                displayUsernameMessage: false,
            })
        } else if (e.currentTarget.id === 'pass') {
            this.setState({
                displayPasswordMessage: false,
            })
        }
    }
    handleInputChange(e) {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        });
    }
    checkLoginCorrect(login) {
        const minLoginLength = 6;
        if (login.length >= minLoginLength) {
            return true;
        } else {
            return false;
        }
    }
    checkLoginIsTrue(username, password) {
        const login = this.props.login[0];
        const loginCheckData = {
            username: false,
            password: false,
        };
        if (username === login.username && login.password === password) {
            loginCheckData.password = true;
            loginCheckData.username = true;
        } else if (username === login.username) {
            loginCheckData.username = true;
        } else if (password === login.password) {
            loginCheckData.password = true;
        }
        return loginCheckData;
    }
    handleFormSubmit(e) {
        const { password, username } = this.state;
        e.preventDefault();
        const checkPassword = this.checkLoginCorrect(password);
        const checkUsername = this.checkLoginCorrect(username);
        const checkLogin = this.checkLoginIsTrue(username, password);
        if (checkPassword && checkUsername && checkLogin.password && checkLogin.username) {
            this.setState({
                username: '',
                password: '',
                checkLog: true,
            });
        }
        if (checkLogin.password) {
            this.setState({
                passwordMessage: '',
            });
        } else if (!checkPassword) {
            this.setState({
                passwordMessage: 'Enter a combination of at least six signs',
                displayPasswordMessage: true,
            });
        } else if (!checkLogin.password) {
            this.setState({
                passwordMessage: "The password you've entered is incorrect. Forgot password?",
                displayPasswordMessage: true,
            });
        }
        if (checkLogin.username) {
            this.setState({
                usernameMessage: '',
            });
        } else if (!checkUsername) {
            this.setState({
                usernameMessage: 'Enter a combination of at least six signs',
                displayUsernameMessage: true,
            });
        } else if (!checkLogin.username) {
            this.setState({
                usernameMessage: "The username you've entered is incorrect. Forgot username?",
                displayUsernameMessage: true,
            });
        }
    }
    render() {
        const { username, password, checkLog, usernameMessage, passwordMessage, displayPasswordMessage: displayPass, displayUsernameMessage: displayUser } = this.state;
        const { login } = this.props;
        const isReady = login.length > 0;
        return (
            <>
                {
                    isReady ? (
                        <div className="box" >
                            <h1>Log in to Cryptozone</h1>
                            <form className="login" onSubmit={(e) => this.handleFormSubmit(e)}>
                                <div className="input-box">
                                    <input type="text" name='username' onChange={(e) => this.handleInputChange(e)} value={username} autoComplete='off' className={username ? 'valid' : ''} />
                                    <label htmlFor="username">username</label>
                                    {usernameMessage ? <div id='user' className={classNames('warning', { hide: !displayUser })} onClick={(e) => this.handleClick(e)}><span>{usernameMessage}</span></div> : null}
                                </div>
                                <div className="input-box">
                                    <input type="password" name='password' onChange={(e) => this.handleInputChange(e)} value={password} className={password ? 'valid' : ''} />
                                    <label htmlFor="password">password</label>
                                    {passwordMessage ? <div id='pass' className={classNames('warning', { hide: !displayPass })} onClick={(e) => this.handleClick(e)}><span>{passwordMessage}</span></div> : null}
                                </div>
                                <input type="submit" value="Log in" />
                            </form>
                            <div className="login-link">
                                <NavLink className='forgotten-account' to='/login/problems'>Can't log in?</NavLink>
                                <span>or</span>
                                <NavLink className='new-account' to='/login/new_account'>Create New Account</NavLink>
                            </div>
                        </div>
                    ) : <Loading isReady={isReady} />
                }
                {checkLog ? <Route render={() => <Redirect to='login/account' />} /> : null}
            </>
        );
    }
}

export default LoginForm;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.css';
import { handleCheckLogin } from '../../services/userService';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        userName: '',
        password: '',
        isShow: false,
        message: '',

    }
    handleLogin = async () => {
        try {
            this.setState({
                message: '',
            })
            let data = await handleCheckLogin(this.state.userName, this.state.password);
            if (data && data.errCode != 0)
                this.setState({
                    message: data.message,
                })
            else {
                console.log('login success')
                this.props.userLoginSuccess(data.user);

            }
        } catch (e) {
            let data = e.response.data;
            this.setState({
                message: data.message,
            })
        }
        this.setState({
            userName: '',
            password: '',
        })
    }


    handleOnChangeInput = (stateName, e) => {
        this.setState({
            message: '',
        })
        if (stateName == 0)
            this.setState({
                userName: e.target.value,
            })
        else
            this.setState({
                password: e.target.value,
            })
    }
    handleOnShowPassword = () => {
        if (this.state.isShow == false) {

        }
        this.setState({
            isShow: !this.state.isShow,
        })
    }
    render() {
        return (
            <div className='login-backGround' >
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='row'>
                            <div className='col-12 pt-4'>
                                <p className='text-center login'>Login</p>
                            </div>
                        </div>
                        <div className='row'>
                            <form>
                                <div className='col-12 form-group'>
                                    <div className='login-label-input'>
                                        <label htmlFor='email'>Username:</label>
                                        <input id='email' className='form-control' type='email' placeholder='Enter your username'
                                            value={this.state.userName}
                                            onChange={
                                                (e) => {
                                                    this.handleOnChangeInput(0, e);
                                                }
                                            }
                                        />
                                    </div>
                                    <div className='login-label-input login-password'>
                                        <label htmlFor='password'>Password:</label>
                                        <input id='password' className='form-control' type={this.state.isShow ? 'text' : 'password'} placeholder='Enter your password'
                                            value={this.state.password}
                                            onChange={
                                                (e) => {
                                                    this.handleOnChangeInput(1, e);
                                                }
                                            }
                                        />
                                        {this.state.isShow ?
                                            <div className='show-password eye-password' onClick={() => this.handleOnShowPassword()}>
                                                <i className="fas fa-eye"></i>
                                            </div> : <div className='hide-password eye-password' onClick={() => this.handleOnShowPassword()}>
                                                <i className="fas fa-eye-slash"></i>

                                            </div>
                                        }
                                    </div>
                                    <span className='span-err'>{this.state.message}</span>
                                    <div className='col-12 login-forgot'>
                                        <p><a href='#'>Forgot password?</a></p>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <button className='btn longin-signin'
                                    onClick={() => this.handleLogin()}
                                >Sign in</button>
                            </div>
                        </div>

                        <div className='row'>
                            <p className='text-center'>Or sign in with:</p>
                        </div>
                        <div className='row'>
                            <div className='col-4 item-font item-one'>
                                <div className='circle'>
                                    <i className="fab fa-google-plus-g"></i>
                                </div>
                            </div>
                            <div className='col-4 item-font item-two'>
                                <div>
                                    <i className="fab fa-facebook "></i>
                                </div>
                            </div>
                            <div className='col-4 item-font item-three'>
                                <div>
                                    <i className="fab fa-twitter-square"></i>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

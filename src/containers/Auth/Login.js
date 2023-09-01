import React from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
// import { history } from '../../redux';
import * as actions from "../../store/actions";
import './Login.scss';
import { handleCheckLogin } from '../../services/userService';

class Login extends React.Component {

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
            if (!data.errCode) {
                this.props.userLoginSuccess(data.user);
            }
            else {
                this.setState({
                    message: data.message,
                })
            }
        } catch (e) {
            let data = e.response.data;
            this.setState({
                message: data.message,
            })
        }
    }


    handleOnChangeInput = (stateName, e) => {
        this.setState({
            message: '',
        })
        if (stateName === 0)
            this.setState({
                userName: e.target.value,
            })
        else
            this.setState({
                password: e.target.value,
            })
    }
    handleOnShowPassword = () => {
        if (this.state.isShow === false) {

        }
        this.setState({
            isShow: !this.state.isShow,
        })
    }

    componentDidMount = () => {
        // console.log('chạy vô login', this.props)
        // let { isLoggedIn, userInfo } = this.props;
        // if (!this.props.isLoggedIn) {
        //     let linkToRedirect = '/home';
        //     if (isLoggedIn) {
        //         if (userInfo.roleId === Menu.ADMIN)
        //             linkToRedirect = '/system/user-manage';
        //         else if (userInfo.roleId === Menu.DOCTOR)
        //             linkToRedirect = '/doctor/manage-schedule'
        //     } else
        //         linkToRedirect = 'home';
        //     return (
        //         <Redirect to={linkToRedirect} />
        //     );
        // }
    }
    componentDidUpdate = () => {
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
                            <form className='form-login'>
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
                                        <p><a href='/'>Forgot password?</a></p>
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

                        <div className='col-12'>
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
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => {
            dispatch(actions.userLoginSuccess(userInfo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

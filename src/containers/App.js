import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage';
import { userIsNotAuthenticated } from '../hoc/authentication';
import './App.scss';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import NotFoundComponent from './NotFoundComponent';
import DetailDoctor from './HomePage/Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import VerifyBooking from './HomePage/Patient/Verify/VerifyBooking';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: ''
        }
    }
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    async componentDidMount() {
        this.handlePersistorState();
    }
    componentDidUpdate = async (prevp, prevs) => {
        if (prevp.isLoggedIn !== this.props.isLoggedIn) {
            if (this.props.isLoggedIn === false) {
                let path = window.location.pathname;
                history.push('/login?' + path);
            }
        }
    }
    componentWillUnmount = () => {
    }
    render() {
        return (

            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={((System))} />
                                <Route path={'/doctor'} component={(Doctor)}></Route>
                                <Route path={path.VERIFY_EMAIL} component={VerifyBooking}></Route>


                                <Route path={path.DETAIL_DOCTOR + '/:id'} component={DetailDoctor} />
                                <Route component={NotFoundComponent} />
                            </Switch>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        {/* Same as */}
                        <ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)((App));
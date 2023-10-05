import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManagePatient from '../containers/Doctor/ManagePatient';
import Header from '../containers/Header/Header';
class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path="/doctor/manage-patient" component={ManagePatient} />
                    <Route component={() => { return (<Redirect to={'/doctor/manage-patient'} />) }} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        doctorSchedule: state.app.doctorSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import userRedux from '../containers/System/admin/userRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/admin/ManageDoctors'
import ManageSchedule from '../containers/System/doctor/ManageSchedule';
import ManageSpecialty from '../containers/System/specialty/ManageSpecialty';
import ManageClinics from '../containers/System/Clinic/ManageClinics';
class System extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/user-redux" component={userRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                            <Route path="/system/manage-speciality" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinics} />
                            <Route component={() => { return (<Redirect to={'/system/user-redux'} />) }} />

                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

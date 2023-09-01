import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import userRedux from '../containers/System/admin/userRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/admin/ManageDoctors'
import ManageSchedule from '../containers/System/doctor/ManageSchedule';
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
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />

                            {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
                            {/* octor/manage-schedule */}
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

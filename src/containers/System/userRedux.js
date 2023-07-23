import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class userReduxManage extends Component {


    componentDidMount() {
    }


    render() {
        return (
            <div className="class-redux-body">
                <h2 className='title'>Quản lý người dùng với Redux</h2>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userReduxManage);

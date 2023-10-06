import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchInput.scss';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
class SearchInput extends Component {

    handleOnChangeInput = (e) => {
        this.props.handleOnChange(e);
    }
    render() {
        let { name } = this.props;
        return (
            <div className='center-input'>
                <input placeholder={'Tìm kiếm ' + name} onChange={this.handleOnChangeInput} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchInput));

import React from "react";
import './HeaderHomePage.scss';
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Header from "./Header";
import Banner from './Banner'
class HeaderHomePage extends React.Component {
    handleOnChangeLanguage = async (e) => {
        this.props.changeLanguageRedux(e.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <Banner />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: language => dispatch(CHANGE_LANGUAGE_APP(language))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(HeaderHomePage);
import React from "react";
import './HeaderHomePage.scss';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import { withRouter } from "react-router-dom";
class Header extends React.Component {
    handleOnChangeLanguage = async (e) => {
        this.props.changeLanguageRedux(e.target.value);
    }
    handleOnBackHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }
    handleSearchSpecialty = () => {
        this.props.history.push('/specialty');

    }
    handleSearchDoctor = () => {
        this.props.history.push('/doctors');
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-header">
                    <div className="header-content">
                        <div className="w-25 header-box">
                            <span className="header-menu">
                                <i className="fas fa-bars"></i>
                            </span>
                            <div className="logo" onClick={() => this.handleOnBackHome()}></div>
                        </div>
                        <div className="w-50 header-box">

                            <div className="header-item" onClick={this.handleSearchSpecialty}>
                                <p><FormattedMessage id="home-header.speciality" /></p>
                                <p><FormattedMessage id="home-header.SearchBySpecialist" /></p>
                            </div>
                            <div className="header-item">
                                <p><FormattedMessage id="home-header.healthFacilities" /></p>
                                <p><FormattedMessage id="home-header.ChooseHospitalClinic" /></p>
                            </div>
                            <div className="header-item" onClick={this.handleSearchDoctor}>
                                <p><FormattedMessage id="home-header.doctor" /></p>
                                <p><FormattedMessage id="home-header.ChooseAGoodDoctor" /></p>
                            </div>
                            <div className="header-item">
                                <p><FormattedMessage id="home-header.CheckupPackage" /></p>
                                <p><FormattedMessage id="home-header.GeneralHealthCheck" /></p>
                            </div>
                        </div>
                        <div className="w-25 header-box">
                            <div>
                                <div>
                                    <span><i className="far fa-question-circle"></i></span>
                                    <span><FormattedMessage id="home-header.support" /></span>
                                </div>
                                <p className="header-phone">024-7301-2468</p>
                            </div>
                            <div>
                                {this.props.language === LANGUAGES.VI
                                    ?
                                    <div className="baner-language baner-vi"></div>
                                    :
                                    <div className="baner-language baner-en"></div>

                                }
                                <select value={this.props.language} onChange={
                                    (e) => this.handleOnChangeLanguage(e)}
                                >
                                    <option value={LANGUAGES.VI}>VN </option>
                                    <option value={LANGUAGES.EN}>EN</option>


                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
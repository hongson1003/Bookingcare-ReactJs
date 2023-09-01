import React from "react";
import './HeaderHomePage.scss';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";

class Banner extends React.Component {
    handleOnChangeLanguage = async (e) => {
        this.props.changeLanguageRedux(e.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-baner">
                    <div className="baner-content">
                        <div className="baner-opacity"></div>
                        <div className="baner-main">
                            <p className="baner-title">
                                <span><FormattedMessage id="home-baner.MEDICALBACKGROUND" /></span>
                                <br />
                                <span><FormattedMessage id="home-baner.COMPREHENSIVEHEALTHCARE" /></span>
                            </p>
                            <div className="baner-search">
                                <i className="fas fa-search"></i>
                                {
                                    this.props.language === 'vi' ?
                                        <input placeholder="Tìm chuyên khoa" /> :
                                        <input placeholder="Find a Specialist" />
                                }
                            </div>
                            <div className="baner-services">
                                <div className="baner-item">
                                    <div>
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.SpecializingInFacultyExamination" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <i className="fa fa-mobile" aria-hidden="true"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.RemoteExamination" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <i className="far fa-sticky-note"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.GeneralExamination" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <i className="fas fa-vial"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.MedicalTest" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <i className="fab fa-gratipay"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.MentalHealth" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <div className="tooth"></div>
                                    </div>
                                    <p><FormattedMessage id="home-baner.DentalCourse" /></p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <div className="exam"></div>
                                    </div>
                                    <p><FormattedMessage id="home-baner.HealthTest" /> </p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <i className="fas fa-cube"></i>
                                    </div>
                                    <p><FormattedMessage id="home-baner.healthCheckPackage" /> </p>
                                </div>

                                <div className="baner-item">
                                    <div>
                                        <div className="dungcu"></div>
                                    </div>
                                    <p><FormattedMessage id="home-baner.medical" /> </p>
                                </div>
                                <div className="baner-item">
                                    <div>
                                        <div className="medical"></div>
                                    </div>
                                    <p><FormattedMessage id="home-baner.medicalNearYou" /> </p>
                                </div>


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



export default connect(mapStateToProps, mapDispatchToProps)(Banner);
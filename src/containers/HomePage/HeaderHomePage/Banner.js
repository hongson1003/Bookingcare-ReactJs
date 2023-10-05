import React from "react";
import './HeaderHomePage.scss';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import './Baner.scss';
import { getMenuSearch } from "../../../services/patientService";
import Search from "../../../components/Search/Search";
import unidecode from 'unidecode';
class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem: [],
            show: false,
            arr: []
        }
    }
    componentDidMount = async () => {
        let rp = await getMenuSearch();
        if (rp.errCode === 0) {
            await this.setState({
                listItem: rp.data,
                arr: rp.data,
            })
        }

    }
    componentDidUpdate = (prev, pres) => {
    }
    handleOnClick = (e) => {
        if (this.state.show === false) {
            if (document.getElementsByClassName('baner-search')[0].contains(e.target)) {
                this.setState({
                    show: !this.state.show
                })
            }
        } else {
            if (!document.getElementsByClassName('baner-search')[0].contains(e.target)) {
                this.setState({
                    show: !this.state.show
                })
            }

        }
    }

    handleOnChange = (e) => {
        console.log('hi')
        // xử lý regex
        let tempArr = this.state.listItem.map(item => {
            return unidecode(item.name.toLowerCase());
        })
        let preArr = [];
        tempArr.forEach((item, index) => {
            console.log(item)
            if (item.search(unidecode(e.target.value.toLowerCase())) !== -1) {
                preArr.push(this.state.listItem[index]);
            }
        })
        this.setState({
            arr: preArr
        })
    }



    render() {
        return (
            <React.Fragment>
                <div className="container-baner" onClick={this.handleOnClick}>
                    <div className="baner-content">
                        <div className="baner-opacity"></div>
                        <div className="baner-main" onClick={this.handleOnClick}>
                            <p className="baner-title">
                                <span><FormattedMessage id="home-baner.MEDICALBACKGROUND" /></span>
                                <br />
                                <span><FormattedMessage id="home-baner.COMPREHENSIVEHEALTHCARE" /></span>
                            </p>
                            <div className="main-search">
                                <Search
                                    show={this.state.show}
                                    arr={this.state.arr}
                                    heighLine={'50px'}
                                    handleOnChange={this.handleOnChange}
                                />

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
import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MedicalFacility.scss';
import { getAllClinics } from "../../../services/patientService";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
class MedicalFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }
    handleGetAllClinics = async () => {
        let response = await getAllClinics('ALL');
        if (response.errCode === 0) {
            this.setState({
                clinics: response.data,
            })
        }
    }
    componentDidMount = async () => {
        this.handleGetAllClinics();
    }

    handleRedirect = (id) => {
        this.props.history.push('clinic/' + id);
    }

    render() {
        let { settings } = this.props;
        let { clinics } = this.state;
        return (
            clinics && clinics.length > 0 &&
            (
                <div className="section-home medicalfacility">
                    <div className="envelope">
                        <div className="section-share">
                            <p>Cơ sở y tế nổi bật</p>
                            <button className="btn">TÌM KIẾM</button>
                        </div>
                        <Slider {...settings}>
                            {clinics.map(item => {
                                return (
                                    <div key={item.id} onClick={() => this.handleRedirect(item.id)}>
                                        <div className="slider-item">
                                            <div className="slider-item-image">
                                                <img alt="" src={item.image} />
                                            </div>
                                            <div className="slider-item-text">
                                                <p className="slider-item-text_title">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </Slider>
                    </div>
                </div>
            )

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: language => dispatch(CHANGE_LANGUAGE_APP(language))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
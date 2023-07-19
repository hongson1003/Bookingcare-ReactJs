import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    tuvan1, tuvan2, tuvan3, tuvan4, tuvan5, tuvan6, tuvan7, tuvan8,
    hungviet, congnghecao, vietduc, choray, daihocyduoc, trunguongquandoi,
} from '../../../assets/images';
import './MedicalFacility.scss';
class Telemedicine extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { settings } = this.props;
        return (
            <div className="section-home medicalfacility">
                <div className="envelope">

                    <div className="section-share">
                        <p>Cơ sở y tế nổi bật</p>
                        <button className="btn">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={vietduc} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bệnh viện Hữu Nghị Việt Đức
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={choray} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bệnh viện chợ rẫy
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={daihocyduoc} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Phòng khám bệnh viện đại học y dược 1
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>



                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={trunguongquandoi} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Trung tâm khám sức khỏe định kỳ. Bệnh viện trung ương Quân Đội 108
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={hungviet} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bệnh viện Ung Bứu Hưng Việt
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={congnghecao} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Hệ thống y tế MEDLATEC
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>

                    </Slider>
                </div>
            </div>

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



export default connect(mapStateToProps, mapDispatchToProps)(Telemedicine);
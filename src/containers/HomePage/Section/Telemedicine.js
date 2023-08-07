import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    tuvan1, tuvan2, tuvan3, tuvan4, tuvan5, tuvan6, tuvan7, tuvan8
} from '../../../assets/images';
import './Telemedicine.scss';
class Telemedicine extends React.Component {


    render() {
        let { settings } = this.props;
        return (
            <div className="section-home telemedicine">
                <div className="envelope">

                    <div className="section-share">
                        <p>Bác sĩ từ xa qua Video</p>
                        <button className="btn">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan1} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tư vấn, trị liệu tâm lý từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan2} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Sức khỏe tâm thần từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan3} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ da liễu từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>



                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan4} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ cơ-xương khớp từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan5} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ tiêu hóa từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan6} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ nội khoa từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan7} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ sản phụ từ xa
                                    </p>
                                </div>
                                <div className="video-icon"></div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={tuvan8} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ tim mạch từ xa
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
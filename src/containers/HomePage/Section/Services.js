import React from "react";
import './Services.scss';
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    goichamsocsuckhoetainha, chuyendoiso, banana,
} from '../../../assets/images';
class Speciality extends React.Component {

    render() {
        let { settings } = this.props;
        return (
            <div className="servicesCarousel section-home">
                <div className="envelope">
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={goichamsocsuckhoetainha} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Gói Chăm sóc Sức khỏe Tại nhà dành cho người Rối loạn chuyển hóa
                                    </p>
                                    <p>Gói Chăm sóc sức khỏe tại nhà của BookingCare phù hợp cho các đối tượng có nhu cầu tầm soát và theo dõi điều trị Nội tiết</p>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={chuyendoiso} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám</p>
                                    <p> Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng</p>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={banana} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tư vấn phẫu thuật bao quy đầu trọn gói
                                    </p>
                                    <div className="item-text-list">
                                        <ul>
                                            <li>Thực hiện bởi bác sĩ Nam học</li>
                                            <li>Thực hiện tại cơ sở y tế</li>
                                            <li>Chi phí minh bạch</li>

                                        </ul>
                                    </div>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
                            </div>
                        </div>



                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={goichamsocsuckhoetainha} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Gói Chăm sóc Sức khỏe Tại nhà dành cho người Rối loạn chuyển hóa
                                    </p>
                                    <p>Gói Chăm sóc sức khỏe tại nhà của BookingCare phù hợp cho các đối tượng có nhu cầu tầm soát và theo dõi điều trị Nội tiết</p>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={chuyendoiso} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám</p>
                                    <p> Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng</p>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={banana} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tư vấn phẫu thuật bao quy đầu trọn gói
                                    </p>
                                    <div className="item-text-list">
                                        <ul>
                                            <li>Thực hiện bởi bác sĩ Nam học</li>
                                            <li>Thực hiện tại cơ sở y tế</li>
                                            <li>Chi phí minh bạch</li>

                                        </ul>
                                    </div>
                                    <p>
                                        <span>XEM CHI TIẾT</span>
                                        &ensp;
                                        <span><i className="fas fa-chevron-right"></i></span>
                                    </p>
                                </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
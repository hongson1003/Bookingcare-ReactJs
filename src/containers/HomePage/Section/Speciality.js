import React from "react";
import './main.scss';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    goichamsocsuckhoetainha, chuyendoiso, banana, coxuongkhop, thankinh, tieuhoa, timmach, taimuihong, cotsong
    , yhoccotruyen, chamcuu
} from '../../../assets/images';
class Speciality extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        return (
            <div className="my-carousel">
                <div className="carousel-one">
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={goichamsocsuckhoetainha} />
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
                                    <img src={chuyendoiso} />
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
                                    <img src={banana} />
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
                                    <img src={goichamsocsuckhoetainha} />
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
                                    <img src={chuyendoiso} />
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
                                    <img src={banana} />
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

                <div className="carousel-two">
                    <div className="speciality">
                        <p>Chuyên gia phổ biến</p>
                        <button className="btn">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={coxuongkhop} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Cơ xương khớp
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={thankinh} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Thần kinh
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={tieuhoa} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tiêu hóa
                                    </p>
                                </div>
                            </div>
                        </div>



                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={timmach} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tim mạch
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={taimuihong} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Tai mũi họng</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={cotsong} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Cột sống</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={yhoccotruyen} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Y học cổ truyền</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img src={chamcuu} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">Châm cứu</p>
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
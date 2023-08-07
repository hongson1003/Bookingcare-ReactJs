import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    letanloi, bacsituan, bacsihavanquyet, nguyenthihoaian, donhuhon, bsanhdaidien, nguyenthihuong, bsnga,
} from '../../../assets/images';
import './OutstandingDoctor.scss';
class OutstadingDoctor extends React.Component {

    render() {
        let { settings } = this.props;
        return (
            <div className="section-home outstandingdoctor">
                <div className="envelope">

                    <div className="section-share">
                        <p>Bác sĩ nổi bật tuần qua</p>
                        <button className="btn">TÌM KIẾM</button>
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={letanloi} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Thạc sĩ, Bác sĩ Lê Tấn Lợi
                                    </p>
                                    <p>Thần Kinh</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={bacsituan} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác Sĩ chuyên khoa | Nguyễn Trọng Tuân
                                    </p>
                                    <p>Sức khỏe tâm thần</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={bacsihavanquyet} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Giáo sư, Tiến sĩ Hà Văn Quyết
                                    </p>
                                    <p>Tiêu hóa - Bệnh viêm gan</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={nguyenthihoaian} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Nguyễn Thị Hoài An
                                    </p>
                                    <p>Tai Mũi Họng - Nhi Khoa</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={donhuhon} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Giáo sư, Thầy thuốc nhân dân Đỗ Như Hơn
                                    </p>
                                    <p>Chuyên khoa mắt</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={bsanhdaidien} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Khám Nam Học, Bệnh viện Nam Học và hiếm muộn Hà Nội Nam Học
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={nguyenthihuong} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Bác sĩ chuyên khoa II | Nguyễn Thị Hương
                                    </p>
                                    <p>Cơ xương khớp - Thận - Tiết niệu - Nội khoa</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image">
                                    <img alt="" src={bsnga} />
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tiến Sĩ Bác Sĩ Bùi Thị Phương Nga
                                    </p>
                                    <p>Sản Phụ Khoa</p>
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



export default connect(mapStateToProps, mapDispatchToProps)(OutstadingDoctor);
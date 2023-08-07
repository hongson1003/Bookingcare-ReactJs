import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {
//     hungviet, congnghecao, vietduc, choray, daihocyduoc, trunguongquandoi,
//     letanloi, bacsituan, bacsihavanquyet, nguyenthihoaian, donhuhon, bsanhdaidien, nguyenthihuong, bsnga,
// } from '../../../assets/images';
import './HandBook.scss';
class HandBook extends React.Component {

    render() {
        let { settings } = this.props;
        return (
            <div className="section-home handbook">
                <div className="envelope">

                    <div className="section-share">
                        <p>Cẩm Nang</p>
                        <button className="btn">TẤT CẢ BÀI VIẾT</button>
                    </div>
                    <Slider {...settings}>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image daulung">
                                </div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Đau lưng bên trái: Triệu chứng, nguyên nhân, chăm sóc tại nhà
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image noitiet"></div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Top 6 địa chỉ xét nghiệm nội tiết Hà Nội đáng tin cậy
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image khopgoi"></div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Tràn dịch khớp gối có nguy hiểm không ? Bao lâu thì khỏi ?
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="slider-item">
                                <div className="slider-item-image viemkhopgoi"></div>
                                <div className="slider-item-text">
                                    <p className="slider-item-text_title">
                                        Viêm khớp: Các loại viêm khớp thường gặp, triệu chứng và cách điều trị
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



export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
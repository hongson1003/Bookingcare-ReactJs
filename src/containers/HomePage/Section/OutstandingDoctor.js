import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OutstandingDoctor.scss';
import * as actions from '../../../store/actions';

class OutstadingDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }
    componentDidMount = async () => {
        await this.props.fetchTopDoctors(10);
    }
    componentDidUpdate = (prep, pres, snap) => {
        if (this.props !== prep) {
            this.setState({
                doctors: this.props.topDoctors,
            })
        }
    }

    render() {
        let { settings } = this.props;
        let doctors = this.state.doctors;
        return (
            (doctors && doctors.length > 0
                &&
                <div className="section-home outstandingdoctor">
                    <div className="envelope">

                        <div className="section-share">
                            <p>Bác sĩ nổi bật tuần qua</p>
                            <button className="btn">TÌM KIẾM</button>
                        </div>
                        <Slider {...settings}>
                            {doctors.map(item =>
                                <div key={item.id}>
                                    <div className="slider-item">
                                        <div className="slider-item-image">
                                            <img alt="" src={new Buffer(item.image, 'base64'.toString('binary'))} />
                                        </div>
                                        <div className="slider-item-text">
                                            <p className="slider-item-text_title">
                                                {(this.props.lang === 'vi'
                                                    ?
                                                    item.positionData.valueVi + ' ' + item.firstName + ' ' + item.lastName
                                                    :
                                                    item.positionData.valueEn + ' ' + item.lastName + ' ' + item.firstName
                                                )}
                                            </p>
                                            <p>Răng miệng</p>
                                        </div>
                                    </div>
                                </div>
                            )}


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
        topDoctors: state.admin.topDoctors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: async (limit) => dispatch(await actions.fetchTopDoctors(limit)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(OutstadingDoctor);
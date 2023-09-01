import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OutstandingDoctor.scss';
import * as actions from '../../../store/actions';
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { path } from '../../../utils'
import man from '../../../assets/images/doctorNOAVATAR_man.avif';
import woman from '../../../assets/images/doctorNoAVATAR_woman.jpg';

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

    handleOnDetail = (id) => {
        this.props.history.push(path.DETAIL_DOCTOR + '/' + id);
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
                            <p><FormattedMessage id="home-page.outstandingdoctor" /></p>
                            <button className="btn"><FormattedMessage id="home-page.search" /></button>
                        </div>
                        <Slider {...settings}>
                            {doctors.map(item =>
                                <div key={item.id}>
                                    <div className="slider-item" onClick={() => this.handleOnDetail(item.id)}>
                                        <div className="slider-item-image">
                                            {item && (
                                                !item.image.data.length ? (
                                                    item.gender === 'M' ? (
                                                        <img alt="" src={man} />
                                                    ) : (
                                                        <img alt="" src={woman} />
                                                    )
                                                ) : (
                                                    <img alt="" src={new Buffer(item.image, 'base64'.toString('binary'))} />

                                                )
                                            )}
                                        </div>
                                        <div className="slider-item-text">
                                            <p className="slider-item-text_title">
                                                {(this.props.lang === 'vi'
                                                    ?
                                                    item.positionData.valueVi + ', ' + item.firstName + ' ' + item.lastName
                                                    :
                                                    item.positionData.valueEn + ', ' + item.lastName + ' ' + item.firstName
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstadingDoctor));
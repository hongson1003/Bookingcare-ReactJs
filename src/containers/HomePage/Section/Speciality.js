import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router-dom";
import './Speciality.scss';
import { FormattedMessage } from "react-intl";
import { getAlSpecialties } from "../../../services/userService";
class Speciality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }
    componentDidMount = async () => {
        let response = await getAlSpecialties('ALL');
        if (response.errCode === 0) {
            this.setState({
                specialties: response.data,
            })
        }
    }
    handleRedirectDetail = (item) => {
        console.log(this.props);
        this.props.history.push('/specialty/' + item.id);
    }
    render() {
        let { settings } = this.props;
        let { specialties } = this.state;

        return (
            <div className="section-home speciality">
                <div className="envelope">
                    <div className="section-share">
                        <p>Chuyên gia phổ biến</p>
                        <button className="btn view-more"><FormattedMessage id="home-header.view-more" /></button>
                    </div>
                    <Slider {...settings}>
                        {specialties && specialties.length > 0 &&
                            specialties.map(item => {
                                return (
                                    <div key={item.id} onClick={() => this.handleRedirectDetail(item)}>
                                        <div className="slider-item">
                                            <div className="slider-item-image">
                                                <img alt="" src={item.image} />
                                            </div>
                                            <div className="slider-item-text">
                                                <p className="name" dangerouslySetInnerHTML={{ __html: item.name }}></p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div >
            </div >

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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
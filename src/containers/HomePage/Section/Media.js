import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import {

} from '../../../assets/images';
import './Media.scss';


class Media extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section-home media">
                <div className="envelope">
                    <div className="section-share">
                        <p>Truyền thông nói về BookingCare</p>
                    </div>
                    <div className="slider-item">
                        {/* <div className="slider-item-image khoinghiep"></div> */}
                        <div className="slider-item-image khoinghiep">
                            <iframe width="853" height="533" src="https://www.youtube.com/embed/fPhzPqgYNWE" title="Buoi11P2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="slider-item">
                        <div className="slider-item-image">
                            <div className="media-item suckhoedoisong"></div>
                            <div className="media-item vtv1"></div>
                            <div className="media-item ict"></div>
                            <div className="media-item vnexpress"></div>
                            <div className="media-item vtc1"></div>
                            <div className="media-item yte2"></div>
                            <div className="media-item infonet"></div>
                            <div className="media-item vtv1"></div>
                            <div className="media-item vtc2">
                                <div></div>
                            </div>
                            <div className="media-item vtv1"></div>
                        </div>

                    </div>
                </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Media);
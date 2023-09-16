import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import {

} from '../../../assets/images';
import './Media.scss';
import video from '../../../assets/videos/SnapTik_App_7110930823922109722-HD.mp4';

class Media extends React.Component {

    render() {
        return (
            <div className="section-home media">
                <div className="envelope">
                    <div className="section-share">
                        <p>Truyền thông nói về BookingCare</p>
                    </div>
                    <div className="slider-item">
                        <video controls src={video} poster="https://raw.githubusercontent.com/hongson1003/PostImage/main/nhacchualanhvetthuong.jpg"></video>
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
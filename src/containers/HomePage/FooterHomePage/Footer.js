import React from "react";
import { connect } from "react-redux";
import { CHANGE_LANGUAGE_APP } from "../../../store/actions/appActions";
import './Footer.scss';
class Footer extends React.Component {

    render() {
        return (
            <div className="home-footer">
                <p>© 2023 BookingCare - Hồng Sơn Nguyễn.</p>
                <p>
                    <span><i className="fab fa-facebook-square"></i></span>
                    <span><i className="fab fa-youtube"></i></span>
                </p>
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



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
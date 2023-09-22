import React from "react";
import './VerifyBooking.scss';
import Header from "../../HeaderHomePage/Header";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import { LANGUAGES } from "../../../../utils";
import { CHANGE_LANGUAGE_APP } from "../../../../store/actions";
import { withRouter } from "react-router-dom";
import { postVerifyBooking } from "../../../../services/patientService";
class VerifyBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errCode: -1,
        }
    }

    componentDidMount = async () => {
        let token = this.props.match.params.token.split('=')[1];
        let doctorId = this.props.match.params.doctorId.split('=')[1];
        let response = await postVerifyBooking({
            doctorId: +doctorId,
            token: token,
        });
        this.setState({
            errCode: response.errCode,
        })
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="main-verify">
                    {
                        this.state.errCode === 0 ?
                            <h1><FormattedMessage id="patient.Appointment confirmed successfully" /></h1> : (
                                this.state.errCode === 2 ?
                                    <h1><FormattedMessage id="patient.This appointment has been confirmed" /></h1> :
                                    <h1><FormattedMessage id="patient.No appointment found" /></h1>
                            )

                    }
                </div>
            </React.Fragment>
        )
    }
}




const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: language => dispatch(CHANGE_LANGUAGE_APP(language))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyBooking));
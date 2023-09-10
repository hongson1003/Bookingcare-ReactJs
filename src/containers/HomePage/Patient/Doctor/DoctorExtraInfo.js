import React from "react";
/* eslint-disable no-unused-vars */
import localization from 'moment/locale/vi';
/* eslint-enable no-unused-vars */
import './DoctorExtraInfo.scss';
import { LANGUAGES, Payment } from "../../../../utils/constant";
import { connect } from "react-redux";
// import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { getDoctorInfo } from "../../../../services/userService";
import sadincon from '../../../../assets/images/sadicon.png'
class DoctorExtraInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressClinic: '',
            nameClinic: '',
            priceData: '',
            note: '',
            paymentId: '',
            hasInfo: 0,
            show: false,
        }
    }
    componentDidMount = async () => {
        let id = this.props.id;
        let { data } = await getDoctorInfo(id);
        if (data) {
            this.setState({
                addressClinic: data.addressClinic,
                nameClinic: data.nameClinic,
                priceData: data.priceData,
                note: data.note,
                paymentId: data.paymentId,
                hasInfo: 1,
            })
        }
    }

    handleOnShowHide = () => {
        this.setState({
            show: !this.state.show
        })
    }
    componentDidUpdate = async (prevprops, prevstate) => {


    }



    render() {
        return (
            <React.Fragment>
                {
                    this.state.hasInfo ? <>
                        <div className="content-up">
                            <h5 className="address"><FormattedMessage id="patient.examinationAddress" /></h5>
                            <p className="nameClinic">{this.state.nameClinic}</p>
                            <p>{this.state.addressClinic}</p>
                        </div>
                        <div className="content-down">
                            {!this.state.show &&
                                <p className="price">
                                    <span><FormattedMessage id="patient.examinationPrice" />:</span> <></>
                                    <span>{this.props.language === LANGUAGES.VI ? new Intl.NumberFormat().format(this.state.priceData.valueVi) + ' đ' : this.state.priceData.valueEn + ' USD'}</span>
                                    &nbsp;
                                    {!this.state.show && <span className="viewInfo" onClick={this.handleOnShowHide}>&gt;&gt;<FormattedMessage id="patient.seeDetails" /></span>}
                                </p>
                            }

                            {
                                this.state.show &&
                                <div className="base-info-detail">
                                    <div className="header">
                                        <p><FormattedMessage id="patient.examinationPrice" /></p>
                                        {this.props.language === LANGUAGES.VI ?
                                            <p>{new Intl.NumberFormat().format(this.state.priceData.valueVi) + ' đ'}</p> :
                                            <p>{this.state.priceData.valueEn + ' USD'}</p>}
                                    </div>

                                    <p>{this.state.note}</p>
                                    <div className="footer">
                                        {this.state.paymentId === Payment.CAST ?
                                            <p><FormattedMessage id="patient.The clinic accepts payment in cash" /></p> :
                                            (
                                                this.state.paymentId === Payment.CREDIT_CARD ?
                                                    <p><FormattedMessage id="patient.The clinic accepts payment by credit card" /></p> :
                                                    <p><FormattedMessage id="patient.The clinic accepts payment in the form of cash and card swipe" /></p>
                                            )
                                        }
                                    </div>
                                    <span className="viewInfo mt-1" onClick={this.handleOnShowHide}><FormattedMessage id="patient.hideDetails" /></span>
                                </div>
                            }


                            {/* //console.log(new Intl.NumberFormat().format(price)) */}
                        </div>
                    </> : <p className="warning-empty-info"><FormattedMessage id="patient.Detailed information is being updated" />
                        <img className="sad-icon" alt="" src={sadincon}></img>
                    </p>
                }
            </React.Fragment>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        language: state.app.language,
    }
}


export default connect(mapStatetoProps)(DoctorExtraInfo);
import React from "react";
import { connect } from "react-redux";
import './DoctorInfo.scss';
import { getDoctorInfoSchedule } from '../../../../services/userService';
import { LANGUAGES } from "../../../../utils/constant";
import moment from "moment";
class DoctorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }



    componentDidMount = async () => {
        let response = await getDoctorInfoSchedule(this.props.doctorId, this.props.idSchedule);
        this.setState({
            data: response.data,
        })
    }

    toCaptilize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        let data = this.state.data;
        let img = '';
        if (data && data.image)
            img = new Buffer(data.image, 'base64').toString('binary');
        return (
            <div className="data-info">
                <div className="data-avatar">
                    {img && <img src={img} alt="" />}
                </div>
                {data.doctorData && data.doctorData.description &&
                    <div className="data-description">
                        <p>{data.doctorData.description}</p>
                        <div className="data-description-content">
                            <p>
                                {this.props.language === LANGUAGES.VI ?
                                    data.doctorSchedule.timeTypeData.ValueVi + ' - ' + this.toCaptilize(moment(data.doctorSchedule.date).format('dddd DD-MM-YYYY')) :
                                    data.doctorSchedule.timeTypeData.ValueEn + ' - ' + this.toCaptilize(moment(data.doctorSchedule.date).locale('en').format('ddd MM-DD-YYYY'))}
                            </p>
                            <p>
                                {this.props.language === LANGUAGES.VI ?
                                    'Giá tiền: ' + new Intl.NumberFormat().format(data.doctorInfo.priceData.ValueVi) + ' đ' :
                                    data.doctorInfo.priceData.ValueEn + ' USD'
                                }
                            </p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);


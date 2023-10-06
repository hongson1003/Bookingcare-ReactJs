import React from "react";
import moment from "moment/moment";
/* eslint-disable no-unused-vars */
import localization from 'moment/locale/vi';
/* eslint-enable no-unused-vars */
import './DoctorSchedule.scss';
import { LANGUAGES } from "../../../../utils/constant";
import { connect } from "react-redux";
import { getScheduleById } from '../../../../services/userService';
// import _ from "lodash";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ModalDoctorSchedule from "./Modal/ModalDoctorSchedule";
import * as actions from '../../../../store/actions';
import Schedules from "./Schedules";

class DoctorSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDays: [],
            selectedDate: '',
            arrSchedules: [],
            start: 0,
        }
    }
    componentDidMount = async () => {
        await this.handleSelect(0, 4);
        await this.handleGetSchedule(+this.props.id, this.state.selectedDate);
        if (this.state.arrSchedules.length === 0) {
            await this.handleSelect(1, 5);
            await this.handleGetSchedule(+this.props.id, this.state.selectedDate);
        }
    }
    componentDidUpdate = async (prevprops, prevstate) => {
        if (prevprops.language !== this.props.language) {
            if (this.state.start) {
                await this.handleSelect(1, 5, 1);
            } else {
                await this.handleSelect(0, 4, 1);
            }
        }

    }

    handleSelect = async (start, end, status) => {
        let arr = [];
        for (let i = start; i < end; i++) {
            arr.push(this.handleDays(moment(new Date()).add(i, 'days')));
        }
        if (!status) {
            await this.setState({
                start: start,
                arrDays: arr,
                selectedDate: arr[0].value,
            })
        } else {
            await this.setState({
                start: start,
                arrDays: arr,
            })
        }
    }
    handleDays = (date) => {
        let label = '';
        if (new Date(date).toString() === new Date().toString()) {
            if (this.props.language === LANGUAGES.VI)
                label = 'Hôm nay - ' + moment(date).format('DD/MM');
            else
                label = 'Today - ' + moment(date).format('DD/MM');
        } else {
            if (this.props.language === LANGUAGES.VI)
                label = moment(date).format('dddd - DD/MM');
            else
                label = moment(date).locale('en').format('ddd - DD/MM');
        }
        let value = moment(date).format('DD/MM/YYYY');
        return {
            label: label,
            value: value
        }
    }

    handleGetSchedule = async (doctorId, date) => {
        let { data } = await getScheduleById(doctorId, date);
        let dataCustomize = [];
        data.forEach(item => {
            let hours = +item.timeTypeData.valueVi.split(':')[0];
            if (new Date().getHours() < hours) //05/09/2023 09:59
                dataCustomize.push(item);
        })
        let nowDate = moment(new Date()).format('DD/MM/YYYY');
        if (nowDate === this.state.selectedDate) {
            if (dataCustomize.length > 0)
                this.setState({
                    arrSchedules: dataCustomize,
                })
        } else {
            this.setState({
                arrSchedules: data,
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        await this.setState({
            selectedDate: e.target.value,
        })
        await this.handleGetSchedule(+this.props.id, this.state.selectedDate);
    }

    handleOnClickSchedule = async (item) => {
        await this.props.turnOnModal(item);
    }
    render() {
        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="booking-calendar">
                        <div className="schedules-main">
                            <Schedules
                                id={+this.props.id}
                            />
                        </div>
                        <div className="calendar-info">
                            <DoctorExtraInfo id={+this.props.id} />
                        </div>
                    </div>
                </div>
                <ModalDoctorSchedule />
            </React.Fragment>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        language: state.app.language,
        idModal: state.app.idModal,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        turnOnModal: async (item) => await dispatch(actions.turnOnModal(item)),
        turnOffModal: () => dispatch(actions.turnOffModalAction()),
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(DoctorSchedule);
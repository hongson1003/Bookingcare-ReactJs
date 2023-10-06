import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import * as actions from '../../store/actions';
import DatePicker from '../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import { getAllPatientsForDoctorByIdDate } from '../../services/userService';
import ModalConfirm from '../System/doctor/ModalConfirm';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            user: {},
            selectDate: new Date(),
        }
    }
    componentDidMount = async () => {
        if (this.props.userInfo) {
            this.handleGetPatients();
        }
        await this.props.getAllCodeTime();
        this.setState({
            rangeTimes: this.props.allTime,
        })
    }

    handleGetPatients = async () => {
        let response = await getAllPatientsForDoctorByIdDate(this.props.userInfo.id, this.state.selectDate);
        if (response.errCode === 0) {
            this.setState({
                user: this.props.userInfo,
                patients: response.data,
            })
        }
    }

    componentDidUpdate = async (prevp) => {
        if ((prevp.userInfo !== this.props.userInfo && this.props.isLoggedIn) || (prevp.modal !== this.props.modal && this.props.modal === false)) {
            console.log('được update')
            this.handleGetPatients();
        }
    }
    handleOnChangeDate = async (e) => {
        await this.setState({
            selectDate: e[0],
        })
        this.handleGetPatients();
    }

    handleConfirm = (item) => {
        this.props.turnOnConfirm({
            ...item,
            ...this.props.userInfo
        });
    }




    render() {
        let { patients } = this.state;
        return (
            <div className='container-fluid manage-schedule-doctor'>
                <div className='row pt-4 mb-3'>
                    <div className='col-12'>
                        <h2 className='text-center'>
                            <FormattedMessage id={"manage-patient.title"} />
                        </h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'>
                        <label>
                            <FormattedMessage id={"manage-schedule.choose-date"} />
                        </label>
                        <DatePicker
                            onChange={this.handleOnChangeDate}
                            className="form-control input"
                            value={this.state.selectDate}
                            selected={new Date()}

                        >
                        </DatePicker>
                    </div>
                </div>
                {
                    patients && patients.length > 0 ?

                        <div className='row mt-5 mb-3'>
                            <div className='col-12 mb-3 text-center font-weight-bold'>
                                <p>
                                    Chào bác sĩ, đây là lịch khám của bác sĩ trong ngày hôm nay, chúc bác sĩ có một ngày làm việc tốt lành
                                    &nbsp;
                                    <img alt='' style={{ width: '20px', height: ' 20px' }} src='https://raw.githubusercontent.com/hongson1003/PostImage/main/icon-vui.png' />
                                </p>
                            </div>

                            <div className='col-12 table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Họ và Tên</th>
                                            <th>Tuổi</th>
                                            <th>Email</th>
                                            <th>Giới tính</th>
                                            <th>SĐT</th>
                                            <th>Thời gian</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((item, index) => {
                                            return (
                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    <td>{item.bookingData.firstName + ' ' + item.bookingData.lastName}</td>
                                                    <td>{new Date().getFullYear() - item.yearBirthday}</td>
                                                    <td>{item.bookingData.email}</td>
                                                    <td>{item.bookingData.genderData.valueVi}</td>
                                                    <td>{item.bookingData.phoneNumber}</td>
                                                    <td className='font-weight-bold'>{item.timeType.valueVi}</td>
                                                    <td>
                                                        <button className='btn btn-primary' onClick={() => this.handleConfirm(item)}>Xác nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div> :
                        <h2 className='mt-5 text-center'>KHÔNG CÓ LỊCH KHÁM BỆNH TRONG NGÀY</h2>


                }
                {
                    this.props.isLoading &&
                    <div className='loading'>
                        <div className='loading-item'></div>
                        <div className="content-loading">Chờ một lát, Chúng tôi đang gửi email thông báo xác nhận cho bạn...</div>
                    </div>
                }
                <ModalConfirm
                    modal={this.state.modal}
                    backdrop="static" keyboard={false}
                />



            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        allTime: state.admin.allTime,
        modal: state.app.confirm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCodeTime: async () => dispatch(await actions.fetAllCodeTime()),
        turnOnConfirm: async (item) => await dispatch(actions.turnOnConfirm(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../store/actions';
import DatePicker from '../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import { getAllPatientsForDoctorById } from '../../services/userService';
class ManageSchedule extends Component {
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
            let response = await getAllPatientsForDoctorById(this.props.userInfo.id);
            if (response.errCode === 0) {
                this.setState({
                    user: this.props.userInfo,
                    patients: response.data,
                })
            }

        }
        await this.props.getAllCodeTime();
        this.setState({
            rangeTimes: this.props.allTime,
        })
    }
    componentDidUpdate = async (prevp) => {
        if (prevp.userInfo !== this.props.userInfo) {
            let user = { ...this.props.userInfo };
            let response = await getAllPatientsForDoctorById(user.id);
            if (response.errCode === 0) {
                this.setState({
                    user: user,
                    patients: response.data
                })
            }

        }
    }
    handleOnChangeDate = async (e) => {
        await this.setState({
            selectDate: e[0],
        })
    }




    render() {
        let { patients, user } = this.state;
        return (
            <div className='container-fluid manage-schedule-doctor'>
                <div className='row pt-4 mb-3'>
                    <div className='col-12'>
                        <h2 className='text-center'>
                            <FormattedMessage id={"manage-schedule.manage_schedule"} />
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
                            minDate={new Date()}
                        >
                        </DatePicker>
                    </div>
                </div>

                {patients && patients.length > 0 &&
                    <div className='row mt-5'>
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
                                    {patients.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.bookingData.firstName + ' ' + item.bookingData.lastName}</td>
                                            <td>{new Date().getFullYear() - item.yearBirthday}</td>
                                            <td>{item.bookingData.email}</td>
                                            <td>{item.bookingData.genderData.valueVi}</td>
                                            <td>{item.bookingData.phoneNumber}</td>
                                            <td>{item.timeType.valueVi}</td>
                                            <td>
                                                <button className='btn btn-primary'>Xác nhận</button>
                                                <button className='btn btn-info'>Gửi hóa đơn</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>



                }



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,
        allTime: state.admin.allTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCodeTime: async () => dispatch(await actions.fetAllCodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

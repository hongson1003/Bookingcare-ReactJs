import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import * as actions from '../../../../../store/actions';
import './ModalDoctorSchedule.scss';
import { FormattedMessage } from "react-intl";
import DoctorInfo from "../DoctorInfo";
import { createBookingService } from '../../../../../services/patientService';
import { toast } from "react-toastify";
import moment from "moment";
import { LANGUAGES } from "../../../../../utils/constant";
class ModalDoctorSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            address: '',
            gender: '',
            yearBirthday: '',
            reason: '',
            genders: [],
            doctorId: '',
            idSchedule: '',
            timeType: '',
        }
        this.toggle = this.toggle.bind(this);
    }
    toCaptilize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    toggle() {
        this.props.turnOffModal();
        this.handleClearState();
    }
    handleStandardizeFullName = (fullName) => {
        var firstName = fullName.split(' ').slice(0, -1).join(' ');
        var lastName = fullName.split(' ').slice(-1).join(' ');
        return {
            firstName,
            lastName
        }
    }
    componentDidMount = async () => {
        this.props.getGendersStart();
    }
    componentDidUpdate = async (prevProps) => {
        // luôn luôn phải có điều kiện vì nó update liên tục
        if (this.props.genders !== prevProps.genders)
            this.setState({
                genders: this.props.genders,
                gender: this.props.genders[0].keyMap,
            })
        if (prevProps.modal !== this.props.modal) {
            let date = '';
            if (this.props.language === LANGUAGES.VI)
                date = this.props.dataSchedule.timeTypeData.valueVi + ', ' + this.toCaptilize((moment(new Date(this.props.dataSchedule.date)).format('dddd DD/MM/YYYY')));
            else
                date = this.props.dataSchedule.timeTypeData.valueEn + ', ' + this.toCaptilize((moment(new Date(this.props.dataSchedule.date)).locale('en').format('ddd MM/DD/YYYY')));
            await this.setState({
                doctorId: this.props.dataSchedule.doctorId,
                idSchedule: this.props.dataSchedule.scheduleId,
                timeType: this.props.dataSchedule.timeType,
                date: date,
                timeTypeData: this.props.dataSchedule.timeTypeData,
                doctorData: this.props.dataSchedule.doctorSchedule
            })
        }
    }

    hanhdleOnChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        })
    }
    handleOnClickOrder = async () => {
        let fullName = this.handleStandardizeFullName(this.state.name);
        let data = {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.gender,
            yearBirthday: this.state.yearBirthday,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            idSchedule: this.state.idSchedule,
            timeType: this.state.timeType,
            doctor: this.state.doctorData,
            date: this.state.date,
            language: this.props.language,
        }
        await this.props.getLoading();
        console.log(data)
        let response = await createBookingService(data);
        this.props.stopLoading();
        if (response.errCode === 0) {
            toast.success('Bạn đã tạo lịch khám thành công');
            this.props.turnOffModal();

            this.handleClearState();
        } else if (response.errCode === 2) {
            toast.warning('Lịch khám này đã được đặt, vui lòng kiểm tra lại');
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin !!!');
        }
    }

    handleClearState = () => {
        this.setState({
            name: '',
            phoneNumber: '',
            email: '',
            address: '',
            gender: this.state.genders[0].keyMap,
            yearBirthday: '',
            reason: '',
            doctorId: '',
            idSchedule: '',
            timeType: '',
        })
    }
    render() {
        let genders = this.state.genders;
        return (
            <>
                <Modal style={{ maxWidth: '700px', width: '100%' }} isOpen={this.props.modal} toggle={this.toggle} className={'modal-schedule'} backdrop='static'>
                    <ModalHeader className={'modal-schedule_header'} toggle={this.toggle}><FormattedMessage id="patient.order-schedule.title" /></ModalHeader>
                    <ModalBody className="modal-schedule-body">
                        <DoctorInfo
                            doctorId={this.props.dataSchedule.doctorId}
                            idSchedule={this.props.dataSchedule.id}
                        />
                        <div className="main-orders">
                            <div className="form-row row">
                                <div className="col-4">
                                    <label>Họ tên người đặt lịch</label>
                                    <input value={this.state.name} type="text" className="form-control" onChange={(e) => this.hanhdleOnChangeInput(e, 'name')} />
                                </div>
                                <div className="col-4">
                                    <label >Số điện thoại</label>
                                    <input value={this.state.phoneNumber} type="text" className="form-control" onChange={(e) => this.hanhdleOnChangeInput(e, 'phoneNumber')} />
                                </div>
                                <div className="col-4">
                                    <label >Địa chỉ email</label>
                                    <input value={this.state.email} type="text" className="form-control" onChange={(e) => this.hanhdleOnChangeInput(e, 'email')} />
                                </div>
                            </div>

                            <div className="form-row row">
                                <div className="col-4">
                                    <label >Địa chỉ liên hệ</label>
                                    <input value={this.state.address} type="text" className="form-control" id="" placeholder="" onChange={(e) => this.hanhdleOnChangeInput(e, 'address')} />
                                </div>
                                <div className="col-4">
                                    <label >Giới tính</label>
                                    <select value={this.state.gender} id="gender" className="form-control"
                                        onChange={(e) => this.hanhdleOnChangeInput(e, 'gender')}
                                    >
                                        {
                                            genders && genders.length > 0 &&
                                            genders.map(item => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>{this.props.language === 'vi' ?
                                                        item.valueVi :
                                                        item.valueEn
                                                    }</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label >Năm sinh</label>
                                    <input value={this.state.yearBirthday} type="number" min={1980} max={2023} step={1} className="form-control" onChange={(e) => this.hanhdleOnChangeInput(e, 'yearBirthday')} />
                                </div>

                            </div>

                            <div className="form-row row">
                                <div className="col-12">
                                    <label >Lý do khám</label>
                                    <textarea value={this.state.reason} rows={4} className="form-control" onChange={(e) => this.hanhdleOnChangeInput(e, 'reason')} />
                                </div>

                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleOnClickOrder()}><FormattedMessage id="patient.order-schedule.order" /></Button>
                        <Button color="secondary" onClick={this.toggle}><FormattedMessage id="patient.order-schedule.cancel" /></Button>
                    </ModalFooter>
                </Modal>
                {
                    this.props.isLoading &&
                    <div className='loading'>
                        <div className='loading-item'></div>
                        <div className="content-loading">Chờ một lát, Chúng tôi đang gửi email thông báo xác nhận cho bạn...</div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        modal: state.app.modal,
        dataSchedule: state.app.dataSchedule,
        genders: state.admin.genders,
        isLoading: state.admin.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        turnOffModal: () => dispatch(actions.turnOffModalAction()),
        getGendersStart: async () => {
            dispatch(await actions.fetchGenderStart());
        },
        getLoading: async () => dispatch({
            type: 'FIRE_FETCH',
        }),
        stopLoading: async () => dispatch({
            type: 'FETCH_STOP',
        })

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ModalDoctorSchedule);


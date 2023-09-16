import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import * as actions from '../../../../../store/actions';
import './ModalDoctorSchedule.scss';
import { FormattedMessage } from "react-intl";
import DoctorInfo from "../DoctorInfo";

class ModalDoctorSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.turnOffModal();
    }


    render() {
        return (
            <Modal style={{ maxWidth: '700px', width: '100%' }} isOpen={this.props.modal} toggle={this.toggle} className={'modal-schedule'} backdrop='static'>
                <ModalHeader className={'modal-schedule_header'} toggle={this.toggle}><FormattedMessage id="patient.order-schedule.title" /></ModalHeader>
                <ModalBody className="modal-schedule-body">
                    <DoctorInfo
                        id={this.props.id}
                        idModal={this.props.idModal}
                    />
                    <div className="main-orders">
                        <div className="form-row row">
                            <div className="col-4">
                                <label >Họ tên người đặt lịch</label>
                                <input type="tẽt" className="form-control" />
                            </div>
                            <div className="col-4">
                                <label >Số điện thoại</label>
                                <input type="text" className="form-control" id="" placeholder="" />
                            </div>
                            <div className="col-4">
                                <label >Địa chỉ email</label>
                                <input type="text" className="form-control" id="" placeholder="" />
                            </div>
                        </div>

                        <div className="form-row row">
                            <div className="col-12">
                                <label >Địa chỉ liên hệ</label>
                                <input type="text" className="form-control" id="" placeholder="" />
                            </div>
                            <div className="col-12">
                                <label >Lý do khám</label>
                                <textarea rows={4} className="form-control" />
                            </div>
                        </div>

                        <div className="form-row row">
                            <div className="col-4">
                                <label >Đặt cho ai</label>
                                <input type="text" className="form-control" id="" placeholder="" />
                            </div>
                            <div className="col-4">
                                <label >Giới tính</label>
                                <input type="text" className="form-control" id="" placeholder="" />
                            </div>
                            <div className="col-4">
                                <label >Năm sinh</label>
                                <input type="number" min={1980} max={2023} step={1} className="form-control" id="" placeholder="" />
                            </div>
                        </div>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}><FormattedMessage id="patient.order-schedule.order" /></Button>
                    <Button color="secondary" onClick={this.toggle}><FormattedMessage id="patient.order-schedule.cancel" /></Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        modal: state.app.modal,
        idModal: state.app.idModal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        turnOffModal: () => dispatch(actions.turnOffModalAction()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ModalDoctorSchedule);


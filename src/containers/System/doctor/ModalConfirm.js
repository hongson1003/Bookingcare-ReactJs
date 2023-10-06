import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import './ModalConfirm.scss';
import { FormattedMessage } from "react-intl";
import actionTypes from "../../../store/actions/actionTypes";
import { sendResultToPatient } from "../../../services/userService";
import { toast } from "react-toastify";
class ModalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            image: '',
            data: {},
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = () => {

    }
    componentDidUpdate = (prevp) => {
        if (prevp.modal !== this.props.modal) {
            this.setState({
                data: this.props.dataPatient
            })
        }
    }

    toggle() {
        this.props.turnOffConfirm();
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


    handleOnChange = async (e) => {
        const [file] = e.target.files
        let previewImage = '';
        if (file) {
            previewImage = URL.createObjectURL(file);
            let image = await this.toBase64(file);
            let arr = image.split('base64,');
            console.log(arr);
            this.setState({
                previewImage: previewImage,
                image: arr[1]
            })
        }
    }

    handleOnSend = async () => {
        // return
        let { data } = this.state;
        this.props.getLoading();
        let response = await sendResultToPatient({
            emailDoctor: data.email,
            nameDoctor: data.name,
            date: data.date,
            firstName: data.bookingData.firstName,
            lastName: data.bookingData.lastName,
            language: this.props.language,
            image: this.state.image,
            emailPatient: data.bookingData.email,
            patientId: data.patientId,
            timeType: data.timeType
        });
        this.props.stopLoading();
        if (response.errCode === 0) {
            toast.success('Bệnh nhân đã được khám');
        }
        this.props.turnOffConfirm();
    }


    render() {
        let { dataPatient } = this.props;
        return (
            <>
                <Modal className="modal-confirm" style={{ maxWidth: '700px', width: '100%' }} isOpen={this.props.modal} toggle={this.toggle} backdrop='static'>
                    <ModalHeader className="modal-confirm-header" toggle={this.toggle}>Xác nhận thông tin khám bệnh</ModalHeader>
                    <ModalBody className="modal-body">
                        {
                            dataPatient.bookingData &&
                            <div className="main-content container">
                                <div className="row">
                                    <div className="col-6">
                                        <label>Email bệnh nhân</label> <br />
                                        <input disabled className="form-control" value={dataPatient.bookingData.email} />
                                    </div>
                                    <div className="col-6 input-image row">
                                        <div className="col-9">
                                            <label>Chọn hóa đơn</label>
                                            <input onChange={(e) => this.handleOnChange(e)} type="file" />
                                        </div>
                                        {this.state.previewImage && <div className="image col-3" style={{ backgroundImage: `url(${this.state.previewImage})` }}>                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleOnSend()}>Gửi</Button>
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
        modal: state.app.confirm,
        isLoading: state.admin.isLoading,
        dataPatient: state.app.dataPatient,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        turnOffConfirm: () => dispatch({
            type: actionTypes.TURN_OFF_CONFIRM,
        }),
        getLoading: async () => dispatch({
            type: 'FIRE_FETCH',
        }),
        stopLoading: async () => dispatch({
            type: 'FETCH_STOP',
        })

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);


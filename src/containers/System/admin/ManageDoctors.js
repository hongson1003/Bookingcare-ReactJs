import React from "react";
import { connect } from "react-redux";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { insertDetailDr } from '../../../services/userService';
import { toast } from "react-toastify";
import { getDetailDoctor, updateDetailDoctor, getDoctorInfo, getAllSpecialties } from '../../../services/userService';
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it this.state.doctors */);

class ManageDoctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: { label: 'Chọn bác sĩ...' },
            description: '',
            contentHTML: '',
            contentText: '',
            doctors: [],
            isEditting: 'none',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            doctorInfo: {},
            payments: [],
            prices: [],
            provinces: [],
            specialties: [],
            selectedSpecialty: '',
            clinics: [],
            selectedClinic: '',
        };

    }


    componentDidMount = async () => {
        if (this.props.lang === LANGUAGES.VI) {
            await this.setState({
                selectedOption: { label: 'Chọn bác sĩ...' },
            })
        } else {
            await this.setState({
                selectedOption: { label: 'Choose a doctor...' },
            })
        }
        await this.props.getAllDoctors();
        await this.props.getDoctorInfor();
        await this.handleGetSpecialties();
    }
    componentDidUpdate = async (prevp) => {
        if (prevp.doctors !== this.props.doctors) {
            let drs = [];
            if (this.props.doctors && this.props.doctors.length > 0) {
                this.props.doctors.forEach((item, index) => {
                    let label = '';
                    if (this.props.lang === LANGUAGES.VI)
                        label = `${item.firstName} ${item.lastName}`;
                    else
                        label = `${item.lastName} ${item.firstName}`;
                    let temp = {
                        value: item,
                        label: label,
                    };
                    drs.push(temp);
                })

            };
            let doctorss = [
                ...this.state.doctors,
                ...drs
            ]
            await this.setState({
                doctors: doctorss,
            })
        }
        if (prevp.doctorInfo.payments !== this.props.doctorInfo.payments) {
            this.handleGetAllCodeDoctorInfo('payments');
        }
        if (prevp.doctorInfo.provinces !== this.props.doctorInfo.provinces) {
            this.handleGetAllCodeDoctorInfo('provinces');
        }
        if (prevp.doctorInfo.prices !== this.props.doctorInfo.prices) {
            this.handleGetAllCodeDoctorInfo('prices');
        }
        // if (prevp.doctorInfo.specialties !== this.state.specialties) {
        //     this.handleGetSpecialties('specialties');
        // }
        if (prevp.lang !== this.props.lang) {
            let drs = this.props.doctors;
            if (drs && drs.length > 0) {
                let doctors = drs.map(item => {
                    let label = '';
                    if (this.props.lang === LANGUAGES.VI)
                        label = `${item.firstName} ${item.lastName}`;
                    else
                        label = `${item.lastName} ${item.firstName}`;
                    let temp = {
                        value: item,
                        label: label,
                    };
                    return temp;
                })

                if (this.state.selectedOption.value) {
                    let selectLabel = '';
                    let item = this.state.selectedOption.value;
                    if (this.props.lang === LANGUAGES.VI)
                        selectLabel = `${item.firstName} ${item.lastName}`;
                    else
                        selectLabel = `${item.lastName} ${item.firstName}`;
                    this.setState({
                        selectedOption: {
                            label: selectLabel,
                            value: item
                        },
                        doctors: doctors
                    })
                } else {
                    if (this.props.lang === LANGUAGES.VI) {
                        await this.setState({
                            selectedOption: { label: 'Chọn bác sĩ...' },
                            doctors: doctors

                        })
                    } else {
                        await this.setState({
                            selectedOption: { label: 'Choose a doctor...' },
                            doctors: doctors

                        })
                    }

                }

            }
            this.handleGetAllCodeDoctorInfo('payments');
            this.handleGetAllCodeDoctorInfo('provinces');
            this.handleGetAllCodeDoctorInfo('prices');
            if (this.state.selectedPayment) {
                this.handleGetSelectedDoctorInfo('selectedPayment');
            }
            if (this.state.selectedPrice) {
                this.handleGetSelectedDoctorInfo('selectedPrice');
            }
            if (this.state.selectedProvince) {
                this.handleGetSelectedDoctorInfo('selectedProvince');
            }
        }

    }
    handleGetAllCodeDoctorInfo = (key) => {
        if (this.props.doctorInfo) {
            let data = this.props.doctorInfo;
            let selectList = data[key].map(item => {
                let label = '';
                if (this.props.lang === LANGUAGES.VI)
                    if (key === 'prices')
                        label = new Intl.NumberFormat('en-US').format(item.valueVi) + ' đ';
                    else
                        label = item.valueVi;
                else
                    if (key === 'prices')
                        label = item.valueEn + ' USD';
                    else
                        label = item.valueEn;
                let value = item;
                return {
                    label: label,
                    value: value
                }
            })
            this.setState({
                [key]: selectList
            })
        }

    }

    handleCreateSelectOptionFromDB = async (e, name) => {
        this.setState({
            [name]: e,
        })
    }

    handleGetSelectedDoctorInfo = async (selected) => {
        let label = '';
        if (this.props.lang === LANGUAGES.VI) {
            if (selected === 'selectedPrice')
                label = new Intl.NumberFormat('en-US').format(this.state[selected].value.valueVi) + ' đ';
            else
                label = this.state[selected].value.valueVi;
        } else {
            if (selected === 'selectedPrice')
                label = new Intl.NumberFormat('en-US').format(this.state[selected].value.valueEn) + ' đ';
            else
                label = this.state[selected].value.valueEn;
        }
        let temp = { ...this.state[selected] };
        temp.label = label;
        await this.setState({
            [selected]: temp
        })
    }

    handleOnChangeText = (e, target) => {
        this.setState({
            [target]: e.target.value,
        })
    }


    handleOnClick = async () => {
        if (!this.state.selectedProvince.value || !this.state.selectedPayment.value || !this.state.selectedPrice.value) {
            toast.error('Vui lòng nhập đầy đủ thông tin !!!')
            return;
        }
        let obj = {
            doctorId: this.state.selectedOption.value.id,
            contentHTML: this.state.contentHTML,
            contentText: this.state.contentText,
            description: this.state.description,
            provinceId: this.state.selectedProvince.value.keyMap,
            paymentId: this.state.selectedPayment.value.keyMap,
            priceId: this.state.selectedPrice.value.keyMap,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value.id,
        };
        let response = await insertDetailDr(obj);
        if (!response.errCode) {
            toast.success('Đã thêm thông tin chi tiết cho bác sĩ')
            this.setState({
                isEditting: 'none',
                selectedOption: { label: 'Chọn bác sĩ...' }
            })
            this.handleOnClear();
        }
        else
            toast.error('Thêm thông tin bác sĩ thất bại')
    }

    handleChange = async (inputSelect) => {
        let selected = { ...this.state.selectedOption }
        selected.value = inputSelect.value;
        selected.label = inputSelect.label;
        this.setState({
            selectedOption: selected,
        });
        this.handleOnClear();
        this.handleGetDetailDoctor(inputSelect.value.id);
        this.handleGetDoctorInfo(inputSelect.value.id);
    };

    handleOnChangeDoctorInfo = (selected, type) => {
        this.setState({
            [type]: selected
        })
    }



    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentText: text
        })
    }
    handleTextArea = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleOnClear = () => {
        this.setState({
            description: '',
            contentHTML: '',
            contentText: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        })
    }

    handleGetDetailDoctor = async (id) => {
        let response = await getDetailDoctor(id);
        if (!response.errCode) {
            let data = response.data;
            if (data && data.doctorData) {
                await this.setState({
                    description: data.doctorData.description,
                    contentHTML: data.doctorData.contentHTML,
                    contentText: data.doctorData.contentText,
                    isEditting: true,
                })
            } else
                this.setState({
                    isEditting: false,
                })
        }
    }
    handleOnUpdate = async () => {
        if (!this.state.selectedProvince.value || !this.state.selectedPayment.value || !this.state.selectedPrice.value) {
            toast.error('Vui lòng nhập đầy đủ thông tin !!!')
            return;
        }
        let data = {
            id: this.state.selectedOption.value.id,
            description: this.state.description,
            contentHTML: this.state.contentHTML,
            contentText: this.state.contentText,
            provinceId: this.state.selectedProvince.value.keyMap,
            paymentId: this.state.selectedPayment.value.keyMap,
            priceId: this.state.selectedPrice.value.keyMap,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value.id,
        }
        let response = await updateDetailDoctor({ data });
        if (!response.errCode) {
            this.setState({
                isEditting: 'none',
                selectedOption: { label: 'Chọn bác sĩ...' }

            })
            this.handleOnClear();
            toast.success('Update bài viết thành công')
        } else {
            toast.error('Cập nhật chi tiết bác sĩ thất bại!!!');
        }

    }

    handleGetDoctorInfo = async (id) => {
        let response = await getDoctorInfo(id);
        if (!response.errCode) {
            let data = response.data;
            if (data) {
                let selectedPayment = '';
                let selectedPrice = '';
                let selectedProvince = '';
                let selectedSpecialty = '';
                if (this.props.lang === LANGUAGES.VI) {
                    selectedPayment = {
                        label: data.paymentData.valueVi,
                        value: data.paymentData
                    };
                    selectedPrice = {
                        label: new Intl.NumberFormat('en-US').format(data.priceData.valueVi) + ' đ',
                        value: data.priceData
                    };
                    selectedProvince = {
                        label: data.provinceData.valueVi,
                        value: data.provinceData
                    };
                    selectedSpecialty = {
                        label: data.specialtyData.name,
                        value: data.specialtyData
                    };

                } else {
                    selectedPayment = {
                        label: data.paymentData.valueEn,
                        value: data.paymentData
                    };
                    selectedPrice = {
                        label: new Intl.NumberFormat('en-US').format(data.priceData.valueEn) + ' USD',
                        value: data.priceData
                    };
                    selectedProvince = {
                        label: data.provinceData.valueEn,
                        value: data.provinceData
                    };
                    selectedSpecialty = {
                        label: data.specialtyData.name,
                        value: data.specialtyData
                    };
                }
                this.setState({
                    selectedProvince: selectedProvince,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    nameClinic: data.nameClinic,
                    addressClinic: data.addressClinic,
                    note: data.note,
                    selectedSpecialty: selectedSpecialty
                })
            }
        }
    }

    handleGetSpecialties = async () => {
        let response = await getAllSpecialties('ALL');
        if (response.errCode === 0) {
            let data = response.data;
            let customzData = [];
            data.forEach(item => {
                let label = item.name;
                let value = item;
                customzData.push({
                    label: label,
                    value: value,
                })
            })
            await this.setState({
                specialties: customzData,
            })
        }

    }

    render() {
        const { selectedOption, selectedPayment, selectedPrice, selectedProvince, specialties, selectedSpecialty } = this.state;
        return (
            <div className="manage-doctor">
                <h2 className="text-center">
                    <FormattedMessage id={"manage-doctor.manage_doctor"} />
                </h2>
                <div className="choose-doctor">
                    <div className="search-doctor">
                        <label>
                            <FormattedMessage id={"manage-doctor.choose-doctor"} />
                        </label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                        />
                    </div>
                    <div className="description">
                        <label>
                            <FormattedMessage id={"manage-doctor.description"} />
                        </label>
                        <div>
                            <textarea value={this.state.description} rows="4"
                                onChange={(e) => this.handleTextArea(e)}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label id="chooseprice"><FormattedMessage id="manage-doctor.choosePrice" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={(e) => this.handleOnChangeDoctorInfo(e, 'selectedPrice')}
                            options={this.state.prices}
                            placeholder={(this.props.lang === LANGUAGES.VI ? '200,000đ' : '20 USD')}
                        />
                    </div>
                    <div className="col-4">
                        <label id="choosept"><FormattedMessage id="manage-doctor.selectAPaymentMethod" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={(e) => this.handleOnChangeDoctorInfo(e, 'selectedPayment')}
                            options={this.state.payments}
                            placeholder={(this.props.lang === LANGUAGES.EN ? 'Cash' : 'Tiền mặt')}
                        />
                    </div>
                    <div className="col-4">
                        <label id="chooseprovince"><FormattedMessage id="manage-doctor.chooseAProvince" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={(e) => this.handleOnChangeDoctorInfo(e, 'selectedProvince')}
                            options={this.state.provinces}
                            placeholder={(this.props.lang === LANGUAGES.VI ? 'Hà Nội' : 'Ha Noi')}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-4">
                        <label id="clinicName"><FormattedMessage id="manage-doctor.clinicName" /></label>
                        <input value={this.state.nameClinic} id="clinicName" className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'nameClinic')} />
                    </div>
                    <div className="col-4">
                        <label id="clincAddress"><FormattedMessage id="manage-doctor.clinicAddress" /></label>
                        <input value={this.state.addressClinic} id="clincAddress" className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'addressClinic')} />
                    </div>
                    <div className="col-4">
                        <label id="note"><FormattedMessage id="manage-doctor.Note" /></label>
                        <input value={this.state.note} id="note" className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, 'note')} />
                    </div>
                </div>
                <div>
                    <div className='row  mb-5'>
                        <div className='col-4'>
                            <label htmlFor="clinic"><FormattedMessage id="manage-user.clinic" /></label>
                        </div>
                        <div className='col-4'>
                            <label htmlFor="specialty"><FormattedMessage id="manage-user.specialty" /></label>
                            <Select
                                value={selectedSpecialty}
                                onChange={(e) => this.handleCreateSelectOptionFromDB(e, 'selectedSpecialty')}
                                options={specialties}
                                placeholder="Chọn chuyên khoa"
                            />
                        </div>
                    </div>
                </div>
                <MdEditor value={this.state.contentText} style={{ height: '400px', marginTop: '20px' }} renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange} />
                {this.state.isEditting !== 'none' && (
                    this.state.isEditting === false ?
                        <button className="btn btn-info mt-3"
                            onClick={(e) => this.handleOnClick()}
                        >Tạo mới chi tiết</button> :
                        <button className="btn btn-primary mt-3"
                            onClick={(e) => this.handleOnUpdate()}
                        >
                            <FormattedMessage id={"manage-doctor.save"} />
                        </button>
                )
                }
                <button className="btn btn-warning mt-3 ml-2"
                    onClick={() => this.handleOnClear()}
                >
                    <FormattedMessage id={"manage-doctor.clear"} />
                </button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
        doctors: state.admin.allDoctor,
        doctorInfo: {
            provinces: state.admin.allProvince,
            prices: state.admin.allPrice,
            payments: state.admin.allPayment,
        }

    }

}
const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: async () => dispatch(await actions.fetAllDoctors()),
        getDoctorInfor: async () => {
            dispatch(await actions.fetAllPrice());
            dispatch(await actions.fetAllProvince());
            dispatch(await actions.fetAllPayment());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
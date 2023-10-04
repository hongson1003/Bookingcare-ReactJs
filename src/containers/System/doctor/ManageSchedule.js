import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createSchedule } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            doctors: [],
            selectDate: new Date(),
            rangeTimes: [],
        }
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
        await this.props.getAllCodeTime();
        this.setState({
            rangeTimes: this.props.allTime,
        })
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

        }

        if (prevp.allTime !== this.props.allTime) {
            let dataTimes = this.props.allTime.map(item => {
                let obj = { ...item };
                obj.isActive = false;
                return obj;
            });

            this.setState({
                allTime: dataTimes,
            })
        }

    }
    handleChange = async (inputSelect) => {
        let selected = { ...this.state.selectedOption }
        selected.value = inputSelect.value;
        selected.label = inputSelect.label;
        await this.setState({
            selectedOption: selected,
        })
    };
    handleOnChangeDate = async (e) => {
        await this.setState({
            selectDate: e[0],
        })
    }

    handleOnActive = (id) => {
        let data = [...this.state.allTime];
        let objs = data.map(item => {
            if (item.id === id) {
                let temp = { ...item };
                temp.isActive = !item.isActive;
                return temp;
            } else
                return item;
        })
        this.setState({
            allTime: objs
        })

    }
    handleOnSave = async () => {
        let selectDate = moment(this.state.selectDate).format('DD/MM/YYYY');
        let isActives = this.state.allTime.filter(item => item.isActive === true);
        let data = null;
        if (this.state.selectedOption.value) {
            data = {
                id: this.state.selectedOption.value.id,
                selectDate: selectDate,
                times: isActives
            }
        }
        if (!data || !data.id || !data.selectDate || !data.times.length) {
            toast.error('Tạo lịch khám cho bác sĩ thất bại');
            return;
        }
        let editData = data.times.map(item => {
            return {
                doctorId: data.id,
                date: data.selectDate,
                timeType: item.keyMap,
            }
        })

        console.log(editData);
        let response = await createSchedule(editData);
        if (response.errCode)
            toast.error('Tạo lịch khám cho bác sĩ thất bại');
        else {
            toast.success('Tạo lịch khám cho bác sĩ thành công')
        }

    }



    render() {
        const { selectedOption, allTime } = this.state;
        return (
            <div className='container manage-schedule-system'>
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
                            <FormattedMessage id={"manage-schedule.choose-doctor"} />
                        </label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    height: '50px'
                                }),
                            }}
                        />
                    </div>
                    <div className='col-7'>
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

                <div className='row'>
                    {allTime && allTime.length > 0 &&
                        <>
                            <div className='col-12 main-schedule'>
                                {
                                    allTime.map(item => {
                                        return (
                                            <button className={item.isActive ? 'btn-schedule active' : 'btn-schedule'} key={item.id}
                                                onClick={() => this.handleOnActive(item.id)}
                                            >
                                                {this.props.lang === LANGUAGES.VI
                                                    ?
                                                    item.valueVi
                                                    :
                                                    item.valueEn

                                                } </button>
                                        )
                                    })

                                }
                            </div>
                            <div className='col-4'>
                                <button className='btn btn-primary' onClick={() => this.handleOnSave()}>
                                    <FormattedMessage id={"manage-schedule.save"} />
                                </button>
                            </div>
                        </>
                    }

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        doctors: state.admin.allDoctor,
        allTime: state.admin.allTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: async () => dispatch(await actions.fetAllDoctors()),
        getAllCodeTime: async () => dispatch(await actions.fetAllCodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

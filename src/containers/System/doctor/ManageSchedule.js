import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: { label: 'Chọn bác sĩ...' },
            doctors: [],
            selectDate: new Date(),
        }
    }
    componentDidMount = async () => {
        await this.props.getAllDoctors();
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

            }

        }

    }
    handleChange = async (inputSelect) => {
        let selected = { ...this.state.selectedOption }
        selected.value = inputSelect.value;
        selected.label = inputSelect.label;
        this.setState({
            selectedOption: selected,
        })
    };
    handleOnChangeDate = (e) => {
        console.log(e[0]);
    }



    render() {
        const { selectedOption } = this.state;
        return (
            <div className='container manage-schedule'>
                <div className='row pt-4'>
                    <div className='col-12'>
                        <h3 className='text-center'>Quản lý lịch khám bệnh</h3>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-5'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                        />
                    </div>
                    <div className='col-7'>
                        <label>Chọn ngày</label>
                        <DatePicker
                            onChange={this.handleOnChangeDate}
                            className="form-control"
                            value={this.state.selectDate}
                            selected={new Date()}
                        >

                        </DatePicker>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        doctors: state.admin.allDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: async () => dispatch(await actions.fetAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

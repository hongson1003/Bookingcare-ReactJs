import React from "react";
import { connect } from "react-redux";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { insertDetailDr } from '../../../services/userService'
import { toast } from "react-toastify";
import { getDetailDoctor, updateDetailDoctor } from '../../../services/userService';
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

    }
    handleOnClick = async () => {
        let obj = {
            doctorId: this.state.selectedOption.value.id,
            contentHTML: this.state.contentHTML,
            contentText: this.state.contentText,
            description: this.state.description,
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
            description: '',
            contentHTML: '',
            contentText: '',
        })
        this.handleGetDetailDoctor(inputSelect.value.id);
    };

    handleEditorChange = ({ html, text }) => {
        console.log('html: ', html, 'text: ', text)
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
            contentText: ''
        })
    }

    handleGetDetailDoctor = async (id) => {
        let response = await getDetailDoctor(id);
        if (!response.errCode) {
            let data = response.data;
            if (data && data.doctorData) {
                this.setState({
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
        let data = {
            id: this.state.selectedOption.value.id,
            description: this.state.description,
            contentHTML: this.state.contentHTML,
            contentText: this.state.contentText,
        }
        let response = await updateDetailDoctor({ data });
        console.log(response)
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



    render() {
        const { selectedOption } = this.state;
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
                            <textarea value={this.state.description} name="w3review" rows="4"
                                onChange={(e) => this.handleTextArea(e)}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <MdEditor value={this.state.contentText} style={{ height: '400px' }} renderHTML={text => mdParser.render(text)}
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
        doctors: state.admin.allDoctor
    }

}
const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: async () => dispatch(await actions.fetAllDoctors()),
        getDetailDoctor: async (id) => dispatch(await actions)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
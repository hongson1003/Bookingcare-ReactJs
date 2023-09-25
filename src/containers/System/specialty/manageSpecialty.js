import React from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './manageSpecialty.scss';
import { getBase64 } from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it this.state.doctors */);

class manageSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            name: '',
        }
    }
    componentDidMount = () => {

    }
    hanndleInput = async (e, input) => {
        let copyState = { ...this.state };
        copyState[input] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleImage = async (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file) {
            let x64 = await getBase64(file);
            this.setState({
                image: x64,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionText: text
        })
    }

    handleOnClick = async () => {
        console.log(this.state);
        let response = await createNewSpecialty(this.state);
        if (response.errCode === 0) {
            toast.success('Tạo mới chuyên khoa thành công');
            this.clearState();
        } else {
            toast.error('Tạo mới chuyên khoa thất bại !!!');
        }
    }

    clearState = () => {
        this.setState({
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            name: '',
        })
    }
    render() {
        return (
            <div className="manage_specialty container">
                <h2 className="text-center mt-4"><FormattedMessage id="manage-specialty.SPECIALTY MANAGEMENT" /></h2>
                <div className="row">
                    <div className="col-6">
                        <label>
                            <FormattedMessage id="manage-specialty.Choose a specialty" />
                        </label> <br></br>
                        <input value={this.state.name} className="form -control" onChange={(e) => this.hanndleInput(e, 'name')}></input>
                    </div>
                    <div className="col-6">
                        <label><FormattedMessage id="manage-specialty.Specialized photo" /></label> <br></br>
                        {this.state.image ?
                            <input className="input-image" type="file" onChange={(e) => this.handleImage(e)} /> :
                            <input value={''} className="input-image" type="file" onChange={(e) => this.handleImage(e)} />
                        }

                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <MdEditor value={this.state.descriptionText} style={{ height: '400px', marginTop: '20px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-info mt-3"
                            onClick={(e) => this.handleOnClick()}                    >
                            <FormattedMessage id={"manage-doctor.save"} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default manageSpecialty;
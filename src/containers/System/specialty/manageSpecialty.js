import React from "react";
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './manageSpecialty.scss';
import { getBase64 } from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it this.state.doctors */);

class manageSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            contentText: '',
            contentHTML: '',
            subject: ''
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
            contentHTML: html,
            contentText: text
        })
    }

    handleOnClick = () => {
        console.log(this.state);
    }
    render() {
        return (
            <div className="manage_specialty container">
                <h2 className="text-center mt-4">Quản lý chuyên khoa</h2>
                <div className="row">
                    <div className="col-6">
                        <label>
                            Chọn chuyên khoa
                        </label> <br></br>
                        <input className="form -control" onChange={(e) => this.hanndleInput(e, 'subject')}></input>
                    </div>
                    <div className="col-6">
                        <label>Ảnh chuyên khoa</label> <br></br>
                        <input className="input-image" type="file" onChange={(e) => this.handleImage(e)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <MdEditor value={this.state.contentText} style={{ height: '400px', marginTop: '20px' }} renderHTML={text => mdParser.render(text)}
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
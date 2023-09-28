import React from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageSpecialty.scss';
import Lightbox from 'react-image-lightbox';
import { getBase64 } from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import down_scroll from '../../../assets/images/down-scroll.png';
import { getAlSpecialties, updateSpecialty, deleteSpecialty } from "../../../services/userService";


const mdParser = new MarkdownIt(/* Markdown-it this.state.doctors */);

class ManageSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            name: '',
            specialties: [],
            avatar: '',
            isOpen: false,
            isOpenTable: false,
            isEditting: false,
            id: ''
        }
    }
    componentDidMount = async () => {
        await this.handleGetSpecialties();
    }
    handleGetSpecialties = async () => {
        let response = await getAlSpecialties('ALL');
        if (response.errCode === 0) {
            this.setState({
                specialties: response.data,
            })
        }
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
            let avtarLink = URL.createObjectURL(file);
            let x64 = await getBase64(file);
            this.setState({
                image: x64,
                avatar: avtarLink
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
        let response = await createNewSpecialty(this.state);
        if (response.errCode === 0) {
            toast.success('Tạo mới chuyên khoa thành công');
            this.clearState();
        } else {
            toast.error('Tạo mới chuyên khoa thất bại !!!');
        }
        this.handleGetSpecialties();
    }
    handleOnDropDownList = async () => {
        if (this.state.isOpenTable) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        }
        await this.setState({
            isOpenTable: !this.state.isOpenTable,
        });
        if (this.state.isOpenTable) {
            window.scrollTo({ top: 700, left: 0, behavior: 'smooth' });
        }
    }


    clearState = () => {
        this.setState({
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            name: '',
            avatar: '',

        })
    }

    handleEditSpecialty = (item) => {
        this.setState({
            id: item.id,
            descriptionText: item.descriptionText,
            descriptionHTML: item.descriptionHTML,
            name: item.name,
            avatar: item.image,
            isEditting: true,
            image: item.image,
        })
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    handleOnSave = async () => {
        let response = await updateSpecialty({
            id: this.state.id,
            descriptionText: this.state.descriptionText,
            descriptionHTML: this.state.descriptionHTML,
            name: this.state.name,
            image: this.state.image,
        })
        if (response.errCode === 0)
            toast.success('Cập nhật chuyên khoa thành công');
        else
            toast.error('Cập nhật chuyên khoa thất bại !!!');
        this.handleGetSpecialties();
        this.clearState();
        this.setState({
            isEditting: false,
        })

    }

    handleDelete = async (id) => {
        console.log('xóa nè')
        let response = await deleteSpecialty(id);
        if (response.errCode === 0)
            toast.success('Xóa chuyên khoa thành công');
        else
            toast.error('Xóa chuyên khoa thất bại');
        this.handleGetSpecialties();
    }

    render() {
        const { isOpen, specialties } = this.state;
        const images = this.state.avatar;
        return (
            <div className="manage_specialty">
                <div className="container">
                    <h2 className="text-center mt-4"><FormattedMessage id="manage-specialty.SPECIALTY MANAGEMENT" /></h2>
                    <div className="row">
                        <div className="col-6">
                            <label>
                                <FormattedMessage id="manage-specialty.Choose a specialty" />
                            </label> <br></br>
                            <input value={this.state.name} className="form -control" onChange={(e) => this.hanndleInput(e, 'name')}></input>
                        </div>
                        <div className="col-6 group-image">
                            <div className="input-image">
                                <input id="k" hidden className="input-image" type="file" onChange={(e) => this.handleImage(e)} />
                                <label htmlFor="k">
                                    <p><FormattedMessage id="manage-specialty.Specialized photo" /></p>
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                </label>
                            </div>
                            {this.state.avatar && <div className="display-image" style={{ backgroundImage: `url(${this.state.avatar})` }} onClick={() => this.setState({ isOpen: true })}></div>}
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
                            {this.state.isEditting === false ? <button className="btn btn-info mt-3"
                                onClick={(e) => this.handleOnClick()}>
                                <FormattedMessage id={"manage-specialty.create"} />
                            </button> :
                                <button className="btn btn-info mt-3"
                                    onClick={(e) => this.handleOnSave()}>
                                    <FormattedMessage id={"manage-specialty.save"} />
                                </button>
                            }
                        </div>
                    </div>

                    {this.state.isOpenTable === false &&
                        <div className="row">
                            <div className="col-10 bottom-reason">
                                <button className="view-list-user btn btn-secondary"
                                    onClick={this.handleOnDropDownList}
                                ><FormattedMessage id="manage-specialty.View User List" /></button>
                                <div className="down-scroll" onClick={this.handleOnDropDownList}>
                                    <img alt="" src={down_scroll} />
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {this.state.isOpenTable &&
                    <div className="row">
                        <div className="col-12">
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specialties && specialties.length > 0 &&
                                        specialties.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td><img alt="" className="specialty-image" src={item.image} /></td>
                                                    <td>
                                                        <button className="btn btn-warning" onClick={() => this.handleEditSpecialty(item)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => this.handleDelete(item.id)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-info hidden-list" onClick={() => this.handleOnDropDownList()}>Ẩn danh sách</button>
                        </div>
                    </div>
                }




                {isOpen && (
                    <Lightbox
                        mainSrc={images}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>

        )
    }
}
export default ManageSpecialty; 
import React from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageClinics.scss';
import Lightbox from 'react-image-lightbox';
import { getBase64 } from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import down_scroll from '../../../assets/images/down-scroll.png';
import { getAllClinics, updateClinic, deleteClinic, createNewClinic } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it this.state.doctors */);

class ManageClinics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            descriptionTitleHTML: '',
            descriptionTitleText: '![img](đường dẫn tới ảnh ở đây)',
            name: '',
            clinics: [],
            avatar: '',
            address: '',
            isOpen: false,
            isOpenTable: false,
            isEditting: false,
        }
    }
    componentDidMount = async () => {
        await this.handleGetClinics();
    }
    handleGetClinics = async () => {
        let response = await getAllClinics('ALL');
        console.log(response)
        if (response.errCode === 0) {
            this.setState({
                clinics: response.data,
            })
        }
    }
    handleInput = async (e, input) => {
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
        console.log(html, text)
        this.setState({
            descriptionHTML: html,
            descriptionText: text
        })
    }
    handleEditorChangeTitle = ({ html, text }) => {
        this.setState({
            descriptionTitleHTML: html,
            descriptionTitleText: text
        })
    }

    handleOnClick = async () => {
        let response = await createNewClinic(this.state);
        if (response.errCode === 0) {
            toast.success('Tạo mới chuyên khoa thành công');
            this.clearState();
        } else {
            toast.error('Tạo mới chuyên khoa thất bại !!!');
        }
        this.handleGetClinics();
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
            address: '',
            descriptionTitleHTML: '',
            descriptionTitleText: '',
        })
    }

    handleEditClinic = (item) => {
        this.setState({
            id: item.id,
            descriptionText: item.descriptionText,
            descriptionHTML: item.descriptionHTML,
            descriptionTitleHTML: item.descriptionTitleHTML,
            descriptionTitleText: item.descriptionTitleText,
            name: item.name,
            avatar: item.image,
            isEditting: true,
            image: item.image,
            address: item.address,
        })
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    handleOnSave = async () => {
        let response = await updateClinic({
            id: this.state.id,
            descriptionText: this.state.descriptionText,
            descriptionHTML: this.state.descriptionHTML,
            descriptionTitleHTML: this.state.descriptionTitleHTML,
            descriptionTitleText: this.state.descriptionTitleText,
            name: this.state.name,
            image: this.state.image,
            address: this.state.address,
        })
        if (response.errCode === 0)
            toast.success('Cập nhật chuyên khoa thành công');
        else
            toast.error('Cập nhật chuyên khoa thất bại !!!');
        await this.handleGetClinics();
        this.clearState();
        this.setState({
            isEditting: false,
        })

    }

    handleDelete = async (id) => {
        let response = await deleteClinic(id);
        if (response.errCode === 0)
            toast.success('Xóa chuyên khoa thành công');
        else
            toast.error('Xóa chuyên khoa thất bại');
        this.handleGetClinics();
    }

    render() {
        const { isOpen, clinics } = this.state;
        const images = this.state.avatar;
        return (
            <div className="manage_clinic">
                <div className="container">
                    <h2 className="text-center mt-4"><FormattedMessage id="manage-clinic.title" /></h2>
                    <div className="row">
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <label>
                                        <FormattedMessage id="manage-clinic.chooseClinic" />
                                    </label> <br></br>
                                    <input value={this.state.name} className="form -control" onChange={(e) => this.handleInput(e, 'name')}></input>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-12 group-image">
                                    <div className="input-image">
                                        <input id="k" hidden className="input-image" type="file" onChange={(e) => this.handleImage(e)} />
                                        <label htmlFor="k">
                                            <p><FormattedMessage id="manage-clinic.avatarClinic" /></p>
                                            <i className="fa fa-upload" aria-hidden="true"></i>
                                        </label>
                                    </div>
                                    {this.state.avatar && <div className="display-image" style={{ backgroundImage: `url(${this.state.avatar})` }} onClick={() => this.setState({ isOpen: true })}></div>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <label>
                                        <FormattedMessage id="manage-clinic.address" />
                                    </label> <br></br>
                                    <input value={this.state.address} className="form -control" onChange={(e) => this.handleInput(e, 'address')}></input>
                                </div>
                            </div>
                        </div>


                        <div className="col-8">
                            <label><FormattedMessage id="manage-clinic.description-picture" /></label>
                            <MdEditor value={this.state.descriptionTitleText} style={{ height: '200px', marginTop: '5px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeTitle} />
                        </div>



                    </div>
                    <div className="row">
                        <div className="col-12">
                            <MdEditor value={this.state.descriptionText} style={{ height: '250px', marginTop: '20px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            {this.state.isEditting === false ? <button className="btn btn-info mt-3"
                                onClick={(e) => this.handleOnClick()}>
                                <FormattedMessage id={"manage-clinic.create"} />
                            </button> :
                                <button className="btn btn-info mt-3"
                                    onClick={(e) => this.handleOnSave()}>
                                    <FormattedMessage id={"manage-clinic.save"} />
                                </button>
                            }
                        </div>
                    </div>



                    {this.state.isOpenTable === false &&
                        <div className="row">
                            <div className="col-10 bottom-reason">
                                <button className="view-list-user btn btn-secondary"
                                    onClick={this.handleOnDropDownList}
                                ><FormattedMessage id="manage-clinic.View User List" /></button>
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
                                    {clinics && clinics.length > 0 &&
                                        clinics.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td><img alt="" className="clinic-image" src={item.image} /></td>
                                                    <td>
                                                        <button className="btn btn-warning" onClick={() => this.handleEditClinic(item)}>
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
export default ManageClinics; 
import React from "react";
import Header from "../../HeaderHomePage/Header";
import './ClinicDetail.scss';
import { getAllSpecialties } from "../../../../services/userService";
import Schedules from '../Doctor/Schedules';
import ModalDoctorSchedule from '../Doctor/Modal/ModalDoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { getAllDoctorWithSepecialties } from "../../../../services/patientService";
import { connect } from "react-redux";
import * as actions from '../../../../store/actions';
import { getAllClinics } from "../../../../services/patientService";

class ClinicDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            descriptionHTML: '',
            descriptionText: '',
            descriptionTitleHTML: '',
            descriptionTitleText: '',
            image: '',
        }
    }

    componentDidMount = async () => {
        let id = this.props.history.location.pathname.split('/').at(-1);
        let response = await getAllClinics(+id);
        if (response.errCode === 0) {
            let data = response.data[0];
            this.setState({
                name: data.name,
                address: data.address,
                descriptionHTML: data.descriptionHTML,
                descriptionText: data.descriptionText,
                descriptionTitleHTML: data.descriptionTitleHTML,
                descriptionTitleText: data.descriptionTitleText,
                image: data.image
            })
        }
    }


    render() {
        let { descriptionTitleHTML, image } = this.state;
        let imgLink = '';
        let descrip = '';
        if (descriptionTitleHTML) {
            let lineText = descriptionTitleHTML.split('\n');
            imgLink = lineText[0];
            console.log(imgLink)
            for (let i = 1; i < lineText.length; i++)
                descrip += lineText[i];
        }
        return (
            <>
                <Header />
                <div className="clinic-detail">
                    <ModalDoctorSchedule />
                    <div className="main-picture">
                        {(imgLink.indexOf('src=""') === -1 && imgLink.indexOf('src') !== -1) ?
                            <div className="img" dangerouslySetInnerHTML={{ __html: imgLink }} >
                            </div> :
                            <img alt="" style={{ display: 'block', width: '100%', 'objectFit': 'cover' }} className="img" src="https://cdn.bookingcare.vn/fr/w800/2018/03/19/153047bookingcare-images.jpg" />
                        }
                        <div className="logo">
                            <div className="logo-up">
                                <img src={image} />
                                <div>
                                    <p>{this.state.name}</p>
                                    <p>{this.state.address}</p>
                                </div>
                            </div>
                            <div className="menu">
                                <ul>
                                    <li>GIỚI THIỆU</li>
                                    <li>THẾ MẠNG CHUYÊN MÔN</li>
                                    <li>TRANG THIẾT BỊ</li>
                                    <li>VỊ TRÍ</li>
                                    <li>QUY TRÌNH KHÁM</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="content-outstanding">
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: descrip }} className="descrip"></div>
                        <div className="description-general" dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>
                    </div>

                </div>
                <div>

                    {/* <div className="main-top" style={{ backgroundImage: `url(${image})` }}>
                        <div className={show === true ? 'box' : 'box unshow'}>
                            <div className="main-content">
                                <h3>{this.state.name}</h3>
                                <div className="content" dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>
                                <span className="read" onClick={this.handleOnViewMore}>{show === true ? 'Ẩn bớt...' : 'Đọc thêm...'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-detail">
                        {
                            listDoctors && listDoctors.length ?
                                listDoctors.map(item => {
                                    let image = item.image;
                                    let avatarTemp = new Buffer(image, 'base64').toString('binary');
                                    return (
                                        <div className="box" key={item.id}>
                                            <div className="box_item-1">
                                                <img className="avatar" alt="" src={avatarTemp} /> <br />
                                                <span onClick={() => this.handleRedirectDoctorDetail(item.id)}>Xem thêm</span>
                                            </div>
                                            <div className="box_item-2">
                                                <p className="name">{`${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`}</p>
                                                <p>{item.doctorData.description}</p>
                                                <p>
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                    {item.doctorInfo &&
                                                        <span>{item.doctorInfo.provinceData.valueVi}</span>
                                                    }
                                                </p>
                                            </div>
                                            <div className="box_item-3">
                                                <div className="schedules-main">
                                                    <Schedules
                                                        id={item.id}
                                                    />
                                                    <div className="calendar-info">
                                                        <DoctorExtraInfo id={item.id} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )

                                }) :
                                <div>
                                    <h2 className="oops">Hiện tại không có bác sĩ nào thuộc phòng khám này</h2>
                                </div>
                        }

                    </div> */}
                </div >

            </>


        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        modal: state.app.modal,
        dataSchedule: state.app.dataSchedule,
        genders: state.admin.genders,
        isLoading: state.admin.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoading: async () => dispatch({
            type: 'FIRE_FETCH',
        }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);
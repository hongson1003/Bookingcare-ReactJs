import React from "react";
import Header from "../../HeaderHomePage/Header";
import './SpecialtyDetails.scss';
import { getAllSpecialties } from "../../../../services/userService";
import Schedules from '../Doctor/Schedules';
import ModalDoctorSchedule from '../Doctor/Modal/ModalDoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { getAllDoctorWithSepecialties } from "../../../../services/patientService";
import { connect } from "react-redux";
class SpecialtyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            descriptionText: '',
            descriptionHTML: '',
            name: '',
            show: false,

            listDoctors: [],
            doctorId: '',
            idSchedule: '',

        }
    }
    componentDidMount = async () => {
        let id = this.props.location.pathname.split('/').at(-1);
        let response = await getAllSpecialties(+id);
        let arrResponse = await getAllDoctorWithSepecialties(id);
        if (response.errCode === 0) {
            let data = response.data[0];
            this.setState({
                image: data.image,
                descriptionText: data.descriptionText,
                descriptionHTML: data.descriptionHTML,
                name: data.name,
                listDoctors: arrResponse.data,
            })
        }
    }
    handleOnViewMore = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handleRedirectDoctorDetail = (id) => {
        this.props.history.push('/doctors/' + id);
    }

    handleGetId = (doctorId, idSchedule) => {
        this.setState({
            doctorId: doctorId,
            idSchedule: idSchedule,
        })
    }

    render() {
        let { image, descriptionHTML, show, listDoctors } = this.state;
        return (
            <>
                <Header />
                <div className="specialty-detail">
                    <ModalDoctorSchedule />
                    <div className="main-top" style={{ backgroundImage: `url(${image})` }}>
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

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetails);
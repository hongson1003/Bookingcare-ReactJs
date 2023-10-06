import React from "react";
import Header from '../../HeaderHomePage/Header';
import home from '../../../../assets/images/HomePage/home.png'
import { getDetailDoctor } from "../../../../services/userService";
import man from '../../../../assets/images/doctorNOAVATAR_man.avif'
import woman from '../../../../assets/images/doctorNoAVATAR_woman.jpg'
import DoctorSchedule from "./DoctorSchedule";
import './DetailDoctor.scss';
// import { FormattedMessage } from "react-intl";
class DetailDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }
    componentDidMount = async () => {
        let response = await getDetailDoctor(this.props.match.params.id);
        if (!response.errCode) {
            this.setState({
                data: response.data,
            })
        }
    }
    render() {
        let data = this.state.data;
        console.log(data)
        return (
            <React.Fragment>
                <Header />
                <div className="container-detail">
                    <div className="content_detail">
                        <p className="detail__title">
                            <img alt="" src={home}></img>
                            <span>&ensp;/ Khám chuyên khoa&ensp;/ {data.doctorInfo && data.doctorInfo.specialtyData.name}</span>
                        </p>
                        <div className="description-doctor">
                            <div className="image">
                                {data && (
                                    !this.state.data.image ? (
                                        data.gender === 'M' ? (
                                            <img alt="" src={man} />
                                        ) : (
                                            <img alt="" src={woman} />
                                        )
                                    ) : (
                                        <img alt="" src={data.image} />
                                    )
                                )}
                            </div>
                            <div className="main-descrip">
                                <p className="main-title">
                                    {data.positionData && data.positionData.valueVi + ', ' + data.firstName + ' ' + data.lastName}
                                </p>
                                {data.doctorData && data.doctorData.description}
                            </div>
                        </div>
                        <DoctorSchedule id={this.props.match.params.id} />
                    </div>
                    {data.doctorData &&
                        <div className="info-detail">
                            {<div dangerouslySetInnerHTML={{ __html: data.doctorData.contentHTML }} />}
                        </div>
                    }

                </div>
            </React.Fragment>
        )
    }
}
export default DetailDoctor;
import React from "react";
import SearchInput from "../../../../components/SearchPage/SearchInput";
import './SearchPageDoctor.scss';
import left from '../../../../assets/images/left.png';
import unidecode from "unidecode";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { getAllDoctor } from "../../../../services/userService";
class SearchPageDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arr: [],
        }
    }

    componentDidMount = async () => {
        this.handleGetDoctors();
        console.log('hi')
    }
    componentDidUpdate = async () => {
        // this.handleGetSpecialties('ALL');
    }

    handleGetDoctors = async () => {
        let response = await getAllDoctor();
        if (response.errCode === 0) {
            let data = response.data;
            console.log(data);
            this.setState({
                data: data,
                arr: data,
            })
        }
    }
    handlRedirect = () => {
        this.props.history.push('/');
    }

    handleOnChange = (e) => {
        // xử lý regex
        let tempArr = this.state.data.map(item => {
            let name = item.firstName + ' ' + item.lastName;
            console.log(name)
            return unidecode(name.toLowerCase());
        })
        let preArr = [];
        tempArr.forEach((item, index) => {
            if (item.search(unidecode(e.target.value.toLowerCase())) !== -1) {
                preArr.push(this.state.data[index]);
            }
        })
        this.setState({
            arr: preArr
        })
    }
    handleRedirectSpecialty = (id) => {
        console.log(id)
        this.props.history.push('/doctors/' + id);
    }

    render() {
        let { arr } = this.state;
        let name = 'Bác sĩ'
        return (
            <div className="main-doctors">
                <div className='header'>
                    <div className='header-top'>
                        <img alt="" onClick={this.handlRedirect} className='left-arrow' src={left} />
                        <span>{name}</span>
                    </div>
                    <div className='header-down'>
                        <SearchInput
                            name={name}
                            handleOnChange={this.handleOnChange}
                        />
                    </div>


                </div>

                <div className='main-content'>
                    <p className="font-weight-bold">{name} nổi bật</p>
                    {arr && arr.length > 0 &&
                        arr.map(item => (
                            <div className='item' key={item.id}>
                                {
                                    item.image && <img alt="" className='img-doctor' src={new Buffer(item.image, 'base64').toString('binary')} />
                                }
                                <div >
                                    <p className="specialtyName" onClick={() => this.handleRedirectSpecialty(item.id)}>{`${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`}</p>
                                    {item.doctorInfo && <p>{item.doctorInfo.specialtyData.name}</p>}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >
        )
    }
}
export default withRouter(SearchPageDoctor);
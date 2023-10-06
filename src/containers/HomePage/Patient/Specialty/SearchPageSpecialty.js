import React from "react";
import SearchInput from "../../../../components/SearchPage/SearchInput";
import { getAllSpecialties } from '../../../../services/userService';
import './SearchPageSpecialty.scss';
import left from '../../../../assets/images/left.png';
import unidecode from "unidecode";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
class SearchPageSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arr: [],
        }
    }

    componentDidMount = async () => {
        this.handleGetSpecialties('ALL');
    }
    componentDidUpdate = async () => {

    }

    handleGetSpecialties = async (id) => {
        let response = await getAllSpecialties(id);
        if (response.errCode === 0) {
            let data = response.data;
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
            return unidecode(item.name.toLowerCase());
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
        this.props.history.push('/specialty/' + id);
    }

    render() {
        let { arr } = this.state;
        let name = 'Chuyên khoa'
        return (
            <div className="main-specialties">
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
                                <img alt="" className='img-specialty' src={item.image} />
                                <span onClick={() => this.handleRedirectSpecialty(item.id)}>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div >
        )
    }
}
export default withRouter(SearchPageSpecialty);
import React from "react";
import Header from "../../HomePage/HeaderHomePage/Header";
import './DetailSpecialty.scss';

class DetailSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount = async () => {
    }



    render() {
        return (
            <>
                <Header />
                <div className="specialty-detail">
                    <h1>Xin chào detail specialty</h1>
                </div>
            </>


        )
    }
}
export default DetailSpecialty;
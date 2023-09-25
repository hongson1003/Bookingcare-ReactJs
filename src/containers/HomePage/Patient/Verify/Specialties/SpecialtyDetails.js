import React from "react";
import Header from '../../HeaderHomePage/Header';
import './SpecialtyDetails.scss';
class SpecialtyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount = async () => {

    }
    render() {
        return (
            <React.Fragment>
                <Header />
            </React.Fragment>
        )
    }
}
export default SpecialtyDetails;
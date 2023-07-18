import React from "react";
import HeaderHomePage from './HeaderHomePage/HeaderHomePage';
import Speciality from "./Section/Speciality";
class HomePage extends React.Component {
    render() {
        return (
            <div>
                <HeaderHomePage />
                <Speciality />

            </div>
        )
    }
}
export default HomePage;
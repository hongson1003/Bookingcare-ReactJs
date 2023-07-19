import React from "react";
import HeaderHomePage from './HeaderHomePage/HeaderHomePage';
import Speciality from "./Section/Speciality";
import Services from "./Section/Services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
import MedicalFacility from "./Section/MedicalFacility";
import Telemedicine from "./Section/Telemedicine";
class HomePage extends React.Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        return (
            <div>
                <HeaderHomePage />
                <div className="my-carousel">
                    <Services settings={settings} />
                    <Speciality settings={settings} />
                    <Telemedicine settings={settings} />
                    <MedicalFacility settings={settings} />
                </div>
            </div>
        )
    }
}
export default HomePage;
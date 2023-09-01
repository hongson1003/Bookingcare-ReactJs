import React from "react";
import HeaderHomePage from './HeaderHomePage/HeaderHomePage';
import Speciality from "./Section/Speciality";
import Services from "./Section/Services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
import MedicalFacility from "./Section/MedicalFacility";
import Telemedicine from "./Section/Telemedicine";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import Media from "./Section/Media";
import Footer from "./FooterHomePage/Footer";
class HomePage extends React.Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
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
                    <OutstandingDoctor settings={settings} />
                    <HandBook settings={{
                        ...settings,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }} />
                    <Media />
                </div>
                <Footer />
            </div>
        )
    }
}
export default HomePage;
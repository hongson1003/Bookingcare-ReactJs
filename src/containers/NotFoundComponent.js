import React from "react";
import './NotFoundComponent.scss';
import notFound_404 from '../assets/images/404.jpg';
import { history } from '../redux'
class NotFoundComponent extends React.Component {
    handleOnClick = () => {
        history.push('/');
        window.location.reload();
    }
    render() {
        return (
            <div className="not-found">
                <h2>
                    Not Found 404 !
                    &ensp;
                    <i className="fas fa-exclamation-triangle warning"></i>
                </h2>
                <p className="message">
                    Oh! The page you are looking for does not exist. Please check the link again. Thank you.
                </p>
                <button className="gotoHome" onClick={() => this.handleOnClick()}>
                    Go to home
                    &ensp;
                    <i className="fas fa-undo"></i>
                </button>
                <img alt="" className="image" src={notFound_404} />
            </div>
        )
    }
}

export default NotFoundComponent;
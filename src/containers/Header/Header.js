import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
class Header extends Component {
    handleOnChangeLanguage = async (e) => {
        this.props.changeLanguageRedux(e.target.value);
    }



    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className='btn-logout'>
                    <p className='welcome'><FormattedMessage id={"home-header.welcome"} />, {userInfo && userInfo.name} </p>
                    <div className='languages-img'>
                        {this.props.language === LANGUAGES.VI
                            ?
                            <div className="baner-language baner-vi"></div>
                            :
                            <div className="baner-language baner-en"></div>
                        }
                        <select onChange={
                            (e) => this.handleOnChangeLanguage(e)}
                        >
                            <option value={LANGUAGES.VI}>
                                VN
                            </option>
                            {
                                this.props.language === LANGUAGES.EN
                                    ?
                                    <option selected value={LANGUAGES.EN}>EN</option>
                                    :
                                    <option value={LANGUAGES.EN}>EN</option>
                            }
                        </select>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i title='Log out' className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (language) => dispatch(actions.CHANGE_LANGUAGE_APP(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, Menu } from '../../utils';
import { FormattedMessage } from 'react-intl';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: []
        }
    }

    handleOnChangeLanguage = async (e) => {
        this.props.changeLanguageRedux(e.target.value);
    }

    componentDidMount = async () => {
        let roleId = this.props.userInfo.roleId;
        let menuM = null;
        if (roleId === Menu.ADMIN)
            menuM = adminMenu;
        else if (roleId === Menu.DOCTOR)
            menuM = doctorMenu;
        else
            menuM = adminMenu
        await this.setState({
            menu: menuM
        })
    }




    render() {
        const { processLogout, userInfo } = this.props;
        let { menu } = this.state;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menu} />
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
                        <select value={(this.props.language === LANGUAGES.EN) ? LANGUAGES.EN : LANGUAGES.VI} onChange={
                            (e) => this.handleOnChangeLanguage(e)}
                        >
                            <option value={LANGUAGES.VI}>VN</option>

                            <option value={LANGUAGES.EN}>EN</option>

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
        processLogout: async () => {
            await dispatch(actions.processLogout());
        },
        changeLanguageRedux: (language) => dispatch(actions.CHANGE_LANGUAGE_APP(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

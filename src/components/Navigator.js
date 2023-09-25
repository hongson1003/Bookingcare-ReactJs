import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './Navigator.scss';

class MenuGroup extends Component {

    render() {
        const { name, children } = this.props;
        return (
            <li className={(this.props.activeName === name) ? 'menu-group active' : 'menu-group'}
            >
                <div className="menu-group-name">
                    <FormattedMessage id={name} />
                </div>
                <ul className="menu-list list-unstyled">
                    {
                        children
                    }
                </ul>
            </li >
        );
    }
}

class Menu extends Component {
    handleOnClickActiveGroupName = (name) => {
        this.props.handleOnClickActive(name);
    }

    render() {
        const { name, active, link, onClick, hasSubMenu, groupName } = this.props;
        return (
            <li className={"menu" + (hasSubMenu ? " has-sub-menu" : "") + ("") + (active ? " active" : "")}
            >
                {hasSubMenu ? (
                    <Fragment>
                        <span
                            data-toggle="collapse"
                            className={"menu-link collapsed"}
                            onClick={onClick}
                            aria-expanded={"false"}
                        >
                            <FormattedMessage id={name} />
                            <div className="icon-right">
                                <i className={"far fa-angle-right"} />
                            </div>
                        </span>
                    </Fragment>
                ) : (
                    <Link to={link} className="menu-link" onClick={() => {
                        // onLinkClick();
                        this.handleOnClickActiveGroupName(groupName);
                    }}>
                        <FormattedMessage id={name} />
                    </Link>
                )}
            </li>
        );
    }
}

class SubMenu extends Component {

    getItemClass = path => {
        return this.props.location.pathname === path ? "active" : "";
    };

    render() {
        const { name, link, onLinkClick } = this.props;
        return (
            <li className={"sub-menu " + this.getItemClass(link)}>
                <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
                    <FormattedMessage id={name} />
                </Link>
            </li>
        );
    }
}

const MenuGroupWithRouter = withRouter(MenuGroup);
const MenuWithRouter = withRouter(Menu);
const SubMenuWithRouter = withRouter(SubMenu);

const withRouterInnerRef = (WrappedComponent) => {

    class InnerComponentWithRef extends React.Component {
        render() {
            const { forwardRef, ...rest } = this.props;
            return <WrappedComponent {...rest} ref={forwardRef} />;
        }
    }

    const ComponentWithRef = withRouter(InnerComponentWithRef, { withRef: true });

    return React.forwardRef((props, ref) => {
        return <ComponentWithRef {...props} forwardRef={ref} />;
    });
};

class Navigator extends Component {
    state = {
        expandedMenu: {},
        activeName: 'active'
    };
    handleOnClickActive = (name) => {
        this.setState({
            activeName: name,
        })
    }
    componentDidMount = async () => {
        let path = this.props.location.pathname.split('/');
        await this.setState({
            activeName: this.buildActiveFromLink(path[1], path[2])
        })
    }

    buildActiveFromLink = (role, link) => {
        if (role === 'system') {
            switch (link) {
                case 'user-redux':
                case 'manage-doctor':
                case 'manage-schedule':
                    return 'menu.admin.user';
                case 'manage-clinic':
                    return 'menu.admin.clinic'
                case 'manage-speciality':
                    return 'menu.admin.speciality'
                default:
                    return 'menu.admin.user'
            }
        } else if (role === 'doctor') {
            switch (link) {
                case 'doctor':
                case 'manage-schedule':
                    return 'menu.doctor.user';
                default:
                    return 'menu.doctor.user'
            }
        }


    }


    isMenuHasSubMenuActive = (location, subMenus, link) => {
        if (subMenus) {
            if (subMenus.length === 0) {
                return false;
            }

            const currentPath = location.pathname;
            for (let i = 0; i < subMenus.length; i++) {
                const subMenu = subMenus[i];
                if (subMenu.link === currentPath) {
                    return true;
                }
            }
        }

        if (link) {
            return this.props.location.pathname === link;
        }

        return false;
    };

    render() {
        const { menus, location, onLinkClick } = this.props;
        return (
            <Fragment>
                <ul className="navigator-menu list-unstyled">
                    {
                        menus.map((group, groupIndex) => {
                            return (
                                <Fragment key={groupIndex}>
                                    <MenuGroupWithRouter name={group.name}
                                        activeName={this.state.activeName}
                                    >
                                        {group.menus ? (
                                            group.menus.map((menu, menuIndex) => {
                                                const isMenuHasSubMenuActive = this.isMenuHasSubMenuActive(location, menu.subMenus, menu.link);
                                                return (
                                                    <MenuWithRouter
                                                        key={menuIndex}
                                                        active={isMenuHasSubMenuActive}
                                                        name={menu.name}
                                                        link={menu.link}
                                                        hasSubMenu={menu.subMenus}
                                                        onClick={() => this.toggle(groupIndex, menuIndex)}
                                                        handleOnClickActive={this.handleOnClickActive}
                                                        groupName={group.name}
                                                    >
                                                        {menu.subMenus && menu.subMenus.map((subMenu, subMenuIndex) => {
                                                            return (
                                                                <SubMenuWithRouter
                                                                    key={subMenuIndex}
                                                                    name={subMenu.name}
                                                                    link={subMenu.link}
                                                                    onClick={this.closeOtherExpand}
                                                                    onLinkClick={onLinkClick}
                                                                />
                                                            )
                                                        })}
                                                    </MenuWithRouter>
                                                );
                                            })
                                        ) : null}
                                    </MenuGroupWithRouter>
                                </Fragment>
                            );
                        })
                    }
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouterInnerRef(connect(mapStateToProps, mapDispatchToProps)(Navigator));

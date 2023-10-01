import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userRedux.scss';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { getBase64 } from '../../../utils/CommonUtils';
class userReduxManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            genders: [],
            positions: [],
            roles: [],
            isOpen: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            isEditting: false,
            edittingId: '',
            avatar: '',
            image: '',
            clinics: [],
            specialties: [],
            specialty: '',
        }
    }

    async componentDidMount() {
        await this.props.getGendersStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
        let genderTemp = (this.props.genders && this.props.genders.length > 0 && this.props.genders[0].keyMap) || '';
        let positionTemp = (this.props.positions && this.props.positions.length > 0 && this.props.positions[0].keyMap) || '';
        let roleTemp = (this.props.roles && this.props.roles.length > 0 && this.props.roles[0].keyMap) || '';
        await this.setState({
            gender: genderTemp,
            position: positionTemp,
            role: roleTemp,
        })
    }

    componentDidUpdate(prevProps, prevState, next) {

        // luôn luôn phải có điều kiện vì nó update liên tục
        if (this.props.genders !== prevProps.genders)
            this.setState({
                genders: this.props.genders,
            })
        else if (this.props.positions !== prevProps.positions)
            this.setState({
                positions: this.props.positions,
            })
        else if (this.props.roles !== prevProps.roles)
            this.setState({
                roles: this.props.roles,
            })
    }

    handleImage = async (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file) {
            let x64 = await getBase64(file);
            this.setState({
                avatar: x64,
                image: x64,
            })
        }
    }

    hanndleInput = async (e, input) => {
        let copyState = { ...this.state };
        copyState[input] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    clearState = async () => {
        let genderTemp = (this.props.genders && this.props.genders.length > 0 && this.props.genders[0].key) || '';
        let positionTemp = (this.props.positions && this.props.positions.length > 0 && this.props.positions[0].key) || '';
        let roleTemp = (this.props.roles && this.props.roles.length > 0 && this.props.roles[0].key) || '';
        this.setState({
            // image: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            avatar: '',
            gender: genderTemp,
            role: positionTemp,
            position: roleTemp,
        })
    }

    handleOnOnSubmit = async () => {
        let data = this.state;
        let user = {
            id: data.edittingId,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            role: data.role,
            position: data.position,
            image: data.image,
        }
        if (this.state.isEditting) {
            await this.props.updateUser(user);
            await this.setState({
                isEditting: false,
            })
            this.clearState();
        } else {
            let message = await this.props.createNewUser(user);
            if (message === 1)
                this.clearState();
        }
    }
    handleOnDel = async (id) => {
        await this.props.deleteUser(id);
    }

    handleOnEdit = async (item) => {
        let imageBase64 = ''
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64'.toString('binary'));
        }
        await this.setState({
            edittingId: item.id,
            email: item.email,
            password: 'Hardcode',
            firstName: item.firstName,
            lastName: item.lastName,
            phoneNumber: item.phoneNumber,
            address: item.address,
            gender: item.gender,
            position: item.positionId,
            role: item.roleId,
            isEditting: true,
            avatar: imageBase64,
            image: '',
        });

    }

    cancel = () => {
        this.setState({
            isEditting: false,
        })
        this.clearState();
    }


    render() {
        let { genders } = this.state;
        return (
            <div className="className-redux-body">
                {
                    this.props.isLoading &&
                    <div className='loading'>
                        <div className='loading-item'></div>
                    </div>
                }
                <h2 className='title'><FormattedMessage id="manage-user.title" /> <></>{(this.props.userInfo && this.props.userInfo.name)} </h2>
                <p className='add'><FormattedMessage id="manage-user.add" /></p>
                <div className='container'>
                    <div className='col-12'>
                        <form>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="text"><FormattedMessage id="manage-user.email" /></label>
                                    {
                                        this.state.isEditting ?
                                            <input disabled value={this.state.email} type="text" className="form-control" id="email" placeholder="Email edit"
                                            /> :
                                            <input value={this.state.email} type="text" className="form-control" id="email" placeholder="Email"
                                                onChange={(e) => this.hanndleInput(e, 'email')}
                                            />
                                    }
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>

                                    {
                                        this.state.isEditting ?
                                            <input disabled value={this.state.password} type="password" className="form-control" id="password" placeholder="Password"
                                            /> :
                                            <input value={this.state.password} type="password" className="form-control" id="password" placeholder="Password"
                                                onChange={(e) => this.hanndleInput(e, 'password')}
                                            />
                                    }
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="firstName"><FormattedMessage id="manage-user.firstName" /></label>
                                    <input value={this.state.firstName} type="text" className="form-control" id="firstName" placeholder="Nguyễn"
                                        onChange={(e) => this.hanndleInput(e, 'firstName')}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="lastName"><FormattedMessage id="manage-user.lastName" /></label>
                                    <input value={this.state.lastName} type="text" className="form-control" id="lastName" placeholder="Văn A"
                                        onChange={(e) => this.hanndleInput(e, 'lastName')}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="phoneNumber"><FormattedMessage id="manage-user.phone" /></label>
                                    <input value={this.state.phoneNumber} type="phone" className="form-control" id="phoneNumber"
                                        onChange={(e) => this.hanndleInput(e, 'phoneNumber')}
                                    />
                                </div>

                                <div className="form-group col-md-9">
                                    <label htmlFor="address"><FormattedMessage id="manage-user.address" /></label>
                                    <input value={this.state.address} type="address" className="form-control" id="address"
                                        onChange={(e) => this.hanndleInput(e, 'address')}
                                    />
                                </div>

                            </div>

                            <div className='row'>
                                <div className="form-group col-md-3">
                                    <label htmlFor="gender"><FormattedMessage id="manage-user.gender.name" /></label>
                                    <select value={this.state.gender} id="gender" className="form-control"
                                        onChange={(e) => this.hanndleInput(e, 'gender')}
                                    >
                                        {
                                            genders && genders.length > 0 &&
                                            genders.map(item => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>{this.props.language === 'vi' ?
                                                        item.valueVi :
                                                        item.valueEn
                                                    }</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="position"><FormattedMessage id="manage-user.position.name" /></label>
                                    <select value={this.state.position} id="position" className="form-control"
                                        onChange={(e) => this.hanndleInput(e, 'position')}
                                    >
                                        {
                                            this.state.positions && this.state.positions.length > 0 &&
                                            this.state.positions.map(item => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="role"><FormattedMessage id="manage-user.role.name" /></label>
                                    <select value={this.state.role} id="role" className="form-control"
                                        onChange={(e) => this.hanndleInput(e, 'role')}
                                    >
                                        {
                                            this.state.roles && this.state.roles.length > 0 &&
                                            this.state.roles.map(item => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor='preview'><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img'>
                                        <div>
                                            <input type="file" id="image" hidden onChange={(e) => this.handleImage(e)} />
                                            <label htmlFor='image'>
                                                <i className="fas fa-upload mr-3"></i>
                                                <span>Upload</span>
                                            </label>
                                        </div>
                                        <div className='anh-dai-dien'>
                                            {this.state.avatar && <img alt='' className='view-img' src={this.state.avatar}
                                                onClick={() => this.setState({
                                                    isOpen: true,
                                                })}></img>}
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {
                                !this.state.isEditting ?
                                    <button type='button' className="btn btn-primary" onClick={this.handleOnOnSubmit}><FormattedMessage id="manage-user.save" /></button>
                                    :
                                    <button type='button' className="btn btn-warning" onClick={this.handleOnOnSubmit}><FormattedMessage id="manage-user.edit" /></button>

                            }
                            {
                                this.state.isEditting
                                &&
                                <button type='button' className="btn btn-danger ml-2" onClick={this.cancel}><FormattedMessage id="manage-user.cancel" /></button>
                            }
                        </form>
                    </div>


                    <div className='col-12'>
                        <TableManageUser
                            isEditting={this.state.isEditting}
                            handleOnEdit={this.handleOnEdit}
                            handleOnDel={this.handleOnDel} />
                    </div>

                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.avatar}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        isLoading: state.admin.isLoading,
        user: state.admin.user,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {

    return {
        getGendersStart: async () => {
            dispatch({
                type: 'FIRE_FETCH'
            })
            dispatch(await actions.fetchGenderStart());
        },
        getPositionStart: async () => {
            dispatch(await actions.fetchPositionStart());
        },
        getRoleStart: async () => {
            dispatch(await actions.fetchRoleStart());
        },
        createNewUser: async (user) => {
            dispatch({
                type: 'FIRE_FETCH'
            });
            let k = dispatch(await actions.createUserStart(user));
            if (k.type === 'CREATE_USER_FAIL')
                return 0;
            else {
                dispatch(await actions.getAllUserStart());
                return 1;
            }
        },
        deleteUser: async (id) => {
            await dispatch(await actions.delUserStart(id));
        },
        updateUser: async (body) => {
            await dispatch(await actions.updateUserStart(body));
            await dispatch(await actions.getAllUserStart());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(userReduxManage);

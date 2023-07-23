import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userRedux.scss';
import * as actions from '../../../store/actions'
class userReduxManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
        }
    }

    async componentDidMount() {
        // try {
        //     let data = await getAllCode('gender');
        //     this.setState({
        //         genders: data.data,
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
        await this.props.getGendersStart();
        console.log('props', this.props)
    }

    componentDidUpdate(prevProps, prevState, next) {
        // luôn luôn phải có điều kiện vì nó update liên tục
        if (this.props !== prevProps)
            this.setState({
                genders: this.props.genders,
            })
    }


    render() {
        let genders = this.state.genders;
        return (
            <div className="className-redux-body">
                <h2 className='title'><FormattedMessage id="manage-user.title" /></h2>
                <p className='add'><FormattedMessage id="manage-user.add" /></p>
                <div className='container  d-flex justify-content-center'>
                    <div className='col-10'>
                        <form>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="email"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="firstName"><FormattedMessage id="manage-user.firstName" /></label>
                                    <input type="text" className="form-control" id="firstName" placeholder="Nguyễn" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName"><FormattedMessage id="manage-user.lastName" /></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Văn A" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="phoneNumber"><FormattedMessage id="manage-user.phone" /></label>
                                    <input type="phone" className="form-control" id="phoneNumber" />
                                </div>

                                <div className="form-group col-md-9">
                                    <label htmlFor="address"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="address" className="form-control" id="address" />
                                </div>

                            </div>

                            <div className='row'>
                                <div className="form-group col-md-3">
                                    <label htmlFor="gender"><FormattedMessage id="manage-user.gender.name" /></label>
                                    <select id="gender" className="form-control">
                                        {
                                            genders && genders.length > 0 &&
                                            genders.map(item => {
                                                return (
                                                    <option key={item.id}>{this.props.language == 'vi' ?
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
                                    <select id="position" className="form-control">
                                        <option></option>
                                        <option></option>
                                    </select>
                                </div>

                                <div className="form-group col-md-3">
                                    <label htmlFor="role"><FormattedMessage id="manage-user.role.name" /></label>
                                    <select id="role" className="form-control">
                                        <option>R1</option>
                                        <option>R2</option>
                                        <option>R3</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="image"><FormattedMessage id="manage-user.image" /></label>
                                    <input type="text" className="form-control" id="image" />

                                </div>

                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Check me out
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: async () => dispatch(await actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userReduxManage);

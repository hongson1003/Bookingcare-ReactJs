import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUser.scss';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.handleListenEmitter()
    }
    toggle = () => {
        this.props.toggle();
    }
    handleListenEmitter() {
        emitter.on('DELETE_USER', data => {
            console.log(data)
        })
    }
    componentDidUpdate() {
    }

    render() {

        return (
            <>
                {/* <Button color="danger" onClick={() => this.toggle()}>{this.props.buttonLabel}</Button> */}
                <Modal
                    isOpen={this.props.isOpenModal}
                    toggle={() => this.toggle()}
                    className={this.props.className}
                    c="true"
                    size='lg'

                >

                    <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
                    <ModalBody>
                        <form action="/post-crud" method="POST">
                            <div className="row">
                                <div className="form-group col-6">
                                    <label htmlFor="email">Email address</label>
                                    {this.props.data.isEditting
                                        ?
                                        <input value={this.props.data.email} disabled id="email" type="email" className="form-control" name="email" onChange={
                                            (e) => {
                                                this.props.handleOnChangeInput(e, 'email');
                                            }
                                        } />
                                        :
                                        <input value={this.props.data.email} id="email" type="email" className="form-control" name="email" onChange={
                                            (e) => {
                                                this.props.handleOnChangeInput(e, 'email');
                                            }
                                        } />
                                    }

                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="password">Password</label>
                                    {this.props.data.isEditting
                                        ?
                                        <input value={this.props.data.password} type="password" className="form-control" id="password"
                                            name="password" disabled onChange={
                                                (e) => {
                                                    this.props.handleOnChangeInput(e, 'password');
                                                }
                                            } />
                                        :
                                        <input value={this.props.data.password} type="password" className="form-control" id="password"
                                            name="password" onChange={
                                                (e) => {
                                                    this.props.handleOnChangeInput(e, 'password');
                                                }
                                            } />
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <input value={this.props.data.firstName} type="text" className="form-control" id="firstName"
                                        name="firstName" onChange={
                                            (e) => {
                                                this.props.handleOnChangeInput(e, 'firstName');
                                            }
                                        } />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input value={this.props.data.lastName} type="text" className="form-control" id="lastName"
                                        name="lastName" onChange={
                                            (e) => {
                                                this.props.handleOnChangeInput(e, 'lastName');
                                            }
                                        } />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input value={this.props.data.address} id="address" type="address" className="form-control"
                                    name="address" onChange={
                                        (e) => {
                                            this.props.handleOnChangeInput(e, 'address');
                                        }
                                    } />
                            </div>
                        </form>



                    </ModalBody>
                    <ModalFooter>
                        {!this.props.data.isEditting
                            ?
                            <Button className='btn-modal' color="primary" onClick={() => this.props.handleNewUser()}>Ok</Button>
                            :
                            <Button className='btn-modal' color="primary" onClick={() => this.props.edit(this.props.data)}>Save</Button>

                        }
                        <Button className='btn-modal' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

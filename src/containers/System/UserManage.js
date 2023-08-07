import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
import { createNewAUser, editUser, deleteUser } from '../../services/userService';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            isEditting: '',
            id: '',
        }
    }

    existEmail = (email) => {
        for (let prop of this.state.users)
            if (prop.email === email)
                return true;
        return false;
    }
    handleGetAllUser = async () => {
        let data = await getUsers('ALL');
        this.setState({
            users: data.users,
        })
    }
    async componentDidMount() {
        this.handleGetAllUser();
    }

    handleNewUser = async () => {
        let user = await createNewAUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phone: this.state.phone,
        });
        if (this.existEmail(user.email)) {
            alert('Không thể tạo email');
            return;
        }
        if (user.errCode !== 0)
            alert('Không thể tạo user');
        else {
            alert('Đã tạo thành công');
            this.setState({
                isOpenModal: false,
            })
            this.handleGetAllUser();
        }
    }
    handleOnClickAddNewUser = async () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggle = () => {
        this.setState({
            isOpenModal: false,
            isEditting: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            id: '',
        })
    }

    handleOnChangeInput = (event, item) => {
        let obj = this.state;
        obj[item] = event.target.value;
        this.setState({
            ...obj,
        })
    }

    handleOnDelete = async (id) => {
        let response = await deleteUser(id);
        if (response.errCode === 0) {
            this.handleGetAllUser();
        }
        emitter.emit('DELETE_USER', { message: 'Xóa thành công' });
    }
    edit = async (item) => {
        let response = await editUser(item);
        if (response.errCode === 0) {
            alert('Update thành công');
            this.setState({
                isEditting: false,
                isOpenModal: false,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                id: '',
            });
            this.handleGetAllUser();
        } else {
            alert('update thất bại');
        }
    }
    handleEdit = async (item) => {
        this.setState({
            isOpenModal: true,
            email: item.email,
            password: 'hasspass',
            firstName: item.firstName,
            lastName: item.lastName,
            address: item.address,
            isEditting: true,
            id: item.id
        });
    }

    render() {
        let users = this.state.users;

        return (
            <div className='userManage'>
                {/* {this.props.isLoggedIn && <Header />} */}
                <ModalUser
                    isOpenModal={this.state.isOpenModal}
                    toggle={this.toggle}
                    handleOnChangeInput={this.handleOnChangeInput}
                    handleNewUser={this.handleNewUser}
                    data={
                        {
                            email: this.state.email,
                            password: this.state.password,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            address: this.state.address,
                            isEditting: this.state.isEditting,
                            id: this.state.id,
                        }
                    }
                    edit={this.edit}
                />
                <h2 className='text-center mt-2'>Manage Users</h2>
                <button type="button" className="btn btn-primary mx-5 px-3" onClick={
                    () => {
                        this.handleOnClickAddNewUser();
                    }
                }>
                    <i className="fas fa-plus"></i> <></>
                    <span>Add New User</span>
                </button>

                {
                    this.state.users.length > 0 &&
                    <>
                        <table id="customers" className='mt-5 usermanage-table'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => {
                                    return <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='user-edit user-btn'
                                                onClick={
                                                    () => this.handleEdit(item)
                                                }>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='user-delete user-btn' onClick={
                                                () => {
                                                    this.handleOnDelete(item.id);
                                                }
                                            }>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>

                        </table>

                    </>
                }
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

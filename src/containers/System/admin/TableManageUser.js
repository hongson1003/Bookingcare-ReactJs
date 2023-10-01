import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageUser.scss'

class TableManageUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount = () => {
        this.props.getAllUser();
    }
    componentDidUpdate = async (prevProps) => {
        if (prevProps.users !== this.props.users) {
            await this.setState({
                users: this.props.users
            })
        }
    }
    handleOnDelete = async (id) => {
        await this.props.handleOnDel(id);
        this.props.getAllUser();
    }
    handleOnEdit = (item) => {
        this.props.handleOnEdit(item);
    }
    render() {
        return (
            <React.Fragment>
                {this.state.users.length > 0 &&
                    <>
                        <table id="customers" className='mt-5 usermanage-table container-fluid'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Avatar</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((item, index) => {
                                    return <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td >{item.image && <img className='td-image' alt='' src={new Buffer(item.image, 'base64').toString('binary')} />}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='user-edit user-btn btn'>
                                                <i className="fas fa-pencil-alt" onClick={() => this.handleOnEdit(item)}></i>
                                            </button>

                                            <button className='user-delete user-btn btn' >
                                                <i className="fas fa-trash-alt" onClick={() => this.handleOnDelete(item.id)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>

                        </table>

                    </>
                }
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: async () => {
            await dispatch(await actions.getAllUserStart());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);


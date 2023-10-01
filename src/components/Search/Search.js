import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Search.scss';
import { LANGUAGES } from '../../utils';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }

    componentDidMount() {
    }
    componentDidUpdate = (prev) => {
        if (prev.arr !== this.props.arr) {
            this.setState({
                arr: this.props.arr,
            })
        }
    }
    handleOnChange = (e) => {
        this.props.handleOnChange(e);
    }

    render() {
        let { arr } = this.state;
        return (
            <>
                <div className="baner-search">
                    <i className="fas fa-search"></i>
                    <input className="search-input" placeholder={this.props.language === LANGUAGES.VI ? 'Tìm chuyên khoa' : 'Find a Specialist'}
                        onChange={this.handleOnChange}
                    /> :
                    {(this.props.show && this.props.arr.length) &&
                        <div className="list-specialties">
                            <p className="list-title">Chuyên Khoa</p>
                            <div className='content'>
                                {arr && arr.length &&
                                    arr.map(item => (
                                        <div style={{ height: `${this.props.heighLine}` }} key={item.id}>
                                            <img alt='' src={new Buffer(item.image, 'base64').toString('binary')} />
                                            <a href={'/specialty/' + item.id}>{item.name}</a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

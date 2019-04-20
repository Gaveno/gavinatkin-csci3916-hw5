import React, { Component} from 'react';
import { connect } from 'react-redux'
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class Authentication extends Component {

    constructor(props){
        super(props);

        this.state = {
            toggleReg: false
        };
    }

    componentDidMount(){

    }

    showLogin(){
        this.setState({
            toggleReg: false
        });
    }

    showReg(){
        this.setState({
            toggleReg: true
        });
    }

    logout(){
        this.props.dispatch(logoutUser());
    }

    render(){

        const userNotLoggedIn = (
            <div>
                <ListGroup>
                    <ListGroupItem>
                        <Button onClick={this.showLogin.bind(this)} block>
                            <b>Login to an existing user account</b>
                        </Button>
                        <Button onClick={this.showReg.bind(this)} block>
                            <b>Register a new user account</b>
                        </Button>
                    </ListGroupItem>
                <ListGroupItem>
                    { this.state.toggleReg ? <Register /> : <Login /> }
                </ListGroupItem>
                </ListGroup>
            </div>
        );
        const userLoggedIn = (
            <div>Logged in as: {this.props.username} <button onClick={this.logout.bind(this)}>Logout</button></div>
        );

        return (
            <div>
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Authentication)
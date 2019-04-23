import React, { Component } from 'react';
import { submitLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            details:{
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <div style={{'fontSize': '20px'}}>
                        Login to Account
                    </div>
                    <Col componentClass={ControlLabel} sm={3}>
                        Username
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={8}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.password}
                                     type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={0} sm={9}>
                        <Button onClick={this.login}>Sign in</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);
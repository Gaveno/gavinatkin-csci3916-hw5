import React, { Component }  from 'react';
import {Form, FormGroup, FormControl, Row, Col, Button} from 'react-bootstrap';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                moviesFound: []
            }
        }
    }

    updateDetails() {

    }

    render() {
        return (
            <Form>
                <Row className="form-horizontal">
                    <FormGroup controlId="searchbar">
                        <Col xs={9} sm={6}>
                            <FormControl className="search-bar"
                                         onChange={this.updateDetails}
                                         value={this.state.details.moviesFound}
                                         label="Search"
                                         type="text" placeholder="Search here..." />
                        </Col>
                        <Col xs={1}>
                            <Button className="search-button">Search</Button>
                        </Col>
                    </FormGroup>
                </Row>
                <Row className="form-horizontal">
                    <FormGroup controlId="searchresults">

                    </FormGroup>
                </Row>
            </Form>
        );
    }
}
import React, { Component }  from 'react';
import {Form, FormGroup, FormControl, Row, Col, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import {fetchMovies, searchMovies} from "../actions/movieActions";


class Search extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.updateDetails = this.updateDetails.bind(this);

        this.state = {
            details: {
                searchString: ""
            }
        }
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);
        //console.log("details: "+JSON.stringify(this.state.details));
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.movies.length <= 0)
            dispatch(fetchMovies());
    }

    search() {
        const {dispatch} = this.props;
        dispatch(searchMovies(this.props.movies, this.state.details.searchString));
    }

    render() {
        return (
            <Form>
                <Row className="form-horizontal">
                    <FormGroup controlId="searchString">
                        <Col xs={9} sm={6}>
                            <FormControl className="search-bar"
                                         onChange={this.updateDetails}
                                         value={this.state.details.searchString}
                                         label="Search"
                                         type="text" placeholder="Search here..." />
                        </Col>
                        <Col xs={1}>
                            <Button className="search-button" onClick={this.search}>Search</Button>
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

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(Search);
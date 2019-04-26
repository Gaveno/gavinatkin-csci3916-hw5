import React, { Component }  from 'react';
import {Form, FormGroup, FormControl, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {connect} from "react-redux";
import posterNotFound from "./posterNotFound.jpg";
import { Image } from 'react-bootstrap'
import {fetchMovies, searchMovies, setMovie} from "../actions/movieActions";
import {LinkContainer} from "react-router-bootstrap";


class Search extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.handleClick = this.handleClick.bind(this);

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

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    search() {
        const {dispatch} = this.props;
        dispatch(searchMovies(this.props.movies, this.state.details.searchString));
    }

    render() {
        const ActorInfo = ({movie}) => {
            return movie.actors.map((actor, i) =>
                <Row key={"a:"+i}>
                    <i>{actor.actorname}</i> as <i>{actor.charactername}</i>
                </Row>
            );
        };
        const MovieResults = ({results}) => {
            return results.map((movie, i) =>
                <Row key={i} className="search-movies">
                    <Col xs={6}>
                        <LinkContainer to={'/movie/'+movie._id}
                                       onClick={()=>this.handleClick(movie)}>
                            <Image className="search-image"
                                   src={movie.imageURL ? movie.imageURL : posterNotFound} thumbnail />
                        </LinkContainer>
                    </Col>
                    <Col xs={5}>
                        <Row>
                            <b>Title:</b> {movie.title}
                        </Row>
                        <Row>
                            <b>Average Rating:</b> <Glyphicon glyph={'star'} /> {movie.avgRating}
                        </Row>
                        <Row>
                            <b>Staring:</b>
                        </Row>
                        <ActorInfo movie={movie} />
                    </Col>
                </Row>
            );
        };
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
                <Row>
                    <FormGroup controlId="searchresults">
                        <MovieResults results={this.props.searchResults}/>
                    </FormGroup>
                </Row>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies,
        searchResults: state.movie.searchResults
    }
};

export default connect(mapStateToProps)(Search);
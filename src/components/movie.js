import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import posterNotFound from "./posterNotFound.jpg";
import { Col, Form, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

//support routing by creating a new component

class Review extends Component {

    constructor(props) {
        super(props);
        this.submitReview = this.submitReview.bind(this);
        this.updateDetails = this.updateDetails.bind(this);

        this.state = {
            details: {
                rating: 5,
                quote: ""
            }
        }
    }

    submitReview() {

    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);
        console.log("details: "+JSON.stringify(this.state.details));
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    render() {
        return (
            <Form horizontal>
                <h3>Write a Review</h3>
                <FormGroup controlId="rating">
                    <Col componentClass={ControlLabel} sm={2}>
                        Rating
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.rating}
                                     type="number" min="1" max="5" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="quote">
                    <Col componentClass={ControlLabel} sm={2}>
                        Review
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails}
                                     value={this.state.details.quote} type="text"
                                     placeholder="Type review here..." />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.submitReview}>Submit Review</Button>
                </FormGroup>
            </Form>
        )
    }
}

class Movie extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorname}</b> {actor.charactername}
                </p>
            );
        };

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.username ? review.username : review.user_id}</b> {review.quote}
                    <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            );
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image"
                                       src={currentMovie.imageURL ? currentMovie.imageURL : posterNotFound} thumbnail />
                    </Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body>{currentMovie.avgRating}</Panel.Body>
                    <Panel.Body><Review /></Panel.Body>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                </Panel>
            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));
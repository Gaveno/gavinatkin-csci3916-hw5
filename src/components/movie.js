import React, { Component } from 'react';



class Movie extends Component {
    constructor(props) {
        super(props);
        if (this.props.onTitleChange)
            this.props.onTitleChange(null);
    }
    render() {
        return (<div>MOVIE DETAIL</div>);
    }
}

export default Movie;
import React, { Component } from 'react';


class MovieList extends Component {
    state = {selectedOption: "Guardians of the Galaxy Vol. 2"};

    handleOnChange = (e)=> {
        this.setState({
            selectedOption: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="row movietitle">
                    <input type="radio" value="Guardians of the Galaxy Vol. 2"
                           checked={this.state.selectedOption === "Guardians of the Galaxy Vol. 2"}
                           onChange={ (e) => this.handleOnChange(e) } />
                           Guardians of the Galaxy Vol. 2
            </div>
                <div className="row movietitle">
                    <input type="radio" value="La La Land"
                           checked={this.state.selectedOption === "La La Land" }
                           onChange={ (e) => this.handleOnChange(e) } />
                           La La Land
                </div>
            </div>
        );
    }
}

export default MovieList;
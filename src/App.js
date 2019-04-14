import React, { Component } from 'react';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import './App.css';

class App extends Component {
    state = {title: null};

    handleOnTitleChange = (e) => {
        this.setState( {
            title: e
        });
    }

    render() {
        return (
          <div className="App">
            <MovieHeader subtitle={this.state.title}/>
              <MovieList onTitleChange={this.handleOnTitleChange}></MovieList>
          </div>
        );
    }
}

export default App;

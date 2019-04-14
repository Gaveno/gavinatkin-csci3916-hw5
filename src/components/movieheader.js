import React, {Component} from 'react';
import logo from '../logo.svg';

// create movieheader component

class MovieHeader extends Component {
    render(){return <div>
        <header className="App-header">
            <img src={logo} className="App-header" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
    </div>
    }
}

export default MovieHeader;
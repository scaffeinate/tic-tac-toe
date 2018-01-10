import React, { Component } from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
            <div className="wrapper">
                <h1 className="title text-center">Tic Tac Toe</h1>
                <div id="board">
                    <Board />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

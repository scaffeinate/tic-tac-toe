import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            matrix: [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']],
            player: 0,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(row, col) {
        let matrix = this.state.matrix;
        let player = this.state.player;
        matrix[row][col] = (player === 0) ? 'X' : 'O';
        this.setState({ matrix, player: (player === 0) ? 1 : 0 });
    }

    render() {
        return(
            <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                    <table className="table table-bordered table-responsive" style={{'borderRadius' : '3px'}}>
                        <tbody>
                            {
                                this.state.matrix.map((row, index) => (
                                    <Row key={index} row={row} rowIndex={index} onClick={this.onClick} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default Board;

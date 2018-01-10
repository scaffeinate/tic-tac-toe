import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {

    static STATUS_IN_PROGRESS = 0;
    static STATUS_WON_PLAYER_1 = 1;
    static STATUS_WON_PLAYER_2 = 2;
    static STATUS_DRAWN = 3;
    static PLAYER_1_MOVE = 'X';
    static PLAYER_2_MOVE = 'O';
    static VISITED = 'V';
    static VERTICAL = 0;
    static HORIZONTAL = 1;
    static DIAGONAL = 2;
    static REVERSE_DIAGONAL = 3;

    constructor() {
        super();
        this.state = {
            matrix: [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']],
            player: 0,
            status: Board.STATUS_IN_PROGRESS

        };
        this.onClick = this.onClick.bind(this);
        this.placeMove = this.placeMove.bind(this);
        this.checkForDraw = this.checkForDraw.bind(this);
        this.checkForWin = this.checkForWin.bind(this);
        this.dfs = this.dfs.bind(this);
    }

    onClick(row, col) {
        if(this.state.status === Board.STATUS_IN_PROGRESS) {
            let player = this.state.player;
            let move = ((player % 2) == 0) ? Board.PLAYER_1_MOVE : Board.PLAYER_2_MOVE;
            this.placeMove(row, col, move);
        }
    }

    placeMove(row, col, move) {
        let matrix = this.state.matrix;
        let player = this.state.player;
        let status = this.state.status;
        if(row >= 0 && row < matrix.length && col >= 0 && col <= matrix[row].length && matrix[row][col] === ' ') {
            matrix[row][col] = move;
            if(this.checkForWin(row, col)) {
                status = ((player % 2) === 0) ? Board.STATUS_WON_PLAYER_1 : Board.STATUS_WON_PLAYER_2;
            }
            if(this.checkForDraw()) {
                status = Board.STATUS_DRAWN;
            }
            player++;
            this.setState({ matrix, player, status });
        }
    }

    checkForDraw() {
        let matrix = this.state.matrix;
        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j] == ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    checkForWin(row, col) {
        let matrix = this.state.matrix;
        return (this.dfs(row, col, matrix, Board.VERTICAL, matrix[row][col]) == matrix.length ||
            this.dfs(row, col, matrix, Board.HORIZONTAL, matrix[row][col]) == matrix.length ||
            this.dfs(row, col, matrix, Board.DIAGONAL, matrix[row][col]) == matrix.length ||
            this.dfs(row, col, matrix, Board.REVERSE_DIAGONAL, matrix[row][col]) == matrix.length)
    }

    dfs(row, col, matrix, dir, move) {
        if(row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length || matrix[row][col] !== move) {
            return 0;
        }

        let temp = matrix[row][col], numCells = 1;
        matrix[row][col] = Board.VISITED;

        switch (dir) {
            case Board.VERTICAL:
                numCells += this.dfs(row-1, col, matrix, dir, move) + this.dfs(row+1, col, matrix, dir, move);
                break;
            case Board.HORIZONTAL:
                numCells += this.dfs(row, col-1, matrix, dir, move) + this.dfs(row, col+1, matrix, dir, move);
                break;
            case Board.DIAGONAL:
                numCells += this.dfs(row-1, col-1, matrix, dir, move) + this.dfs(row+1, col+1, matrix, dir, move);
                break;
            case Board.REVERSE_DIAGONAL:
                numCells += this.dfs(row-1, col+1, matrix, dir, move) + this.dfs(row+1, col-1, matrix, dir, move);
                break;
        }

        matrix[row][col] = temp;
        console.log(numCells);
        return numCells;
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
                    {this.state.status}
                </div>
            </div>
        );
    }
};

export default Board;

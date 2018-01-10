import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    row: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

class Row extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(col) {
        this.props.onClick(this.props.rowIndex, col);
    }

    render() {
        return (
            <tr className="text-center">
                {
                    this.props.row.map((cell, index) => (
                        <td key={index} className="col-md-2" onClick={() => this.onClick(index)}>{cell}</td>
                    ))
                }
          </tr>
        );
    }
};

Row.propTypes = propTypes;
export default Row;

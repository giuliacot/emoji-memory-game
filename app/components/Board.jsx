import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import Card from './Card';
import Timer from './Timer';
import throttle from 'lodash.throttle'

function createArray(length) {
  return new Array(length * 1).fill(undefined);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.rows = createArray(this.props.rows)
    this.columns = createArray(this.props.columns);
    this.onClick = throttle(this.props.onClick.bind(this), 200)
  }
  
  componentDidMount() {
    this.props.setBoard({rows: this.props.rows, columns: this.props.columns})
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="grid">
          <Timer start={Date.now()}></Timer>
          {createArray(this.props.rows).map((row, i) => 
            (
              <div className="row" key={i}>
                {createArray(this.props.columns).map((column, j) => (
                  <div className={`square-${i}-${j}`} key={`${i}-${j}`} data-position={`${i}-${j}`} onClick={this.onClick}>
                    <Card card={this.props.cards.pop()} key={`${i}-${j}`}/>
                  </div>                  
                ))}
             </div> 
          ))}
        </div>
      </React.Fragment> 
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      rows: state.board.rows,
      columns: state.board.columns,
      cards: state.board.cards
    }
  );
};

const mapDispatchToProps = function(dispatch) {
  return {
    setBoard: function({rows, columns}) {
      dispatch(actions.setBoard({rows, columns}));
    },
    onClick: function(e) {
      dispatch(actions.viewCard(e.target));
    }
  }
}

const ConnectedBoard = connect(mapStateToProps, mapDispatchToProps)(Board);

export default ConnectedBoard;
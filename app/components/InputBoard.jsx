import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

// TODO InputBoard per difficult - EASY 4x4 - MEDIUM 6*7 - HIGH - 8*8
// TODO ResetBoard when the grid change
// TODO When there is a match adds written thats a MATCH like tinder style
// Play again button

const InputBoard = (props) => {
  const {rowsMin = 4, rowsMax = 8, columnsMin = 4, columnsMax = 8, onChange, onClick} = props;
  return (
    <React.Fragment>
      <div className='block'>
      
        <h1>Memory game</h1>
        <div className='setting'>
          <p>Rows</p>
          <input id='numberRows' defaultValue={props.rows} type="number" min={rowsMin} max={rowsMax} step='2' onChange={onChange}/>
        </div>
        <div className='setting'>
          <p>Columns</p>
          <input id='numberColumns' defaultValue={props.columns} type="number" min={columnsMin} max={columnsMax} step='2' onChange={onChange}/>
        </div>

        <button class="resetBtn" onClick={onClick} >Start Again</button>
      </div>
      
    </React.Fragment>
    
  )
}

const mapDispatchToProps = function(dispatch) {
  return {
    onClick: function(e) {
      dispatch(actions.setBoard({rows: undefined, columns: undefined}));
    },
    onChange: function(e) {
      if(e.target.id === 'numberRows') {
        let result = dispatch(actions.setBoard({rows: e.target.value * 1}))
        /*dispatch(actions.setDeck({rows: e.target.value * 1}));*/
      } else if(e.target.id === 'numberColumns'){
        let result = dispatch(actions.setBoard({columns: e.target.value * 1}))
        /*dispatch(actions.setDeck({columns: e.target.value * 1}));*/
      }
    }
  }
}

const mapStateToProps = function(state) {
  return {
    rows: state.board.rows,
    columns: state.board.columns
  }
}

const ConnectedInputBoard = connect(mapStateToProps, mapDispatchToProps)(InputBoard);


export default ConnectedInputBoard;
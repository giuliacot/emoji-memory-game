import React from 'react';

const Card = (props) => {
  return (
    <div className='imageBox'>
      <span className='emoji'>{props.card}</span>
    </div>
  )
}

export default Card;


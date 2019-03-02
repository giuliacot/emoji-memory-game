
import React from 'react';
import ConnectedBoard from './Board';
import InputBoard from './InputBoard';
import Match from './Match';
import '../style/app.css';

/* the main page for the index route of this app 
<img src="https://cdn.glitch.com/2b3c0e9f-190f-4437-8f18-7d0aa82377dc%2Fmarch.png?1546016646607" />
*/
const HelloWorld = function() {
  return (
    <div>
      <div className="layout">
        <InputBoard />
        <ConnectedBoard></ConnectedBoard> 
      </div>
      <Match></Match>   
    </div>
    
  );
};

export {HelloWorld};
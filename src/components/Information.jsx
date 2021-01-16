import React, { useState, useEffect } from 'react';


function information(props) {
  return (
    <div className={`picture picture-of-${props.pokemon}`}>
      <div className={`pokemon ${props.pokemon}`}></div>
      <h3 className="pokemon-name">{props.pokemon}</h3>
    </div>
  );
}

export default information;
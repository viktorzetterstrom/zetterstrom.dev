import React from 'react';

export default ({ id, name }) => (
  <img src={`/img/${id.toLowerCase()}-30.png`} alt={`${name} logo`} />
);

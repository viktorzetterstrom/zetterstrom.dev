import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 140px;
  margin: 100px auto;
`;

const SpinnerPart = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 20px solid rgba(0, 0, 0, 0);
  border-top: 20px solid ${props => props.theme.primary};
  border-radius: 50%;
  animation: ${rotate} ${props => props.theme.speed} linear infinite;
`;

export default ({ theme }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(delay);
  });

  return show ? (
    <SpinnerContainer>
      <SpinnerPart theme={{ ...theme, speed: '1s' }} />
      <SpinnerPart theme={{ ...theme, speed: '1.5s' }} />
      <SpinnerPart theme={{ ...theme, speed: '3s' }} />
    </SpinnerContainer>
  ) : (
    <></>
  );
};

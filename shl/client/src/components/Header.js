import React from 'react';
import styled from 'styled-components';
import { NavLink, Route } from 'react-router-dom';

const HeaderLink = styled(NavLink)`
  color: ${props => props.secondary};
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
  :active {
    transform: scale(0.95);
  }
  :visited {
    color: ${props => props.secondary};
  }
`;

const HeaderWrapper = styled.div`
  color: ${props => props.secondary};
  background-color: ${props => props.primary};
  font-weight: 500;
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
`;

const StyledH1 = styled.h1`
  font-size: 40px;
  margin: 0;
`;

const StyledH2 = styled.h2`
  font-size: 24px;
  margin: 0;
`;

export default function Headers({ theme }) {
  return (
    <>
      <HeaderWrapper {...theme}>
        <StyledH1>SHL 19/20</StyledH1>
      </HeaderWrapper>
      <HeaderWrapper {...theme}>
        <HeaderLink {...theme} to="/standings">
          <StyledH2>Standings</StyledH2>
        </HeaderLink>
        <HeaderLink {...theme} to="/games">
          <StyledH2>Games</StyledH2>
        </HeaderLink>
        <HeaderLink {...theme} to="/statistics">
          <StyledH2>Stats</StyledH2>
        </HeaderLink>
      </HeaderWrapper>
      <Route path="/statistics">
        <HeaderWrapper {...theme}>
          <HeaderLink {...theme} to="/statistics/goalies">
            <StyledH2>Goalies</StyledH2>
          </HeaderLink>
          <HeaderLink {...theme} to="/statistics/skaters">
            <StyledH2>Skaters</StyledH2>
          </HeaderLink>
          <HeaderLink {...theme} to="/statistics/winstreaks">
            <StyledH2>Winstreaks</StyledH2>
          </HeaderLink>
        </HeaderWrapper>
      </Route>
    </>
  );
}

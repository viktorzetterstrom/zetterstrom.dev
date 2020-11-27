import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  margin-left: 0;
  margin-right: 0;
  left: 0;
  right: 0;
  color: rgba(0, 0, 0, 0.25);
  font-size: 10px;
  font-weight: 500;
  padding: 5px 0;
  a {
    color: rgba(0, 0, 0, 0.25);
  }
`;

const Footer = ({ theme }) => (
  <FooterWrapper {...theme}>
    Data provided by the{" "}
    <a href="http://doc.openapi.shl.se/" rel="noreferrer" target="_blank">
      open SHL api.
    </a>
    | Made by{" "}
    <a href="https://zetterstrom.dev" rel="noreferrer" target="_blank">
      zetterstrom.dev
    </a>
  </FooterWrapper>
);

export default Footer;

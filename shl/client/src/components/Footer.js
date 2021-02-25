import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  margin-left: 0;
  margin-right: 0;
  left: 0;
  right: 0;
  font-size: 10px;
  font-weight: 500;
  padding: 5px 0;
`;

const Footer = () => (
  <FooterWrapper>
    <a href="http://doc.openapi.shl.se/" rel="noreferrer" target="_blank">
      Open SHL api
    </a>
    {" | "}
    <a href="https://zetterstrom.dev" rel="noreferrer" target="_blank">
      zetterstrom.dev
    </a>
  </FooterWrapper>
);

export default Footer;

// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: rgb(30, 30, 30);
    --text-color: rgb(185, 185, 185);
    --icon-color: rgb(160, 98, 0);
  }

  body {
    background-color: rgb(35, 35, 35);;
  }

  h1,
  h2,
  p,
  a,
  td,
  th,
  ul {
    font-family: monospace;
    color: var(--text-color);
    font-weight: 300;
  }

  h1 {
    font-size: 24px;
  }

  h2,
  h3 {
    font-size: 16px;
  }
`;

export default GlobalStyle;

import styled from 'styled-components';

export default styled.table`
  color: ${props => props.primary};
  background-color: ${props => props.secondary};
  margin: 20px auto 30px;
  width: 95%;
  min-width: 320px;
  max-width: 600px;
`;

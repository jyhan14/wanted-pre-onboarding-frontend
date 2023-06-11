import React from "react";
import styled from "styled-components";

const Wrapper = (props) => {
  return <StContainer {...props}>{props.children}</StContainer>;
};

export default Wrapper;

const StContainer = styled.div`
  padding: ${({ pd }) => pd};
  margin: ${({ mg }) => mg};
  text-align: ${({textAlign}) => textAlign};
  display: flex;
  gap:10px;
`;

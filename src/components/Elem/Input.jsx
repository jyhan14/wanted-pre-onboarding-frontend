import styled from "styled-components";

const Input = (props) => {
  return <StInput {...props} required={true} minLenth={3} />;
};

export default Input;

const StInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
`;

import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { Wrapper, Text, Input, Button } from "../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signup = async (newUser) => {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
      newUser
    );
    return res;
  };

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const regEmail = /@.*/;
  const regPassword = /^.{8,}$/;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("@를 포함 해주세요")
        : setEmailInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPasswordInput("비밀번호는 8자 이상입니다.")
        : setPasswordInput("");

    setUser({
      ...user,
      [name]: value,
    });

    setIsButtonDisabled(
      !regEmail.test(user.email) || value.length < 8
    );
    
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await signup(user); // 회원가입 요청
      alert("회원가입이 완료되었습니다.");
      setUser({ email: "", password: "" }); // 입력값 초기화
      navigate("/signin");
    } catch (err) {
      console.error("회원가입 실패: ", err);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <StContainer>
        <StHeader>Sign Up</StHeader>
        <StForm onSubmit={onSubmitHandler}>
          <StInputs>
            <Wrapper mg='10px 0'>
              <Text size='16'>email</Text>
            </Wrapper>
            <Input
              type='text'
              onChange={onChangeHandler}
              name='email'
              data-testid='email-input'
              value={user.email}
            />
            <Wrapper mg='10px 0'>
              <Text size='16' color='red'>
                {emailInput}
              </Text>
            </Wrapper>

            <Wrapper mg='10px 0'>
              <Text size='16'>password</Text>
            </Wrapper>
            <Input
              type='password'
              onChange={onChangeHandler}
              name='password'
              data-testid='password-input'
              value={user.password}
            />
            <Wrapper mg='10px 0'>
              <Text size='16' color='red'>
                {passwordInput}
              </Text>
            </Wrapper>
          </StInputs>
          <Button data-testid='signup-button' disabled={isButtonDisabled}>
            회원가입
          </Button>
        </StForm>
      </StContainer>
    </>
  );
};

export default Signup;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
  position: relative;
  overflow: hidden;
  border: none;

  margin: 20px;
  padding: 0;
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  color: white;

  width: 100%;
  height: 30px;
  background: #084bac;
  border-radius: 16px 16px 0px 0px;
`;

const StForm = styled.form`
  width: 80%;
  height: 100%;
  min-height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;

  flex-direction: column;
`;

const StInputs = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  flex-direction: column;
`;

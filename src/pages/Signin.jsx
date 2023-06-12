import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { Wrapper, Text, Input, Button } from "../components";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signin = async (user) => {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signin`,
      user
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

  const accessToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(user); // 로그인 요청
      accessToken(response.data.access_token);
      alert("로그인 성공!");
      setUser({ email: "", password: "" }); // 입력값 초기화
      window.location.reload();
      navigate('/todo');
    } catch (err) {
      console.error("로그인 실패: ", err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const navToSignup = () => {
    navigate('/signup')
  }

  return (
    <>
      <StContainer>
        <StHeader>Sign In</StHeader>
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
          <Button data-testid='signin-button' disabled={isButtonDisabled}>
            로그인
          </Button>
          <StBox>회원이 아니세요? <NavButton onClick={navToSignup}>회원가입</NavButton></StBox>
        </StForm>
      </StContainer>
    </>
  );
};

export default Signin;

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

const StBox = styled.div`
  margin-top: 20px;
  font-size: 16px;
`

const NavButton = styled.button`
  border : none;
  background: none;
  font-size: 16px;
  color: blue;
  cursor: pointer;
`
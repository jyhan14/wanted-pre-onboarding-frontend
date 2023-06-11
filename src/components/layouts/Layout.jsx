import React from "react";
import styled from "styled-components";

function Layout(props) {
  return (
    <>
      <Container>
        <Header>
          <div>원티드 프리온보딩 프론트엔드</div>
          <div>TodoList</div>
        </Header>
        <Content>{props.children}</Content>
      </Container>
    </>
  );
}

export default Layout;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
`;

const Header = styled.div`
  align-items: center;
  border: 1px solid #ddd;

  display: flex;
  justify-content: space-between;

  height: 50px;
  padding: 0 20px;
`;

const Content = styled.div`
  display:flex;
  justify-content: center;
`
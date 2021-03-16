import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: none;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: -10rem;
`;

export const LoginButton = styled.a`
  background: #1db954;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f9fffe;
  border-radius: 5rem;
  padding: 10px 32px;
  text-decoration: none;
  border: 0px;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #1aa34a;
  }
`;

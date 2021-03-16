import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

export const TitleTextContainer = styled.div`
  display: flex;
`;

export const TitleText = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  /* color: white; */
`;

export const TracksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style: none;
  border-radius: 20px;
  padding-left: 0rem;
`;

export const TrackLi = styled.li`
  display: flex;
  list-style: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    font-size: 101%;
  }
`;

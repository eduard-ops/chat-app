import styled from "styled-components";

import { shade } from "polished";

export const UserContainer = styled.div`
  background-color: bisque;
  width: 15%;
  height: 61%;
  background: #fff;
  border: solid ${shade(0.2, "#0088cc")} 5px;
  border-radius: 9px;
`;

export const NavTitle = styled.p`
  font-weight: 600;
  padding-left: 20px;
  padding-top: 20px;
  margin-bottom: 30px;
`;

export const UsersList = styled.ul`
  padding-left: 20px;
  list-style: none;

  li {
    background-color: #beadad;
    width: 150px;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 16px;
  }
`;

import { UserContainer, NavTitle, UsersList } from "./UserBar.styles";

// import { useState } from "react";

// import { ListProps } from "../../types/types";

const UserBar = () => {
  return (
    <UserContainer>
      <NavTitle>Online ({[].length}) :</NavTitle>
      <UsersList>
        <li>Антон</li>
      </UsersList>
    </UserContainer>
  );
};

export default UserBar;

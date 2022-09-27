import { UserContainer, NavTitle, UsersList } from "./UserBar.styles";

// import { useState } from "react";

import { UsersProps } from "../../types/types";

const UserBar = ({ users }: UsersProps) => {
  return (
    <UserContainer>
      <NavTitle>Online ({users.length}) :</NavTitle>
      <UsersList>
        {users.map((item) => (
          <li>{item.name}</li>
        ))}
      </UsersList>
    </UserContainer>
  );
};

export default UserBar;

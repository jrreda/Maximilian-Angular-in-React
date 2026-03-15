import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { DUMMY_USERS, type UserProps } from "./components/user/dummy-users";
import User from "./components/user/User";

function App() {
  const [selectedUser, setSelectedUser] = useState<UserProps | undefined>(
    undefined,
  );

  const handleUserSelect = (user: UserProps) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Header />

      <menu className="users" role="listbox">
        {DUMMY_USERS.map((user) => (
          <User
            key={user.id}
            image={user.avatar}
            name={user.name}
            isSelected={selectedUser?.id === user.id}
            onSelect={() => handleUserSelect(user)}
          />
        ))}
      </menu>
    </>
  );
}

export default App;

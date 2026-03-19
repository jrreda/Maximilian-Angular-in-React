import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { DUMMY_USERS, type UserProps } from "./components/user/dummy-users";
import User from "./components/user/User";
import Tasks from "./components/tasks/Tasks";

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

      <main>
        <ul id="users" role="listbox">
          {DUMMY_USERS.map((user) => (
            <li key={user.id} aria-selected={selectedUser?.id === user.id} role="option">
              <User
                image={user.avatar}
                name={user.name}
                isSelected={selectedUser?.id === user.id}
                onSelect={() => handleUserSelect(user)}
              />
            </li>
          ))}
        </ul>

        <Tasks selectedUser={selectedUser} />
      </main>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://protected-lowlands-84085.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //   DELETE AN USER
  const handleDeleteUser = (id, name) => {
    const proceed = window.confirm(`Are you sure you want to delete ${name} ?`);
    if (proceed) {
      const url = `https://protected-lowlands-84085.herokuapp.com/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h2>Users available {users.length}</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} :: {user.email}
            <Link to={`/users/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDeleteUser(user._id, user.name)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

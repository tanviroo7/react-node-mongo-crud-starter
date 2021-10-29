import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const url = `https://protected-lowlands-84085.herokuapp.com/users/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const UpdatedUser = { name: updatedName, email: user.email };
    setUser(UpdatedUser);
  };
  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    const UpdatedUser = { ...user };
    UpdatedUser.email = updatedEmail;
    setUser(UpdatedUser);
  };
  const handleUpdateUser = (e) => {
    const url = `https://protected-lowlands-84085.herokuapp.com/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Update Successful");
          setUser({});
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>
        Update: {user.name} :: {user.email}
      </h2>
      <p>
        ID: <small>{id}</small>
      </p>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          onChange={handleNameChange}
          value={user.name || ""}
        />
        <input
          type="email"
          onChange={handleEmailChange}
          value={user.email || ""}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;

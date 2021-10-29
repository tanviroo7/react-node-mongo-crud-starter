import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name, email };

    fetch("https://protected-lowlands-84085.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("User Added Succesfully!");
          e.target.reset();
        }
      });

    e.preventDefault();
  };
  return (
    <div>
      <h2>Please Add an User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} />
        <input type="email" ref={emailRef} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddUser;

import React, { useContext, useState } from "react";

import { Form, InputGroup } from "react-bootstrap";
import ErrorMessage from "../common/ErrorMessage";

import { HiOutlineMailOpen } from "react-icons/hi";
import { AuthContext } from "./AuthContext";

function CreateSuperuser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({})

  const { newSuperUser } = useContext(AuthContext);

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function updateErrors(newErrors) {
    setErrors(newErrors)
  }

  function handleSubmit(e) {
    e.preventDefault();
    newSuperUser(user, updateErrors) 
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="p-4 bg-white/50 shadow-lg rounded-lg ">
        <h2 className="font-bold text-2xl px-4 text-lime-700">
          Create new admin
        </h2>
        <Form
          onSubmit={handleSubmit}
          data-bs-theme=""
          className="my-4 flex flex-col gap-2"
        >
          <InputGroup>
            <InputGroup.Text className="font-weight-bold px-8">
              @
            </InputGroup.Text>
            <Form.Control
              name="name"
              value={user.name}
              onChange={handleChange}
              className="py-4"
              type="text"
              placeholder="Enter Name"
            />
          </InputGroup>
          {errors.name && <ErrorMessage message={errors.name} />}

          <InputGroup>
            <InputGroup.Text className="font-weight-bold px-8">
              @
            </InputGroup.Text>
            <Form.Control
              name="username"
              value={user.username}
              onChange={handleChange}
              className="py-4"
              type="text"
              placeholder="Enter username"
            />
          </InputGroup>
          {errors.username && <ErrorMessage message={errors.username} />}

          <InputGroup>
            <InputGroup.Text className="font-weight-bold px-8">
              <HiOutlineMailOpen />
            </InputGroup.Text>
            <Form.Control
              name="email"
              value={user.email}
              onChange={handleChange}
              className="py-4"
              type="text"
              placeholder="Enter email address"
            />
          </InputGroup>
          {errors.email && <ErrorMessage message={errors.email} />}

          <button
            className="bg-lime-700 text-white font-bold hover:bg-lime-600 mt-4 p-2 mx-auto block w-full rounded"
            variant=""
            type="submit"
          >
            Create
          </button>
        </Form>
      </div>
    </div>
  );
}

export default CreateSuperuser;

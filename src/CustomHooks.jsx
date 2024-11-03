import React from "react";
import useForm from "./utils/hooks/useForm";

export default function FormComponent() {
  const [formValues, handleInputChange] = useForm({
    username: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

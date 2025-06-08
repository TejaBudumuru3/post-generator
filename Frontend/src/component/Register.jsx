import React from 'react';

const Register = ({ onClose }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const registerEvent = (e) => {
    e.preventDefault(); // prevent form refresh
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
  };

  return (
    <div className='auth-section'>
      <div className="form-wrapper">
        <button className='close-btn' onClick={onClose}>X</button>
        <form className='sign-form' onSubmit={registerEvent}>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="example@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm your password" required onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

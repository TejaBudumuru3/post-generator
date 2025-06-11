import React from 'react';
import Message from './Message';
import Login from './Login';


const Register = ({ onClose }) => {

  const URL = "http://localhost:3000/user/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fname,setFname] = React.useState("");
  const [lname,setLname] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const registerEvent = async(e) => {
    e.preventDefault(); 
    setLoading(true);
    if(password === confirmPassword){
      try {
        const response  =await fetch(`${URL}signup`, {
          method:"POST",
          body:JSON.stringify({
            email : email,
            password: password,
            name: name,
            fname: fname,
            lname:lname
          }),
          headers:{
            "content-type":"application/json"
          }
        })

        const data = await response.json();
        if(response.ok){
          console.log(data);
          console.log("res: ",response)
          setTimeout(() => {
            onClose(); 
            setShowLogin(true);
          }, 3000);
          
        }
        else {
          console.error("Registration failed:", data.message);
          alert(data.message || "Registration failed. Please try again.");
          setLoading(false);
          onClose();
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
        onClose();
      }

    }
    else{
      alert("Passwords do not match");
    }
  };

  return (
    <>
      {loading ? (<Message />) : (
        <div className='auth-section'>
          <div className="form-wrapper">
            <button className='close-btn' onClick={onClose}>X</button>
            <form className='sign-form' onSubmit={registerEvent}>
              <h2>Sign Up</h2>
              <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="example@gmail.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="Enter your First name" value={fname} required onChange={(e) => setFname(e.target.value)} />
              <input type="text" placeholder="Enter your Last name" value={lname} required onChange={(e) => setLname(e.target.value)} />
              <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm your password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Register;

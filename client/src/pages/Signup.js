import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useLocation } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  const [Phone, setPhone] = useState("");
  const [NID, setNID] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, Phone, NID, email, password, checkpassword);
  };

  return (
    <div className="container1">
      {/* <Navigate to="/Accountverification" /> */}
      <div className="cover1">
        <form onSubmit={handleSubmit}>
          <h1>Create account</h1>

          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <input
            type="number"
            placeholder="Enter NID"
            onChange={(e) => setNID(e.target.value)}
            value={NID}
          />
          <input
            type="number"
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={Phone}
          />

          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <input
            type="password"
            placeholder="Check Password"
            onChange={(e) => setCheckPassword(e.target.value)}
            value={checkpassword}
          />

          <button disabled={isLoading}>Sign up</button>

          <span>
            Already have an account?&nbsp;
            <Link to="/login" disabled={isLoading}>
              Login here
            </Link>
          </span>

          {error && <div className="error">{error}</div>}
        </form>
        <div className="pic">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?size=338&ext=jpg&uid=R95233801&ga=GA1.1.1100157101.1672301754&semt=ais
"
            alt="fieldWithGrains"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="container2">
      <div className="cover2">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <span className="error-message">{error}</span>}
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button disabled={isLoading}>Log in</button>

          {/* <Link className="link1" to="/Forget" tabIndex={4}>
            Forgot Password ?
          </Link> */}

          <span className="link1">
            Don't have an account?{" "}
            <Link to="/signup" tabIndex={5}>
              Register
            </Link>
          </span>
        </form>
        <div className="pic">
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?size=338&ext=jpg&uid=R95233801&ga=GA1.1.1100157101.1672301754&semt=ais"
            alt="fieldWithGrains"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;

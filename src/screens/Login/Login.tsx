import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom"; 
import styles from "./Login.module.scss";
import { Login as LoginIcon } from "@mui/icons-material";

interface ValidationErrors {
  password: string;
  confirmPassword: string;   
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("correo@dominio.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (password.length > 12)
      return "Password must be at most 12 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one special character.";
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string): string => {
    if (confirmPassword !== password) return "Passwords do not match.";
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value),
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  
    if (validateEmail(email) && !errors.password && !errors.confirmPassword) {
      console.log("Login successful:", { email, password });
      dispatch(login()); 
      navigate('/products'); 
    } else {
      console.log("Validation failed.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.iconContainer}>
          <h1 style={{ display: "inline-flex", alignItems: "center" }}>
            Login{" "}
            <LoginIcon
              style={{
                fontSize: "30px",
                marginLeft: "8px",
              }}
            />
          </h1>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {!validateEmail(email) && (
          <p style={{ color: "red" }}>Invalid email format</p>
        )}

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          required
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

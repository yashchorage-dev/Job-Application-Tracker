import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const checkPasswordRules = (password: string) => {
    setPasswordRules({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?#&]/.test(password),
    });
  };

  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrong) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: "400px" }}>
      <h2>Sign Up</h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "12px" }}
      />

      {/* Password */}
      <div style={{ position: "relative", marginBottom: "8px" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            checkPasswordRules(value);
          }}
          required
          style={{ width: "100%", paddingRight: "40px" }}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#aaa",
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Password hint */}
      {password && !isPasswordStrong && (
        <p style={{ color: "orange", fontSize: "13px", marginBottom: "10px" }}>
          Password must be strong (8+ chars, uppercase, lowercase, number,
          special character).
        </p>
      )}

      {/* Submit */}
      <button type="submit" style={{ width: "100%" }}>
        Create Account
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default Signup;

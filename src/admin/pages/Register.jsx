import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo.jpg";

import {
  FiEye,
  FiEyeOff,
  FiShield,
  FiUser,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

import styles from "../styles/Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        username: username.trim(),
        password,
        adminKey,
      });

      const data = response.data;

      console.log("REGISTER RESPONSE:", data);

      // ✅ FIX: check token
      if (!data?.token) {
        throw new Error("No token received from server");
      }

      // ✅ SAVE TOKEN (IMPORTANT for ProtectedRoute)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      setSuccess(data.message || "Admin created successfully!");

      setUsername("");
      setPassword("");
      setAdminKey("");

      // 🚀 redirect to dashboard
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* GLOW EFFECTS */}
      <div className={styles.glowOne}></div>
      <div className={styles.glowTwo}></div>

      <form onSubmit={handleRegister} className={styles.card}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img
              src={logo}
              alt="Tesfa Chiffon Admin"
              className={styles.logo}
            />
          </div>

          <div className={styles.badge}>
            <FiShield />
            Secure Admin Access
          </div>

          <h1 className={styles.title}>Create Admin</h1>

          <p className={styles.subtitle}>
            Create a secure admin account for dashboard management system.
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className={styles.successBox}>
            <FiCheckCircle className={styles.successIcon} />
            <div>
              <p className={styles.successTitle}>Success</p>
              <p className={styles.successText}>{success}</p>
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        )}

        {/* INPUTS */}
        <div className={styles.formGroup}>
          {/* USERNAME */}
          <div className={styles.inputWrapper}>
            <FiUser className={styles.inputIcon} />

            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* PASSWORD */}
          <div className={styles.inputWrapper}>
            <FiLock className={styles.inputIcon} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* ADMIN KEY */}
          <div className={styles.inputWrapper}>
            <FiShield className={styles.inputIcon} />

            <input
              type={showAdminKey ? "text" : "password"}
              placeholder="Admin Secret Key"
              required
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className={styles.input}
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowAdminKey(!showAdminKey)}
            >
              {showAdminKey ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            "Creating Admin..."
          ) : (
            <>
              Create Admin <FiArrowRight />
            </>
          )}
        </button>

        {/* FOOTER */}
        <div className={styles.footer}>
          <p>Already have an admin account?</p>

          <Link to="/login" className={styles.loginLink}>
            Go To Login <FiArrowRight />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

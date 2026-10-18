import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

import logo from "../../assets/logo.jpg";
import { FiEye, FiEyeOff, FiLogIn, FiUserPlus } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        username: username.trim(),
        password,
      });

      const data = response.data;

      console.log("LOGIN RESPONSE:", data);

      if (!data?.token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #111 0%, #050505 60%, #000 100%)",
        color: "white",
        padding: "20px",
        fontFamily: "system-ui",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(250,204,21,0.08)",
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "390px",
          background: "rgba(15,15,15,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "28px",
          padding: "38px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.65)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Feyorina Admin"
            style={{
              width: "88px",
              height: "88px",
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "14px",
              border: "4px solid #facc15",
              boxShadow: "0 0 30px rgba(250,204,21,0.3)",
            }}
          />

          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
              background:
                "linear-gradient(to right, #fde68a, #facc15, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fiyorina Chiffon
          </h2>

          <p style={{ fontSize: "13px", opacity: 0.6, marginTop: "6px" }}>
            Luxury Admin Dashboard
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "rgba(220,38,38,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "white",
            fontSize: "14px",
            outline: "none",
          }}
        />

        {/* PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "white",
              fontSize: "14px",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              opacity: 0.7,
              fontSize: "18px",
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "6px",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(to right, #facc15, #f59e0b)",
            color: "#000",
            fontWeight: "700",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {loading ? (
            "Signing in..."
          ) : (
            <>
              <FiLogIn /> Login
            </>
          )}
        </button>

        {/* REGISTER */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "13px", opacity: 0.6 }}>
            Need a new admin account?
          </p>

          <Link
            to="/register"
            style={{
              color: "#facc15",
              textDecoration: "none",
              fontWeight: "600",
              display: "inline-flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <FiUserPlus />
            Create Admin
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import API_BASE_URL from "./ApiConfig";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminid, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE_URL}/api/get-admin`);
      const data = res.data.data;

      if (
        data.adminid === adminid &&
        String(data.adminpassword) === password
      ) {
        navigate("/admindashboard");
        localStorage.setItem('adminLoggedIn', "admin logged in")
      } else {
        setError("Invalid Admin ID or Password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0A192F, #112240)",
      }}
    >
      <Card
        style={{
          width: "400px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4" style={{ color: "#0A192F" }}>
            Admin Login
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control
                type="text"
                name="adminid_fake"   // trick browser
                autoComplete="off"
                placeholder="Enter admin id"
                value={adminid}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password_fake" // trick browser
                autoComplete="new-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              className="w-100"
              disabled={loading}
              style={{
                backgroundColor: "#0A192F",
                border: "none",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
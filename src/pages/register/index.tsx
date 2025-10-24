import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Register.module.css";

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(`Welcome ${formData.name}! You registered as ${role}.`);
    router.push("/login");
  };

  return (
    <div className={styles.registerPage}>
      {/* Left Section (Same visual as login) */}
      <div className={styles.leftSection}>
        <div className="overlay">
          <h1 className={styles.brand}>Red and White</h1>
          <p className={styles.tagline}>
            Join our vibrant learning community and unlock your potential.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.heading}>Create Your Account</h2>
          <p className={styles.subHeading}>
            Register to start your journey with Red and White
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Role:</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              📝 Register
            </button>
          </form>

          <p className={styles.terms}>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className={styles.loginLink}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

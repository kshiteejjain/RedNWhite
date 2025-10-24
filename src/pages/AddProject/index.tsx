import Layout from "@/components/Layout/Layout";
import styles from "./AddProject.module.css";

export default function AddProject() {
  return (
    <Layout>
      <form className={styles.form}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
          />
        </div>

        <div className="form-group">
          <label>Duration (weeks):</label>
          <input
            type="number"
            className="form-control"
            placeholder="Duration in weeks"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select className="form-control">
            <option value="">Select category</option>
            <option>Fintech</option>
            <option>Education</option>
            <option>Banking</option>
            <option>Social</option>
            <option>Logistics</option>
          </select>
        </div>

        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. React, Firebase, Tailwind"
          />
        </div>

        <div className="form-group">
          <label>Project Description:</label>
          <textarea
            className="form-control"
            placeholder="Describe your project idea"
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary">
            Save Project
          </button>
      </form>

    </Layout>
  );
}

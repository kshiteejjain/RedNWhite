import Layout from "@/components/Layout/Layout";
import Table from "@/components/Table/Table";
import styles from "./ViewJobs.module.css";

export default function ViewJobs() {
  const headers = ["Job Title", "Date Posted", "Platform", "Status", "Action"];

  // Generate 50 jobs dynamically
  const jobs = Array.from({ length: 50 }, (_, i) => {
    const platforms = ["LinkedIn", "Indeed", "Naukri", "Glassdoor", "Internshala"];
    const statuses = ["Active", "Pending", "Completed"];
    return {
      "Job Title": [
        "Frontend Developer",
        "AI Engineer",
        "React Developer",
        "UI/UX Designer",
        "Cyber Security Analyst",
      ][i % 5] + ` #${i + 1}`,
      "Date Posted": `Oct ${21 - (i % 10)}`,
      Platform: platforms[i % platforms.length],
      Status: statuses[i % statuses.length],
      Action: <button className="btn-primary">View</button>,
    };
  });

  return (
    <Layout>
      <Table headers={headers} data={jobs} />
      <div className={styles.jobInfo}>
        <p>💼 Total {jobs.length} Jobs, Showing 10 jobs per page</p>
      </div>
    </Layout>
  );
}

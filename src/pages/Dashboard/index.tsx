import Layout from "@/components/Layout/Layout";
import ChartCard from "@/components/ChartCard/ChartCard";
import Table from "@/components/Table/Table";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const headers = ["Project", "Category", "Status", "Progress"];

  // Styled data for table component
  const data = [
  {
    Project: "AI Resume Builder",
    Category: <span className={`${styles.badge} ${styles.edtech}`}>EdTech</span>,
    statusText: "Active", // ✅ hidden plain text for filter
    Progress: (
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div style={{ width: "80%" }} />
        </div>
        <span>80%</span>
      </div>
    ),
  },
  {
    Project: "Chatbot App",
    Category: <span className={`${styles.badge} ${styles.fintech}`}>Fintech</span>,
    statusText: "Completed",
    Progress: (
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div style={{ width: "100%", background: "#22c55e" }} />
        </div>
        <span>100%</span>
      </div>
    ),
  },
  {
    Project: "SmartVision",
    Category: <span className={`${styles.badge} ${styles.social}`}>Social</span>,
    statusText: "Pending",
    Progress: (
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div style={{ width: "60%", background: "#f97316" }} />
        </div>
        <span>60%</span>
      </div>
    ),
  },
  {
    Project: "FinanceTracker",
    Category: <span className={`${styles.badge} ${styles.fintech}`}>Fintech</span>,
    statusText: "Active",
    Progress: (
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div style={{ width: "45%" }} />
        </div>
        <span>45%</span>
      </div>
    ),
  },
  {
    Project: "HealthMonitor",
    Category: <span className={`${styles.badge} ${styles.healthtech}`}>HealthTech</span>,
    statusText: "Active",
    Progress: (
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div style={{ width: "70%", background: "#8b5cf6" }} />
        </div>
        <span>70%</span>
      </div>
    ),
  },
];


  const barData = {
    labels: ["AI", "Fintech", "EdTech", "Social", "HealthTech"],
    datasets: [
      {
        label: "Active Projects",
        data: [5, 3, 6, 2, 4],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [10, 7, 3],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Layout>
      <div className={styles.dashboard}>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total Projects</h3>
            <h2>24</h2>
            <p className={styles.greenText}>+12% from last month</p>
          </div>
          <div className={styles.card}>
            <h3>Completed</h3>
            <h2>12</h2>
            <p className={styles.greenText}>50% completion rate</p>
          </div>
          <div className={styles.card}>
            <h3>Active Members</h3>
            <h2>48</h2>
            <p className={styles.greenText}>+8 this week</p>
          </div>
          <div className={styles.card}>
            <h3>Pending Tasks</h3>
            <h2>4</h2>
            <p className={styles.redText}>2 due this week</p>
          </div>
        </div>

        <div className={styles.chartSection}>
          <ChartCard title="Projects by Category" type="bar" data={barData} />
          <ChartCard title="Project Status Distribution" type="pie" data={pieData} />
        </div>

        <div className={styles.tableSection}>
          <h2>Recent Projects</h2>
          {/* ✅ Uses your existing Table component */}
          <Table headers={headers} data={data} />
        </div>
      </div>
    </Layout>
  );
}

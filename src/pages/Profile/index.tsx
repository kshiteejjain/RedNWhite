import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import styles from "./Profile.module.css";
import headerStyles from "../Projects/AddProject.module.css";
import { getSession, type AuthUser } from "@/utils/authSession";

export default function Profile() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const formatValue = (value: unknown) => {
    if (!value) return "Not available";
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (value && typeof (value as any).toDate === "function") {
      return (value as any).toDate().toLocaleDateString();
    }
    if (
      value &&
      typeof value === "object" &&
      "seconds" in (value as Record<string, unknown>)
    ) {
      const seconds = (value as Record<string, number>).seconds;
      if (typeof seconds === "number") {
        return new Date(seconds * 1000).toLocaleDateString();
      }
    }
    try {
      return String(value);
    } catch {
      return "Not available";
    }
  };

  return (
    <Layout>
      <div className={styles.page}>
        <section className={headerStyles.header}>
          <div>
            <h2 className={headerStyles.title}>Profile</h2>
            <p className={headerStyles.subtitle}>
              See your account details and stay on top of your activity.
            </p>
          </div>
        </section>

        {user ? (
          <section className={styles.grid}>
            <div className={`${styles.card} ${styles.glow}`}>
              <div className={styles.badge}>{user.name?.[0] ?? "U"}</div>
              <h3 className={styles.cardTitle}>{user.name || "User"}</h3>
              <p className={styles.cardMeta}>{user.email}</p>
              <p className={styles.role}>{user.role || "Member"}</p>
            </div>

            <div className={styles.card}>
              <h4 className={styles.label}>User ID</h4>
              <p className={styles.value}>{user.userId ?? "Not available"}</p>
              <div className={styles.divider} />
              <h4 className={styles.label}>Role</h4>
              <p className={styles.value}>{user.role ?? "Member"}</p>
            </div>

            <div className={styles.card}>
              <h4 className={styles.label}>Profile Details</h4>
              <ul className={styles.infoList}>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Mobile Number</span>
                  <span className={styles.infoValue}>
                    {formatValue((user as any)?.mobileNumber)}
                  </span>
                </li>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Profile Created</span>
                  <span className={styles.infoValue}>
                    {formatValue(
                      (user as any)?.profileCreatedAt || (user as any)?.createdAt
                    )}
                  </span>
                </li>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Subject</span>
                  <span className={styles.infoValue}>
                    {formatValue((user as any)?.subject)}
                  </span>
                </li>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Course Name</span>
                  <span className={styles.infoValue}>
                    {formatValue((user as any)?.courseName)}
                  </span>
                </li>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Course Duration</span>
                  <span className={styles.infoValue}>
                    {formatValue((user as any)?.courseDuration)}
                  </span>
                </li>
                <li className={styles.infoRow}>
                  <span className={styles.infoLabel}>Course Start Date</span>
                  <span className={styles.infoValue}>
                    {formatValue((user as any)?.courseStartDate)}
                  </span>
                </li>
              </ul>
            </div>
          </section>
        ) : (
          <section className={styles.empty}>
            <h3>No profile found</h3>
            <p>Please login to view your profile.</p>
            <button
              type="button"
              className={styles.primary}
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
          </section>
        )}
      </div>
    </Layout>
  );
}

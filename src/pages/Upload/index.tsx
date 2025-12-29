import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import styles from "./Upload.module.css";
import { toast } from "react-toastify";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type CsvUser = {
  name?: string;
  email?: string;
  role?: string;
  mobile?: string;
  courseName?: string;
  courseDuration?: string;
  courseStartDate?: string;
  subject?: string;
};

const parseCsv = (text: string): CsvUser[] => {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = cols[idx] ?? "";
    });
    return {
      name: record.name || record.fullname,
      email: record.email,
      role: record.role,
      mobile: record.mobile,
      courseName: record.coursename,
      courseDuration: record.courseduration,
      courseStartDate: record.coursestartdate,
      subject: record.subject,
    };
  });
};

export default function UploadUsers() {
  const [status, setStatus] = useState<UploadStatus>("idle");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setStatus("uploading");

    try {
      const text = await file.text();
      const users = parseCsv(text).filter((u) => u.email);
      if (users.length === 0) {
        throw new Error("No valid rows found (email required).");
      }

      const response = await fetch("/api/uploadUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(
          (errorBody as { message?: string }).message ?? "Upload failed"
        );
      }

      setStatus("success");
      toast.success("Data uploaded successfully.");
    } catch (error) {
      console.error("Upload failed", error);
      setStatus("error");
      toast.error(
        error instanceof Error ? error.message : "Upload failed. Try again."
      );
    } finally {
      event.target.value = "";
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const statusLabel =
    status === "uploading"
      ? "Uploading..."
      : status === "success"
      ? "Completed"
      : status === "error"
      ? "Failed"
      : "Upload";

  return (
    <Layout>
      <div className={styles.page}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>Upload Users</h2>
            <p className={styles.subtitle}>
              Import a CSV of users; we’ll skip duplicates based on email.
            </p>
          </div>

          <label className={styles.uploadButton}>
            <span className={styles.buttonLabel}>{statusLabel}</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleUpload}
              className={styles.fileInput}
            />
          </label>

          <div className={styles.statusTrack}>
            <div
              className={`${styles.statusDot} ${styles[status] ?? ""}`}
              aria-label={statusLabel}
            />
            <span className={styles.statusText}>{statusLabel}</span>
          </div>
        </section>
      </div>
    </Layout>
  );
}

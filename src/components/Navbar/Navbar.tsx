import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter(); // Destructure pathname directly from router
  const [pageTitle, setPageTitle] = useState("Dashboard"); // Default title

  useEffect(() => {
    // Get the last part of the pathname and format it as a title
    const title = pathname.split("/").pop()?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) || "Dashboard";
    setPageTitle(title); // Set the page title
  }, [pathname]); // Only re-run when the pathname changes

  return (
    <header className={styles.navbar}>
      <h4 className={styles.pageTitle}>{pageTitle}</h4>

      <div className={styles.actions}>
        <span title="Notifications" className={styles.icon}>
          &#128276;
        </span>

        {/* User Menu */}
        <div className={styles.userMenu}>
          <span
            className={styles.userIcon}
            onClick={() => setOpen(!open)}
            title="User Menu"
          >
            &#128100;
          </span>
          {open && (
            <ul className={styles.dropdown}>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

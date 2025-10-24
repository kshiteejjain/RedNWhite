import Layout from "@/components/Layout/Layout";
import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <Layout>
      <form className={styles.profileForm}>
        <input placeholder="Full Name" />
        <input placeholder="Email" />
        <input placeholder="Mobile Number" />
        <input placeholder="Enrolled Course" />
        <input placeholder="Course Duration" />
        <input placeholder="Progress (%)" />
        <button>Save Profile</button>
      </form>
    </Layout>
  );
}

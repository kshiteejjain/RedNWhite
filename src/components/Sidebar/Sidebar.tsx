import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const menuItems = [
  { name: "🏠 Dashboard", path: "/Dashboard" },
  { name: "📁 Add Projects", path: "/AddProject" },
  { name: "💼 View Jobs", path: "/ViewJobs" },
  { name: "🎯 Interview Preparation", path: "/InterviewQuestions" },
  { name: "🧾 AI Resume Builder", path: "/comingsoon" },
  { name: "🎙️ AI Mock Interview", path: "/comingsoon" },
  { name: "💡 AI Project Ideas", path: "/comingsoon" },
  { name: "💬 Discussion Forum", path: "/comingsoon" },
  { name: "🤝 Mentorship", path: "/comingsoon" },
  { name: "📘 Resource Library", path: "/comingsoon" },
  { name: "🏆 Leaderboard", path: "/comingsoon" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src="/logo.webp" alt="Logo" width={128} height={30} priority />
      </div>

      <ul className={styles.menuList}>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <li
              key={item.name}
              className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

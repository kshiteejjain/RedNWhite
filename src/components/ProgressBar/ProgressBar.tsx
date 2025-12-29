import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

  return (
    <div className={`${styles.track} ${className ?? ""}`.trim()}>
      <div className={styles.fill} style={{ width: `${safeValue}%` }} />
    </div>
  );
}

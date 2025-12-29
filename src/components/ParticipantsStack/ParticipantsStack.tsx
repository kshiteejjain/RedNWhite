import { useId } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import styles from "./ParticipantsStack.module.css";

type ParticipantsStackProps = {
  participants: string[];
  maxVisible?: number;
  size?: "sm" | "md";
  className?: string;
  showNames?: boolean;
  namesClassName?: string;
};

const palette = ["#fdba13", "#f7a800", "#e69a00", "#d68d00", "#c27f00"];

const getInitials = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (
      parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
    );
  }
  if (trimmed.length >= 2) {
    return trimmed.slice(0, 2).toUpperCase();
  }
  return trimmed[0].toUpperCase();
};

export function ParticipantsStack({
  participants,
  maxVisible = 3,
  size = "md",
  className,
  showNames = false,
  namesClassName,
}: ParticipantsStackProps) {
  const tooltipId = useId();
  const visible = participants.slice(0, maxVisible);
  const remaining = participants.length - visible.length;

  return (
    <div className={`${styles.stackWrap} ${className ?? ""}`}>
      <div className={`${styles.stack} ${styles[size]}`}>
        {visible.map((person, index) => (
          <span
            key={person}
            className={styles.avatar}
            style={{
              backgroundColor: palette[index % palette.length],
              zIndex: 10 - index,
            }}
            data-tooltip-id={tooltipId}
            data-tooltip-content={person}
          >
            {getInitials(person)}
          </span>
        ))}
        {remaining > 0 ? (
          <span
            className={`${styles.avatar} ${styles.overflow}`}
            data-tooltip-id={tooltipId}
            data-tooltip-content={participants.slice(maxVisible).join(", ")}
          >
            +{remaining}
          </span>
        ) : null}
      </div>

      {showNames && participants.length > 0 ? (
        <div className={`${styles.names} ${namesClassName ?? ""}`}>
          {visible.join(", ")}
          {remaining > 0 ? "…" : ""}
        </div>
      ) : null}

      <Tooltip id={tooltipId} className={styles.tooltip} />
    </div>
  );
}

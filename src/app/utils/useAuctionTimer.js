import { useEffect, useState } from "react";

export function useAuctionTimer(startTime, endTime) {
  const [currentStatus, setCurrentStatus] = useState("");
  const [timeText, setTimeText] = useState("");

  function formatDuration(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    if (!startTime || !endTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      const timeUntilStart = start - now;
      const timeUntilEnd = end - now;

      if (timeUntilStart > 0) {
        setCurrentStatus("upcoming");
        setTimeText(`Starts in ${formatDuration(timeUntilStart)}`);
      } else if (timeUntilEnd > 0) {
        setCurrentStatus("active");
        setTimeText(`Ends in ${formatDuration(timeUntilEnd)}`);
      } else {
        setCurrentStatus("ended");
        setTimeText("Event Ended");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return { currentStatus, timeText };
}

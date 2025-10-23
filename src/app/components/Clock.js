"use client";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const Clock = ({ startTime, endTime }) => {
  const [time, setTime] = useState();

  function formatDuration(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      const timeUntilStart = start - now;
      const timeUntilEnd = end - now;

      if (timeUntilStart > 0) {
        setTime(`Starts in ${formatDuration(timeUntilStart)}`);
      } else if (timeUntilEnd > 0) {
        setTime(`Ends in ${formatDuration(timeUntilEnd)}`);
      } else {
        setTime("Event Ended");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
    >
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 6,
          width: 360,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            {time}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Clock;

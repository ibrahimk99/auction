"use client";
import { Typography, Box } from "@mui/material";
import { useAuctionTimer } from "../utils/useAuctionTimer";

const Clock = ({ startTime, endTime }) => {
  const { currentStatus, timeText } = useAuctionTimer(startTime, endTime);

  return (
    <Box
      position="absolute"
      top={62}
      right={20}
      zIndex={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      borderRadius={3}
      width={300}
      boxShadow={5}
      p={2}
    >
      <Typography variant="h6" gutterBottom>
        {timeText}
      </Typography>

      {currentStatus === "upcoming" && (
        <Typography color="warning.main">
          Auction hasn’t started yet ⏳
        </Typography>
      )}

      {currentStatus === "running" && (
        <>
          <Typography color="success.main">Auction is LIVE 🔥</Typography>
        </>
      )}

      {currentStatus === "ended" && (
        <Typography color="error.main">Auction has ended 🏁</Typography>
      )}
    </Box>
  );
};

export default Clock;

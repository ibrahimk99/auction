// "use client";

// import { useState } from "react";
// import { Typography, Box, Button } from "@mui/material";
// import { useAuctionTimer } from "../utils/useAuctionTimer";
// import { Activity } from "react";

// const Clock = ({ startTime, endTime }) => {
//   const { timeText } = useAuctionTimer(startTime, endTime);
//   const [isVisible, setIsVisible] = useState(true);

//   return (
//     <Activity mode={isVisible ? "visible" : "hidden"}>
//       <Box
//         position={{ xs: "static", md: "absolute" }}
//         top={{ md: 50 }}
//         right={{ md: 20 }}
//         mx={{ xs: "auto" }}
//         mt={{ xs: 2 }}
//         zIndex={2}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         bgcolor="background.paper"
//         borderRadius={3}
//         width={{ xs: "90%", sm: 350, md: 300 }}
//         boxShadow={4}
//         p={3}
//         textAlign="center"
//         sx={{ position: { xs: "relative", sm: "relative", md: "absolute" } }}
//       >
//         <Button
//           variant="contained"
//           color="error"
//           size="small"
//           onClick={() => setIsVisible(false)} // hide Clock
//           sx={{
//             borderRadius: "50%",
//             position: "absolute",
//             top: 8,
//             right: 8,
//             minWidth: "auto",
//             padding: "4px 8px",
//           }}
//         >
//           X
//         </Button>

//         <Typography variant="h5" fontWeight={700} gutterBottom>
//           {timeText || "Loading..."}
//         </Typography>
//       </Box>
//     </Activity>
//   );
// };

// export default Clock;
"use client";

import { useState } from "react";
import { Typography, Box, Button, colors } from "@mui/material";
import { useAuctionTimer } from "../utils/useAuctionTimer";
import { Activity } from "react";

const Clock = ({ startTime, endTime }) => {
  const { timeText } = useAuctionTimer(startTime, endTime);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Activity mode={!isVisible ? "visible" : "hidden"}>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 60,
            right: 8,
            minWidth: "auto",
            padding: "4px 8px",
          }}
          onClick={() => setIsVisible(!isVisible)}
        >
          Auction Status
        </Button>
      </Activity>

      <Activity mode={isVisible ? "visible" : "hidden"}>
        <Box
          position={{ xs: "static", md: "absolute" }}
          top={{ md: 50 }}
          right={{ md: 20 }}
          mx={{ xs: "auto" }}
          mt={{ xs: 2 }}
          zIndex={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="background.paper"
          borderRadius={3}
          width={{ xs: "90%", sm: "80%", md: 340 }}
          boxShadow={4}
          p={3}
          textAlign="center"
          sx={{ position: { xs: "relative", sm: "relative", md: "absolute" } }}
        >
          <Button
            variant="outline"
            size="small"
            onClick={() => setIsVisible(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              minWidth: "auto",
              padding: "4px 8px",
            }}
          >
            X
          </Button>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {timeText || "Loading..."}
          </Typography>
        </Box>
      </Activity>
    </>
  );
};

export default Clock;

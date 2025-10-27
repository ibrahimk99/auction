"use client";
import { safeFetch } from "../utils/safeFetch";
import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
const AuctionStatus = () => {
  const [winAuctions, setWinAuctions] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAuctionStatus(signal);
    return () => controller.abort();
  }, []);

  const fetchAuctionStatus = async (signal) => {
    const data = await safeFetch(
      "/api/auction/auction-status",
      null,
      { method: "GET", headers: { "Content-Type": "application/json" } },
      null,
      signal
    );
    if (data) {
      console.log(data);
      setWinAuctions(data);
    }
  };

  return (
    <div>
      {" "}
      <Header />
      <div className="container-fluid px-5 py-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {winAuctions.map((item, idx) => (
            <div key={idx} className="col">
              <Card sx={{ boxShadow: 3, height: "100%" }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="200"
                  image={item.images}
                />

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Winner is <b>{item.winnerId?.name}</b>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Title: {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Ended: {new Date(item.endTime).toLocaleString("en-PK")}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.finalPrice}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" variant="outlined" fullWidth>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AuctionStatus;

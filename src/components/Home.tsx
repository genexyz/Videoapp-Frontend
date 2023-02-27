import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import Grid from "@mui/material/Grid";
import Video from "../interfaces/Video";

export default function Home() {
  const [videos, setVideos] = useState<Array<Video>>([]);

  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    const fetchVideos = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found");
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/videos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setVideos(data.videos);
        } else {
          console.log("Error fetching videos");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (user) fetchVideos();
  }, []);

  console.log(videos);

  return (
    <Container maxWidth="xl">
      {!user && (
        <div>
          <h1>Welcome to VIDEOAPP</h1>
          <p>
            <Link to="/login">Sign in</Link> or <Link to="/register">Sign up</Link>
          </p>
        </div>
      )}
      {user && (
        <div>
          <h1>Welcome to VIDEOAPP</h1>
          <Grid container spacing={2} alignItems="center">
            {videos.map((video: Video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard
                  title={video.title}
                  thumbnailUrl={video.thumbnail}
                  userAvatarUrl={video.User.imageUrl}
                  username={video.User.name}
                  id={video.id}
                  userId={video.userId}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
}

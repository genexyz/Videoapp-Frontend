import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Video from "../interfaces/Video";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function VideoPage() {
  const [video, setVideo] = useState<Video>({} as Video);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    const fetchVideo = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found");
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/videos/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setVideo(data.video);
          setLoading(false);
        } else {
          console.log("Error fetching videos");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (user) fetchVideo();
  }, [id]);

  console.log(video);

  return (
    <Container maxWidth="xl">
      {!user && (
        <div>
          <p>
            <RouterLink to="/login">Sign in</RouterLink> or{" "}
            <RouterLink to="/register">Sign up</RouterLink>
          </p>
        </div>
      )}
      {user && !loading && (
        <Grid container spacing={2} alignItems="center">
          <Grid container item xs={12} md={10} spacing={2}>
            <Grid item xs={12}>
              <h1>{video.title}</h1>
              <p>{video.description}</p>
            </Grid>
            <Grid item xs={12}>
              <Link href={video.url} target="_blank" rel="noopener">
                {video.url}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thumbnail-responsive"
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            md={2}
            alignItems="center"
            justifyContent="center"
          >
            <img src={video.User.imageUrl} alt={video.User.name} width={50} height={50} />
            <p>{video.User.name}</p>
            <Grid item xs={12}>
              <RouterLink to={`/profile/${video.User.id}`}>
                <Button variant="contained" color="secondary">
                  Profile
                </Button>
              </RouterLink>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

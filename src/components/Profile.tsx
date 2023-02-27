import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import Grid from "@mui/material/Grid";
import Video from "../interfaces/Video";

export default function Profile() {
  const [creator, setCreator] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    const fetchCreator = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found");
          return;
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setCreator(data);
          setLoading(false);
        } else {
          console.log("Error fetching creator");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (user) fetchCreator();
  }, [id]);

  console.log(creator);

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
        <>
          <h1>{creator.creator.name}</h1>
          <p>{creator.creator.bio}</p>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <h2>Videos Published:</h2>
            </Grid>
            {creator.videos
              .filter((video: Video) => video.published === true)
              .map((video: Video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                  <VideoCard
                    title={video.title}
                    thumbnailUrl={video.thumbnail}
                    userAvatarUrl={video.User.imageUrl}
                    username={video.User.name}
                    id={video.id}
                    userId={video.User.id}
                  />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

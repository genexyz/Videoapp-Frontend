import { styled } from "@mui/material/styles";
import { Card, CardHeader, CardMedia, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: theme.spacing(2),
}));

export interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  userAvatarUrl: string;
  username: string;
  id: string;
  userId: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnailUrl,
  userAvatarUrl,
  username,
  id,
  userId,
}) => {
  return (
    <Link to={`/video/${id}`} component={RouterLink} color="inherit" underline="none">
      <StyledCard>
        <CardHeader
          avatar={<Avatar alt={username} src={userAvatarUrl} />}
          title={title}
          subheader={username}
        />
        <CardMedia component="img" image={thumbnailUrl} />
      </StyledCard>
    </Link>
  );
};

export default VideoCard;

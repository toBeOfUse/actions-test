import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface IBlogPostProps {
  title: string;
  author: string;
  date: string;
  content: string;
  authorImage: string;
  liked: boolean;
  likeCallback: (likedNow: boolean) => void;
}

const BlogPost = ({
  title,
  author,
  date,
  content,
  authorImage,
  liked,
  likeCallback,
}: IBlogPostProps) => {
  return (
    <Card sx={{ width: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img height="20" width="20" src={authorImage} alt={title} />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="span"
          >
            Written on {date} by {author}
          </Typography>
        </div>
        <Typography variant="body1" margin="15px auto">
          {content}
        </Typography>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => likeCallback(!liked)}
          data-testid="like_button"
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPost;

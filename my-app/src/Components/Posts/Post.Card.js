import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ToggleButton from "@mui/material/ToggleButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { Component, useEffect, useState } from "react";
// Comments coponents
import Comment from "../Comments/Comment";
// Testing Comments
import PComment from "../Comments/PComment";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

let id = '';

//Get the User Post Data
function getCommentBox() {
  alert("get post button clicked");

}

const renderCommentBox = (props) => {

}

export default function PostCard(props) {

  let userSession = ReactSession.get("userSession");
  function like(e) {
    id = e.currentTarget.id;
    const userId = userSession._id
    axios.post("http://localhost:5000/user.post.route/likePost/" + id + '/' + userId)
  }
  function unlike(e) {
    id = e.currentTarget.id;
    const userId = userSession._id
    axios.post("http://localhost:5000/user.post.route/unlikePost/" + id + '/' + userId)
  }
  const [expanded, setExpanded] = React.useState(false);
  const [selectedLike, setSelectedLike] = React.useState(false);
  const [selectedDislike, setSelectedDislike] = React.useState(false);
  const [likes, setLikes] = React.useState(props.likes);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Comments functions
  const [isCommentToggle, setCommentToggle] = React.useState(false);

  //checks whether a post has been liked by the current user. Runs immediately when component mounts.
  function checkLike(){
    if(userSession){
      let userId = userSession._id;
      axios.get("http://localhost:5000/user/getUserLikedPosts/"+userId)
      .then((res) => {
        let likedPosts = res.data;
        if (likedPosts.includes(props.id)){
          setSelectedLike(true);
        }
      })
    }
  }

 // Run a useEffect to compare the post id, and see if has been 'liked' by the current user through the userSession.
  useEffect(() => {
  checkLike();
  },[])
// test push 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.body}
<br/>
          {props.id}

        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <div className="d-flex fd-column">

          <ToggleButton
            id= {props.id}
            value="check"
            size="small"
            color="success"
            selected={selectedLike}
            onChange={() => {
              //changes the 'liked' state of the toggle button
              setSelectedLike(!selectedLike);
              //Cosmetically (front-end only) increments the like and decrements the unlike
              if (!selectedLike){
              setLikes(likes+1);
              }else{
                setLikes(likes-1);
              }
            }}
            //determines whether to like or unlike based on the state.
            onClick={selectedLike? unlike : like}
          >
            <ArrowDropUpIcon />
          </ToggleButton>
          <Typography>{likes}</Typography>


        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <button onClick={() => setCommentToggle(!isCommentToggle)}>Comment</button>
        <div style={{ padding: "10px" }}>{"~" + props.username}</div>
      </CardActions>
      {isCommentToggle && <PComment currentUserId = {props.userId}/>}
    </Card>
  );
}


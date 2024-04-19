//Comment.js
import React, { useState, useEffect } from "react";
import { Typography, Box, Divider, Stack, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./Post.css";
import moment from "moment/moment";

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState([]);
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return (
        words[0].charAt(0).toUpperCase() +
        words[words.length - 1].charAt(0).toUpperCase()
      );
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/post/Comment/" + post
      );
      console.log("Response data (display comment):", response.data); // Log the response data
      console.log("Response (display comment):", response); // Log the response data
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!content) {
      console.error("Error adding new comment: Comment cannot be empty");
      alert("Comment cannot be empty");
      return;
    }
    console.log("Comment inserted: ", content);
    try {
      // const response = await axios.post("http://localhost:5050/LeaveComment/"+post)
      const response = await axios.post(
        `http://localhost:5050/api/post/LeaveComment/${post}`,
        { content: content }
      );
      fetchComments();
      setContent(response.data);
      alert("Comment posted successfully!");
      console.log("Response data (insert comment):", response.data); // Log the response data
      console.log("Response (insert comment):", response); // Log the response data
      setContent("");
    } catch (error) {
      console.error("Error inserting comments:", error);
      alert("Failed to post comment: Internal server error");
    }
  };

  useEffect(() => {
    // console.log(posts);
    fetchComments();
    console.log("Comment page postID:", post);
    return () => null;
  }, []);

  return (
    <Box>
      <label
        style={{
          display: "flex",
          width: "80%",
          fontWeight: "Bold",
          margin: "20px",
          fontSize: "18px",
          color: "grey",
        }}
      >
        Comments
      </label>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignment: "center",
          // backgroundColor: "red",
          pb: "10px",
          height: "560px",
          overflow: "auto",
        }}
      >
        {comments?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              height: "50px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "25px",
              marginBottom: "8px",
              // backgroundColor: "blue",
              borderRadius: "5px",
              // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography variant="body1" sx={{ color: "grey" }}>
              No Comments
            </Typography>
          </Box>
        ) : (
          comments?.map((comment, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "90%",
                height: "auto",
                marginLeft: "30px",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "3px",
                // backgroundColor: "white",
                borderRadius: "10px",
                // backgroundColor:'blue'
                // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Box sx={{ margin: "5px" }} justifyContent="flex-start">
                <Box sx={{ display: "flex", flexDirection: "row", mb: "10px" }}>
                  {comment.ProfilePictureURL ? (
                    <Avatar
                      alt="Avatar"
                      src={comment.ProfilePictureURL}
                      className="avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <Avatar
                      className="avatar"
                      style={{ width: "50px", height: "50px" }}
                    >
                      {comment.Username && getInitials(comment.Username)}
                    </Avatar>
                  )}
                  <Stack
                    direction="column"
                    spacing={0.3}
                    className={"posterInfo-comment"}
                  >
                    <label
                      style={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        overflow: "hidden",
                        width: "100%",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {comment.Username}
                    </label>
                    <label className={"postTime-comment"}>
                      {moment(comment.CommentDate).fromNow()}
                    </label>
                  </Stack>
                </Box>
                <Typography
                  sx={{ fontSize: "14px", m: "10px" }}
                  variant="body1"
                  gutterBottom
                >
                  {comment.Content}
                </Typography>
                <Divider
                  variant="middle"
                  sx={{
                    width: "900px",
                    backgroundColor: "#F9F9F9",
                    mb: "5px",
                    mt: "5px",
                  }}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>
      <Stack direction={"row"} sx={{ width: "100%" }} alignItems="center">
        <form>
          <TextareaAutosize
            maxRows={4}
            aria-label="comments-box"
            placeholder="Leave your thoughts here....."
            style={{
              resize: "none",
              width: "870px",
              height: "30px",
              borderRadius: "10px",
              margin: "10px",
              paddingTop: "10px",
              paddingLeft: "10px",
              borderColor: "#D1D1D1",
            }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              console.log("Content here:", e.target.value); // Add this console.log statement
            }}
          />
        </form>
        <Button
          sx={{
            height: "40px",
            width: "70px",
            mb: "5px",
            bgcolor: "#8BA766",
            color: "#fff",
            "&:hover": {
              bgcolor: "#495D44", // Adjust hover background color
              opacity: 5, // Adjust hover opacity as needed
            },
          }}
          onClick={handleAddComment}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default Comments;

//Post.js
import React, { useState } from "react";
import { FaHeart, FaComment, FaStar, FaRegComment } from "react-icons/fa";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import "./Post.css";
import Stack from "@mui/material/Stack";
import { CiHeart, CiStar } from "react-icons/ci";
import Button from "@mui/material/Button";
import { ImageList, ImageListItem, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Post = ({ post, onLike, onComment, onStar }) => {
  const navigate = useNavigate();
  const { AuthorUsername, PostDate, Content, MediaTypes, MediaURLs, Avatars } =
    post; // Adjust property names here

  const handleCommentClick = () => {
    navigate("/Irrigation");
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageSize = {
    width: "100%", // Set the width to 100% to fill the ImageListItem
    height: "100px", // Let the height adjust based on the aspect ratio
    objectFit: "cover",
  };
  // Open modal and set selected image when image is clicked
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const handleModalClose = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

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

  const handleModalClosing = (event) => {
    if (event.target !== event.currentTarget) {
      // Clicked inside the modal content (not on the modal background)
      return;
    }
    // Clicked on the modal background (outside the modal content)
    handleCloseModal();
  };

  // Function to handle clicking on the post to navigate to details
  const handleClick = () => {
    // Navigate to post details page
    navigate(`/post/${post.id}`);
  };

  // Function to render media content (images/videos)
  const renderMediaContent = () => {
    if (MediaURLs && MediaURLs.length > 0) {
      // If media URLs exist, render the media content
      return (
        <ImageList rowHeight={350} cols={3} gap={8}>
          {MediaURLs.split(",").map((url, index) => (
            <ImageListItem key={index} onClick={() => handleImageClick(url)}>
              <img src={url.trim()} alt={`Image ${index}`} style={imageSize} />
            </ImageListItem>
          ))}
        </ImageList>
      );
    } else {
      // If no media content, render a placeholder or message
      return null;
    }
  };

  return (
    <div className={"post"}>
      <Stack direction="column" spacing={1} className={"EachSinglePost"}>
        <div className={"postHeader"}>
          <Stack direction="row" spacing={3} className={"post-info"}>
            {Avatars ? (
              <Avatar
                alt="Avatar"
                src={Avatars}
                className="avatar"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <Avatar
                className="avatar"
                style={{ width: "50px", height: "50px" }}
              >
                {AuthorUsername && getInitials(AuthorUsername)}
              </Avatar>
            )}
            <Stack direction="column" spacing={0.3} className={"poster-info"}>
              {/*<label className={"username"}>{post.username}</label>*/}
              {/*<label className={"postTime"}>{moment(post.timeStamp).fromNow()}</label>*/}
              <label className={"username"}>{AuthorUsername}</label>
              <label className={"postTime"}>{moment(PostDate).fromNow()}</label>
            </Stack>
          </Stack>
        </div>

        <div className={"post-content"}>
          {/*<label className={"captions"}>{post.caption}</label>*/}
          {/*/!* Conditional rendering of images *!/*/}
          {/*{post.images && post.images.length > 0 && (*/}
          {/*    <ImageList rowHeight={350} cols={3} gap={8}>*/}
          {/*        {post.images.map((image, index) => (*/}
          {/*            <ImageListItem key={index} onClick={() => handleImageClick(image)}>*/}
          {/*                <img src={image.url} alt={image.alt} style={imageSize} />*/}
          {/*            </ImageListItem>*/}
          {/*        ))}*/}
          {/*    </ImageList>*/}
          {/*)}*/}
          <label className={"captions"}>{Content}</label>
          {/*{MediaURLs && MediaURLs.length > 0 && (*/}
          {/*    <ImageList rowHeight={350} cols={3} gap={8}>*/}
          {/*        {MediaURLs.split(',').map((url, index) => (*/}
          {/*            <ImageListItem key={index} onClick={() => handleImageClick(url)}>*/}
          {/*                <img src={url.trim()} alt={`Image ${index}`} style={imageSize} />*/}
          {/*            </ImageListItem>*/}
          {/*        ))}*/}
          {/*    </ImageList>*/}
          {/*)}*/}
          {renderMediaContent()}
        </div>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className={"postActions"}
        >
          <form>
            <input
              className={"commentBox"}
              type="text"
              placeholder={"Say Something...."}
              // value={comment}
              // onChange={handleChange}
            />
          </form>

          <Stack direction="row" spacing={2} className={"buttonsAction"}>
            <button
              className={"buttonInteraction"}
              onClick={handleCommentClick}
              type="submit"
            >
              <FaRegComment size={15} /> Comments
            </button>
            <button
              className={"buttonInteraction"}
              onClick={() => onLike(post.id)}
            >
              <CiHeart size={23} />
            </button>
            <button
              className={"buttonInteraction"}
              onClick={() => onStar(post.id)}
            >
              <CiStar size={23} />
            </button>
          </Stack>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            onClick={handleModalClosing}
            onKeyDown={handleKeyDown}
          >
            <div className="modalContent">
              <img
                src={selectedImage?.url}
                alt={selectedImage?.alt}
                className="modalImage"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </Modal>
        </Stack>
      </Stack>
    </div>
  );
};

export default Post;

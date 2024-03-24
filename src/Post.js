import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import "./Post.css";
import Stack from "@mui/material/Stack";
import { CiHeart, CiStar } from "react-icons/ci";
import { ImageList, ImageListItem, Modal } from "@mui/material";

const Post = ({ post, onLike, onStar }) => {
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

  return (
    <div className={"post"}>
      <Stack direction="column" spacing={1} className={"EachSinglePost"}>
        <div className={"postHeader"}>
          <Stack direction="row" spacing={3} className={"post-info"}>
            {/* <Avatar alt={"Avatar"} src={post.avatar} className={"avatar"} style={{ width: '50px', height: '50px'}}/> */}
            {post.avatar ? (
              <Avatar
                alt="Avatar"
                src={post.avatar}
                className="avatar"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <Avatar
                className="avatar"
                style={{ width: "50px", height: "50px" }}
              >
                {getInitials(post.username)}
              </Avatar>
            )}
            <Stack direction="column" spacing={0.3} className={"poster-info"}>
              <label className={"username"}>{post.username}</label>
              <label className={"postTime"}>
                {moment(post.timeStamp).fromNow()}
              </label>
            </Stack>
          </Stack>
        </div>

        <div className={"post-content"}>
          <label className={"captions"}>{post.caption}</label>
          {/* Conditional rendering of images */}
          {post.images && post.images.length > 0 && (
            <ImageList rowHeight={350} cols={3} gap={8}>
              {post.images.map((image, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => handleImageClick(image)}
                >
                  <img src={image.url} alt={image.alt} style={imageSize} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
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
              // onClick={handleCommentClick}
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

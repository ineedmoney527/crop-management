// //Post.js
// import React, { useState } from "react";
// import { FaHeart, FaComment, FaStar, FaRegComment } from "react-icons/fa";
// import moment from "moment";
// import Avatar from "@mui/material/Avatar";
// import "./Post.css";
// import Stack from "@mui/material/Stack";
// import { CiHeart, CiStar } from "react-icons/ci";
// import Button from "@mui/material/Button";
// import { ImageList, ImageListItem, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Post = ({ post, onLike, onComment, onStar }) => {
//   const navigate = useNavigate();
//   const { AuthorUsername, PostDate, Content, MediaTypes, MediaURLs, Avatars } =
//     post; // Adjust property names here

//   const handleCommentClick = () => {
//     navigate("/Irrigation");
//   };
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const imageSize = {
//     width: "100%", // Set the width to 100% to fill the ImageListItem
//     height: "100px", // Let the height adjust based on the aspect ratio
//     objectFit: "cover",
//   };
//   // Open modal and set selected image when image is clicked
//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedImage(null);
//   };

//   const handleModalClose = (event) => {
//     if (event.target === event.currentTarget) {
//       handleCloseModal();
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Escape") {
//       handleCloseModal();
//     }
//   };

//   const getInitials = (name) => {
//     const words = name.split(" ");
//     if (words.length === 1) {
//       return words[0].charAt(0).toUpperCase();
//     } else {
//       return (
//         words[0].charAt(0).toUpperCase() +
//         words[words.length - 1].charAt(0).toUpperCase()
//       );
//     }
//   };

//   const handleModalClosing = (event) => {
//     if (event.target !== event.currentTarget) {
//       // Clicked inside the modal content (not on the modal background)
//       return;
//     }
//     // Clicked on the modal background (outside the modal content)
//     handleCloseModal();
//   };

//   // Function to handle clicking on the post to navigate to details
//   const handleClick = () => {
//     // Navigate to post details page
//     navigate(`/post/${post.id}`);
//   };

//   // Function to render media content (images/videos)
//   const renderMediaContent = () => {
//     if (MediaURLs && MediaURLs.length > 0) {
//       // If media URLs exist, render the media content
//       return (
//         <ImageList rowHeight={350} cols={3} gap={8}>
//           {MediaURLs.split(",").map((url, index) => (
//             <ImageListItem key={index} onClick={() => handleImageClick(url)}>
//               <img src={url.trim()} alt={`Image ${index}`} style={imageSize} />
//             </ImageListItem>
//           ))}
//         </ImageList>
//       );
//     } else {
//       // If no media content, render a placeholder or message
//       return null;
//     }
//   };

//   return (
//     <div className={"post"}>
//       <Stack direction="column" spacing={1} className={"EachSinglePost"}>
//         <div className={"postHeader"}>
//           <Stack direction="row" spacing={3} className={"post-info"}>
//             {Avatars ? (
//               <Avatar
//                 alt="Avatar"
//                 src={Avatars}
//                 className="avatar"
//                 style={{ width: "50px", height: "50px" }}
//               />
//             ) : (
//               <Avatar
//                 className="avatar"
//                 style={{ width: "50px", height: "50px" }}
//               >
//                 {AuthorUsername && getInitials(AuthorUsername)}
//               </Avatar>
//             )}
//             <Stack direction="column" spacing={0.3} className={"poster-info"}>
//               {/*<label className={"username"}>{post.username}</label>*/}
//               {/*<label className={"postTime"}>{moment(post.timeStamp).fromNow()}</label>*/}
//               <label className={"username"}>{AuthorUsername}</label>
//               <label className={"postTime"}>{moment(PostDate).fromNow()}</label>
//             </Stack>
//           </Stack>
//         </div>

//         <div className={"post-content"}>
//           {/*<label className={"captions"}>{post.caption}</label>*/}
//           {/*/!* Conditional rendering of images *!/*/}
//           {/*{post.images && post.images.length > 0 && (*/}
//           {/*    <ImageList rowHeight={350} cols={3} gap={8}>*/}
//           {/*        {post.images.map((image, index) => (*/}
//           {/*            <ImageListItem key={index} onClick={() => handleImageClick(image)}>*/}
//           {/*                <img src={image.url} alt={image.alt} style={imageSize} />*/}
//           {/*            </ImageListItem>*/}
//           {/*        ))}*/}
//           {/*    </ImageList>*/}
//           {/*)}*/}
//           <label className={"captions"}>{Content}</label>
//           {/*{MediaURLs && MediaURLs.length > 0 && (*/}
//           {/*    <ImageList rowHeight={350} cols={3} gap={8}>*/}
//           {/*        {MediaURLs.split(',').map((url, index) => (*/}
//           {/*            <ImageListItem key={index} onClick={() => handleImageClick(url)}>*/}
//           {/*                <img src={url.trim()} alt={`Image ${index}`} style={imageSize} />*/}
//           {/*            </ImageListItem>*/}
//           {/*        ))}*/}
//           {/*    </ImageList>*/}
//           {/*)}*/}
//           {renderMediaContent()}
//         </div>

//         <Stack
//           direction="row"
//           spacing={2}
//           justifyContent="space-between"
//           className={"postActions"}
//         >
//           <form>
//             <input
//               className={"commentBox"}
//               type="text"
//               placeholder={"Say Something...."}
//               // value={comment}
//               // onChange={handleChange}
//             />
//           </form>

//           <Stack direction="row" spacing={2} className={"buttonsAction"}>
//             <button
//               className={"buttonInteraction"}
//               onClick={handleCommentClick}
//               type="submit"
//             >
//               <FaRegComment size={15} /> Comments
//             </button>
//             <button
//               className={"buttonInteraction"}
//               onClick={() => onLike(post.id)}
//             >
//               <CiHeart size={23} />
//             </button>
//             <button
//               className={"buttonInteraction"}
//               onClick={() => onStar(post.id)}
//             >
//               <CiStar size={23} />
//             </button>
//           </Stack>

//           <Modal
//             open={openModal}
//             onClose={handleCloseModal}
//             onClick={handleModalClosing}
//             onKeyDown={handleKeyDown}
//           >
//             <div className="modalContent">
//               <img
//                 src={selectedImage?.url}
//                 alt={selectedImage?.alt}
//                 className="modalImage"
//                 style={{ maxWidth: "100%", maxHeight: "100%" }}
//               />
//             </div>
//           </Modal>
//         </Stack>
//       </Stack>
//     </div>
//   );
// };

// export default Post;

//Post.js
import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { FaHeart, FaComment, FaStar,FaRegComment } from 'react-icons/fa';
import { GiHearts } from "react-icons/gi";
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import './Post.css';
import Stack from '@mui/material/Stack';
import { CiHeart,CiStar } from "react-icons/ci";
import Button from '@mui/material/Button';
import { ImageList, ImageListItem, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Dman from '../images/Dman.jpg';
// import Aman from '../images/Aman.jpg';
// import Bman from '../images/bMan.jpg';
// import Cman from '../images/Cman.jpg';
// import veg1 from '../images/veg1.jpg';
import veg2 from './images/veg2.jpg';
// import veg3 from '../images/veg3.jpg';
// import veg4 from '../images/veg4.jpg';
// import veg5 from '../images/veg5.jpg';
// import { Modal as BaseModal } from '@mui/base/Modal';
// import Fade from '@mui/material/Fade';

const buttonStyle = {
    height: '40px',
    width: '125px',
    mb: '5px',
    pl:'15px',
    color: '#8BA766',
    "&:hover": {
        bgcolor: "#8BA766",
        opacity: '70%',
        color: '#495D44'
    },
};

const Post = ({ post, onLike, onComment }) => {
    const [openComment, setOpenComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const handleCloseComment = () => setOpenComment(false);
    const navigate = useNavigate();
    const { AuthorUsername, PostDate, Content, MediaTypes, MediaURLs, Avatars } = post; // Adjust property names here
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const imageSize = {
        width: '100%', // Set the width to 100% to fill the ImageListItem
        height: '50px', // Let the height adjust based on the aspect ratio
        objectFit: 'cover'
    };
    // Open modal and set selected image when image is clicked

    const fetchLikes = async () => {
        try {
            const response = await axios.get("http://localhost:5050/Likes");
            const likedPostIds = response.data.data.map(like => like.PostID);
            setIsLiked(likedPostIds.includes(post.PostID));
            console.log("liked post: ", response.data.data)
            console.log("liked postID", likedPostIds)
            console.log("Current post ID:", post.PostID)
            console.log("Is liked:", likedPostIds.includes(post.PostID));

        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    useEffect(() =>{
        fetchLikes();
    },[post]); // Fetch likes whenever the post prop changes

    const handleOnLike = async () =>{
        console.log("current post clicked: ", post.PostID);
        try{
            if (isLiked){
                const response = await axios.delete(`http://localhost:5050/Unlikes/${post.PostID}`);
                setIsLiked(false);
                fetchLikes();
                console.log("unlike post: ", response.data.data)
                // console.log("liked postID", likedPostIds)
                console.log("Current post ID:", post.PostID)
                // console.log("Is liked:", likedPostIds.includes(post.PostID));
            }else{
                const response = await axios.put(`http://localhost:5050/SetLikes/${post.PostID}`);
                setIsLiked(true);
                fetchLikes();
                console.log("like post: ", response.data.data);
                console.log("Current postID", post.PostID);
            }
        }catch (error){
            console.error("Errror unliking posts:", error);
        }
    }

    const handleOpenComment = (PostID) => {
        setOpenComment(true);
        console.log(`Button clicked with id: ${PostID}`);
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    const getInitials = (name) => {
        const words = name.split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        } else {
            return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
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

    useEffect(()=> {
        console.log("Post id:",post.PostID);
    }, []);

    // Function to render media content (images/videos)
    const renderMediaContent = () => {
        if (MediaURLs && MediaURLs.length > 0) {
            // If media URLs exist, render the media content
            return (
                <ImageList rowHeight={350} cols={3} gap={8}>
                    {MediaURLs && MediaURLs.split(',').map((url, index) => (
                        <ImageListItem key={index} onClick={() => handleImageClick(url)}>
                            <img src={url.trim()} alt={`Image ${index}`} style={imageSize} />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
        } else {
            // If no media content, render a placeholder or message
            return ;
        }
    };
    // console.log("splited url: ", MediaURLs.split(','));
    console.log("avatar current: " + post.Avatars);
    return (
    <div className={"post"}>
        <Stack direction="column" spacing={1} className={"EachSinglePost"} >
            <div className={"postHeader"}>
                <Stack direction="row" spacing={3} className={"post-info"}>
                    {Avatars ? (
                        <Avatar alt="Avatar" src={Avatars} className="avatar" style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <Avatar className="avatar" style={{ width: '50px', height: '50px' }}>
                            {AuthorUsername && getInitials(AuthorUsername)}
                        </Avatar>
                    )}
                    <Stack direction="column" spacing={0.3} className={"poster-info"}>
                        <label className={"username"}>{AuthorUsername}</label>
                        <label className={"postTime"}>{moment(PostDate).fromNow()}</label>
                    </Stack>
                </Stack>
            </div>

            <div className={"post-content"}>
                <label className={"captions"}>{Content}</label>
                {renderMediaContent()}
            </div>

                <Stack direction="column" spacing={2} justifyContent="space-between" className={"postActions"}>
                    <Stack direction="row" spacing={2} className={"buttonsAction"} justifyContent="flex-end"  alignItems="center">
                        <Button className={"buttonInteraction"}
                                sx={buttonStyle}
                                type="submit"
                                onClick={handleOpenComment}
                                startIcon={<FaRegComment size={15} sx={{padding: '2px'}}/>}
                            >Comments </Button>
                        <Button className={"buttonInteraction"}
                                sx={{
                                    height: '40px',
                                    width: '10px',
                                    pl:'15px',
                                    color: '#8BA766',
                                    "&:hover": {
                                        bgcolor: "#8BA766",
                                        opacity: '70%',
                                        color: '#495D44'
                                    },
                                }}
                                startIcon={isLiked ? <GiHearts size={20} /> : <CiHeart size={25} />}
                                onClick={handleOnLike}
                        >
                        </Button>
                    </Stack>

                    <Modal open={openModal} onClose={handleCloseModal} onClick={handleModalClosing} onKeyDown={handleKeyDown}>
                        <div className="modalContent">
                            <img
                                src={selectedImage?.url}
                                alt={selectedImage?.alt}
                                className="modalImage"
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </div>
                    </Modal>
                    <Modal
                        open={openComment}
                        onClose={handleCloseComment}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style }}>
                            <Comment post={post.PostID}/>
                        </Box>
                    </Modal>
                </Stack>
            </Stack>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    borderRadius:5,
    boxShadow: 24,
    overflowY: 'auto',
    mt:1,
};

export default Post;
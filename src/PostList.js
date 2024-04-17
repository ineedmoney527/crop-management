// //PostList.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Post from "./Post.js";
// import { useNavigate } from "react-router-dom";
// // import addIcon from "../images/Add.png";
// import "./Post.css";
// import {
//   Stack,
//   Grid,
//   Drawer,
//   Toolbar,
//   List,
//   Divider,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import {
//   MoveToInbox as InboxIcon,
//   Mail as MailIcon,
// } from "@mui/icons-material";
// console.log("Type of posts:", typeof posts);

// function PostList() {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/api/vision");
//       console.log("Response data:", response.data);
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleAddClick = () => {
//     navigate("/AddNewPost");
//     // navigate('/MarketStore');
//   };

//   const [searchValue, setSearchValue] = useState("");
//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     // if (searchValue.toLowerCase() === 'farm') {
//     navigate("/SearchPostList");
//     // }
//   };

//   const drawerWidth = 240;

//   return (
//     <Stack direction="row" spacing={2} className={"containerPostUnder"}>
//       <Drawer
//         className="sidebarPost"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Stack
//         direction="column"
//         spacing={2}
//         sx={{ backgroundColor: "#F7F8F9", height: "100%", width: "100%" }}
//         className={"IndividualPostContent"}
//       >
//         <div className={"headerPostPage"}>
//           <Grid
//             container
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Stack direction="row" spacing={2} alignItems="center">
//               <input
//                 className={"searchBox"}
//                 type={"text"}
//                 placeholder={"Search keywords"}
//                 value={searchValue}
//                 onChange={handleInputChange}
//               />
//               <button className="searchBtn" onClick={handleSearchSubmit}>
//                 Search
//               </button>
//             </Stack>
//             <button className={"addPost"} onClick={handleAddClick}>
//               <img src={""} alt={"Add New Post"} className={"addNewBtn"} />
//             </button>
//           </Grid>
//         </div>

//         <Stack direction="column" spacing={3}>
//           <div>
//             {posts &&
//               posts.map((post) => (
//                 <Post
//                   key={post.PostID}
//                   post={post}
//                   onComment={() => {
//                     console.log("haha");
//                   }}
//                   onLike={() => {
//                     console.log("haha");
//                   }}
//                   onStar={() => {
//                     console.log("haha");
//                   }}
//                 />
//               ))}
//           </div>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// }

// // export default PostList;

// function WithNavigate(props) {
//   let navigate = useNavigate();
//   return <PostList {...props} navigate={navigate} />;
// }

// export default WithNavigate;

//PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import addIcon from './images/Add.png';
import './Post.css';
import { Stack, Grid,TextField, Drawer, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

console.log("Type of posts:", typeof posts);

function PostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5050/Forum");
            console.log("Response data:", response.data);
            const sortedPosts = response.data.sort((a, b) => new Date(b.PostDate) - new Date(a.PostDate));
            setPosts(sortedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        console.log(JSON.stringify( posts));
    }, []);

    const handleAddClick = () => {
        navigate('/AddNewPost');
    }

    const [searchValue, setSearchValue] = useState('');
    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = () => {
        // if (searchValue.toLowerCase() === 'farm') {
            navigate('/SearchPostList');
        // }
    };

    return (
            <Stack direction="row" spacing={2} className={"containerPostUnder"}>
                <Stack direction="column" spacing={2} sx={{ backgroundColor: '#F7F8F9', height: '100%', width:'100%' }}  className={"IndividualPostContent"}>
                    <div className={"headerPostPage"}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={2} alignItems="center" sx={{m:'10px'}}>
                                <form>
                                    <input
                                        className={"searchBox-user"}
                                        variant={"outlined"}
                                        type={"text"}
                                        placeholder={"Search user"}
                                        value={searchValue}
                                        onChange={handleInputChange}
                                    />
                                </form>
                                <button className="searchBtn" onClick={handleSearchSubmit}>Search</button>
                            </Stack>
                         <button className={"addPost"} onClick={handleAddClick}>
                                <img src={addIcon} alt={"Add New Post"} className={"addNewBtn"}/>
                            </button>
                        </Grid>
                    </div>

                    <Stack direction="column" spacing={3}>
                        <div>
                            {posts && posts.map(post => {
                                console.log("Post object:", post);
                                return <Post key={post.PostID} post={post} />;
                            })}
                        </div>

                    </Stack>
                </Stack>

            </Stack>
    );
}

// export default PostList;

function WithNavigate(props){
    let navigate = useNavigate();
    return <PostList {...props} navigate={navigate}/>
}

export default WithNavigate;
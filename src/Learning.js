// import React from "react";
// import "./Learning.css";
// import { useNavigate } from "react-router-dom";
// import { Stack } from "@mui/material";
// const Learning = () => {
//   const navigate = useNavigate();
//
//   const handleChapterClick = () => {
//     navigate("/Learning2");
//   };
//
//   const handleAIClick = () => {
//     navigate("/");
//   };
//   const handleLearningClick = () => {
//     navigate("/Encyclopedia");
//   };
//
//   return (
//     <div style={{display:'flex',flexDirection:'row'}}>
//       <Stack style={{width:'250px',minHeight:'100vh',backgroundColor:'#EEEEEE',display:'flex',flexDirection:'column',paddingTop:'50px',alignItems:'center',}}>
//         <button
//           className="sidebar-button"
//           onClick={() => navigate("/Encyclopedia")}
//         >
//           {" "}
//           Encyclopedia
//         </button>
//         <button className="sidebar-button active">Learning</button>
//       </Stack>
//       {/* <div className={"chat_sidebar"}>
//         <div className={"chat-sidebar-box"}>
//           <button className={"sidebar-button"}>AI Tools</button>
//           <button className={"sidebar-button"} onClick={handleLearningClick}>
//             Learning
//           </button>
//         </div>
//       </div> */}
//       <div className="chat-messages">
//         <div className="title">
//           <p>Crop Management Lectures</p>
//         </div>
//         {/*<label className={"message-sent-label"}>Popular Questions</label>*/}
//         <div className={"learning-column"}>
//           <div className={"learning-column-1"}>
//             <label className={"button-name"}>Chapter 1</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Introduction Video
//             </button>
//             <label className={"button-name"}>Chapter 3</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Crop Preparation
//             </button>
//             <label className={"button-name"}>Chapter 5</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Knowledge of Crops
//             </button>
//           </div>
//           <div className={"learning-column-2"}>
//             <label className={"button-name"}>Chapter 2</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Soil Preparation
//             </button>
//             <label className={"button-name"}>Chapter 4</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Tools Preparation
//             </button>
//             <label className={"button-name"}>Chapter 6</label>
//             <button className={"learning-button"} onClick={handleChapterClick}>
//               Pest Management
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Learning;

import React, { useState } from "react";
import "./Learning.css";
import { useNavigate } from "react-router-dom";
// import cover1 from "./images/cover1.jpeg";
import { Stack } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Sidebar from "./sidebar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
// import AppBar from "@mui/material/AppBar";

const TitlebarImageList = ({ handleChapterClick }) => {
  return (
    <ImageList sx={{ width: "100%", height: "auto" }}>
      <ImageListItem key="Subheader" cols={2}></ImageListItem>
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{ margin: "10px", borderRadius: "10px" }}
        >
          <img
            src={item.img}
            alt={item.title}
            style={{ borderRadius: "10px" }}
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChapterClick()} // This will navigate to the "/Learning2" route
                startIcon={<ArrowForwardIcon style={{ marginLeft: "10px" }} />}
                children={null} // Setting children to null to remove the text
                style={{
                  width: "26px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              />
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const itemData = [
  {
    img: "https://plus.unsplash.com/premium_photo-1667520084376-472f06c21406?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Chapter 1",
    author: "Introduction",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://media.istockphoto.com/id/1308079744/photo/robot-is-working-in-greenhouse-with-tomatoes-smart-farming-and-digital-agriculture-4-0.jpg?s=1024x1024&w=is&k=20&c=qPNvEsYJJwurETnC_S4dZjn44t-WiuPbvlqqttwKItw=",
    title: "Chapter2",
    author: "Crop Preparation",
  },
  {
    img: "https://images.unsplash.com/photo-1523301551780-cd17359a95d0?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Chapter3",
    author: "Knowledge of Crops",
  },
  {
    img: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Chapter4",
    author: "Tools Preparation",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Chapter5",
    author: "Soil Preparation",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Honey",
    author: "Pest Management",
    rows: 2,
    cols: 2,
    featured: true,
  },
];

// export default TitlebarImageList;

const Learning = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChapterClick = () => {
    navigate("/Learning2");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Stack
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#EEEEEE",
          display: "flex",
          flexDirection: "column",
          paddingTop: "50px",
          alignItems: "center",
        }}
      >
        <button className="sidebar-button active">Learning</button>
        <button
          className="sidebar-button"
          onClick={() => navigate("/Encyclopedia")}
        >
          Encyclopedia
        </button>
      </Stack>
      {/*<Sidebar*/}
      {/*    toggleDrawer={toggleDrawer}*/}
      {/*    open={open}*/}
      {/*/>*/}
      {/*<AppBar*/}
      {/*    position="static"*/}
      {/*    sx={{*/}
      {/*      background: 'linear-gradient(to right, #F8F5EE, #D9DAD3)',width:'100%'*/}
      {/*    }}*/}
      {/*>*/}
      {/*  <Toolbar sx={{width:'100%'}}>*/}
      {/*    <IconButton*/}
      {/*        size="large"*/}
      {/*        edge="start"*/}
      {/*        color="inherit"*/}
      {/*        aria-label="menu"*/}
      {/*        onClick={toggleDrawer(true)}*/}
      {/*        style={{color:'#495D44'}}*/}
      {/*    >*/}
      {/*      <MenuIcon/>*/}
      {/*    </IconButton>*/}
      {/*    <Typography*/}
      {/*        variant="h6"*/}
      {/*        component="div"*/}
      {/*        sx={{fontWeight: "bold", width:'30%',color:'#495D44',fontSize:'30px',fontFamily:'Timenewsroman'}}*/}
      {/*    >*/}
      {/*      Tutorials*/}
      {/*    </Typography>*/}
      {/*  </Toolbar>*/}
      {/*</AppBar>*/}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/*<div style={{fontSize: '35px', fontWeight: 'bold', fontFamily: 'TimeNewsRoman',textAlign:'center'}}>Crop Management Tutorials*/}
        {/*</div>*/}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%", height: "auto" }}>
            <TitlebarImageList handleChapterClick={handleChapterClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;



import React, {useState} from 'react';
import './Learning2.css';
import {useNavigate} from 'react-router-dom';
import lesson from './images/Lesson.png';
import quiz from './images/Quiz.png'
import time from './images/Time.png';
// import Sidebar from "./sidebar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
// import AppBar from "@mui/material/AppBar";


const Learning2 = ({progress}) => {
  const [open, setOpen] = useState(false);


  const navigate = useNavigate();

  const handleLessonClick = () => {
    navigate('../Learning3');
  };

  const handleAIClick = () => {
    navigate('/');
  };
  const handleLearningClick = () => {
    navigate('Learning');
  };

  const handleGamificationClick = () => {
    navigate("../Gamification");
  }

  const handleQuizClick = () => {
    navigate('/Quiz');
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  return (
      <div style={{display:'flex',flexDirection:'column'}}>
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
        <div className="chat-messages" >
          <div className="L2-title">
            <p>Chapter 3 Overview: Tools Preparation</p>
          </div>
          <div className={"L2-learning-column"} style={{width:'90%',paddingLeft:'5%'}}>
            <img
                src={'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt={"image"} style={{width: '60%', height: '60vh'}}/>
            <div className={"L2-learning-column-2"}>

              <div className="progress-bar-container" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <label style={{fontSize: '18px',width:'170px',justifyContent:'center'}}>Chapter Progress</label>
                <progress value={30} max="100"
                          style={{width:"150px",height:'17px',marginRight:'5px',alignItems:'center'}}></progress>
                <label style={{fontSize:'20px'}}>30%</label>
              </div>
              <div className={"L2-learning-column-2-label"}>
                <img src={lesson} alt={"lesson"} className={"L2-learning-column-2-icon"}/>
                <label style={{fontSize:'18px'}}>10 lessons</label>
              </div>
              <div className={"L2-learning-column-2-label"}>
                <img src={quiz} alt={"quiz"} className={"L2-learning-column-2-icon"}/>
                <label style={{fontSize:'18px'}}>2 quizzes</label>
              </div>
              <div className={"L2-learning-column-2-label"}>
                <img src={time} alt={"time"} className={"L2-learning-column-2-icon"}/>
                <label style={{fontSize:'18px'}}>2 hours of learning</label>
              </div>
              <div style={{marginTop:'50px'}}>
                <button style={{width:'150px',height:'30px', color: 'white',
                  backgroundColor:'darkseagreen',
                  borderRadius: '5px',
                  borderColor: 'transparent',
                  cursor: 'pointer',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 2)',
                  fontSize:'15px'
                }}
                        onClick={handleLessonClick}
                >start</button>
              </div>
            </div>
          </div>
          <div className={"L2-Lessons"}>
            <label style={{fontWeight: "bold", fontSize: "27px",color:'black'}}>Content</label>
            <div className={"L2-Lessons-Title"}>
              <label className={"L2-Lessons-Title-Label"}>3.1 Introduction to tools</label>
              <button className={"L2-Lessons-Title-button"} onClick={handleLessonClick}>Start</button>
            </div>
            <div className="line"></div>

            <div className={"L2-Lessons-Title"}>
              <label className={"L2-Lessons-Title-Label"}>3.2 Preparation of tools</label>
            </div>
            <div className={"L2-Lessons-Column"}>
              <div className={"L2-Lessons-small-title"}>
                <label className={"L2-Lessons-small-title-Label"}>3.2.1 Tools Maintenance</label>
                <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start
                </button>
              </div>
              <div className={"L2-Lessons-small-title"}>
                <label className={"L2-Lessons-small-title-Label"}>3.2.2 Tools Selection</label>
                <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start
                </button>
              </div>
              <div className={"L2-Lessons-small-title"}>
                <label className={"L2-Lessons-small-title-Label"}>3.2.3 Tools Safety</label>
                <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start
                </button>
              </div>
            </div>
            <div className="line"></div>

            <div className={"L2-Lessons-Title"}>
              <label className={"L2-Lessons-Title-Label"}>3.3 Tools Practical</label>
            </div>
            <div className={"L2-Lessons-small-title"}>
              <label className={"L2-Lessons-small-title-Label"}>3.3.1 balabala</label>
              <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start</button>
            </div>
            <div className={"L2-Lessons-small-title"}>
              <label className={"L2-Lessons-small-title-Label"}>3.3.2 quiz</label>
              <button className={"L2-Lessons-quiz-button"}  onClick={handleQuizClick}>Go</button>
            </div>
          </div>

        </div>
      </div>
  );
};

export default Learning2;

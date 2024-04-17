import React, { useState, useEffect } from "react";
import "./Gamification.css";
import "./Graph";
import jessi from "./images/jessi.jpg";
// import badges from './images/badges-icon-1.png';
// import badges2 from './images/badges-icon-2.png';
// import badges3 from './images/badges-icon-3.png';
// import badges4 from './images/badges-icon-4.png';
// import badges from './images/badges1.png';
// import badges2 from './images/badges2.png';
// import badges3 from './images/badges3.png';
// import badges4 from './images/badges4.png';
import icon from "./images/ion_person-circle-sharp.png";
import LockIcon from "@mui/icons-material/Lock";
// import Sidebar from "./SideBar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import crown from './images/crown.png';
// import silver from './images/silver.png';
// import bronze from './images/bronze.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Line } from "react-chartjs-2";
import Graph from "./Graph";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
// import ReactApexChart from 'react-apexcharts';

const Gamification = () => {
  const [showAllGoals, setShowAllGoals] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [gamificationData, setGamificationData] = useState([]);
  const [userAchievement, setUserAchievement] = useState([]);
  const [badgeLocks, setBadgeLocks] = useState([true, true, true, true]); // Initial lock state for badges
  const sortedGamificationData = [...gamificationData].sort(
    (a, b) => a.ranking - b.ranking
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/2")
      .then((response) => {
        setUserData(response.data); // Update state with fetched user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get("http://localhost:8000/api/userAchievement/2")
      .then((response) => {
        setUserAchievement(response.data); // Update state with fetched user data
        updateBadgeLocks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get("http://localhost:8000/api/gamification")
      .then((response) => {
        // Check if the data has changed
        if (
          JSON.stringify(response.data) !== JSON.stringify(gamificationData)
        ) {
          setGamificationData(response.data); // Update state with fetched data
        }
      })
      .catch((error) => {
        console.error("Error fetching gamification data:", error);
      });

    // Fetch gamification data from the backend API
    // axios.get('http://localhost:5000/api/gamification')
    //     .then(response => {
    //         setGamificationData(response.data); // Update state with fetched data
    //     })
    //     .catch(error => {
    //         console.error('Error fetching gamification data:', error);
    //     });
  }, []); // Run once on component mount

  const updateBadgeLocks = (achievementData) => {
    const updatedLocks = [...badgeLocks]; // Create a copy of the badge locks state
    // Check if the user has achieved the goals for each badge and update the locks accordingly
    if (achievementData.quiz_completed >= 10) {
      updatedLocks[0] = false; // Unlock first badge
    }
    if (achievementData.lecture_hours >= 10) {
      updatedLocks[1] = false; // Unlock second badge
    }
    if (achievementData.projects_completed >= 5) {
      updatedLocks[2] = false; // Unlock third badge
    }
    if (achievementData.crops_planted >= 6) {
      updatedLocks[3] = false; // Unlock fourth badge
    }
    setBadgeLocks(updatedLocks); // Update badge locks state
  };

  const handleBadgeClaim = (index) => {
    console.log(`Badge ${index + 1} claimed!`);
    const updatedLocks = [...badgeLocks];
    updatedLocks[index] = false; // Set the lock status of the claimed badge to false
    // Update badge locks state
    // {badgeLocks[badge.index] ? ( // Render lock icon only if badge is locked
    setBadgeLocks(updatedLocks);
    // ) : null}
  };

  // Render badge items
  // Inside the renderBadgeItems function
  // const renderBadgeItems = () => {
  //     return [
  //         { image: badges, title: "Quizzes badge", index: 0 },
  //         { image: badges2, title: "Learning hours badge", index: 1 },
  //         { image: badges3, title: "Project badge", index: 2 },
  //         { image: badges4, title: "Plant badge", index: 3 }
  //     ].map((badge, index) => (
  //         <div key={index} className={"badge-item"}>
  //             <div className="badge-container">
  //                 <img src={badge.image} alt={"badge"} className="badge-image"/>
  //                 {badgeLocks[badge.index]  || !badgeLocks[badge.index]? ( // Render lock icon only if badge is locked
  //                     <LockIcon className="lock-icon" style={{width: '65px', height: '65px'}}/>
  //                 ) : null}
  //             </div>
  //             <div className={"badge-title"}>
  //                 <label>{badge.title}</label>
  //                 {!badgeLocks[badge.index] ? ( // Check if badge is unlocked
  //                     <button onClick={() => handleBadgeClaim(badge.index)}>Claim</button>
  //                 ) : null}
  //
  //             </div>
  //         </div>
  //     ));
  // };

  const renderBadgeItems = () => {
    return [
      { image: "/images/badges1.png", title: "Quizzes badge", index: 0 },
      { image: "/images/badges2.png", title: "Learning hours badge", index: 1 },
      { image: "/images/badges3.png", title: "Project badge", index: 2 },
      { image: "/images/badges4.png", title: "Plant badge", index: 3 },
    ].map((badge, index) => (
      <div key={index} className={"badge-item"}>
        <div
          className="badge-container"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <img src={badge.image} alt={"badge"} className="badge-image" />
          {badgeLocks[badge.index] ? ( // Render lock icon only if badge is locked
            <LockIcon
              className="lock-icon"
              style={{
                width: "45px",
                height: "45px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <label style={{ width: "170px", fontSize: "16px" }}>
            {badge.title}
          </label>
          {/*{badgeLocks[badge.index] ? ( // Check if badge is locked*/}
          {/*    <button onClick={() => handleBadgeClaim(badge.index)} style={{width:'45px',height:'35px',backgroundColor:'#F8F5EE',color:'#495D44',border:'none',borderRadius:'5px',boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)',cursor:'pointer' }}>Claim</button>*/}
          {/*) : null}*/}
        </div>
      </div>
    ));
  };

  const toggleView = () => {
    setShowAllGoals(!showAllGoals);
  };

  const goalsData = [
    { image: "/images/badges1.png", title: "Quizzes badge" },
    { image: "/images/badges2.png", title: "Learning hours badge" },
    { image: "/images/badges3.png", title: "Project badge" },
    { image: "/images/badges4.png", title: "Plant badge" },
  ];

  const renderGoalItems = () => {
    return goalsData.map((goal, index) => (
      <div key={index} className={"goal-1-info"}>
        <img src={goal.image} alt={"badges"} className={"goal-1-info-icon"} />
        <div className={"goal-1-info-title"}>
          <label>{goal.title}</label>
        </div>
      </div>
    ));
  };

  const handleLearningClick = () => {
    navigate("../Learning");
  };

  const handleAIClick = () => {
    navigate("/");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [open, setOpen] = useState(false);

  // background:'linear-gradient(to bottom, #F8F5EE, #D9DAD3)'

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
      {/*      Gamification*/}
      {/*    </Typography>*/}
      {/*  </Toolbar>*/}
      {/*</AppBar>*/}
      {/*<label className={"gamification-content-title"}*/}
      {/*       style={{fontFamily: 'Josefin Sans', color: '#495D44'}}>Gamification</label>*/}
      <div
        style={{
          // backgroundColor:'#04071C',
          // backgroundColor: '#013668',
          // backgroundColor:'#8BA766',

          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          // marginLeft:'auto',marginRight:'auto',
          // justifyContent:'center'
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            marginLeft: "30px",
          }}
        >
          <div
            className={"gamification-content"}
            style={{ marginRight: "20px", height: "300px" }}
          >
            {userData && (
              <div
                className={"personal"}
                style={{
                  // border: "1px solid #495D44",
                  width: "93%",
                  height: "230px",
                  // paddingLeft: '20px',
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  // backgroundColor:'#F3F3F3',
                  // justifyContent:'center',
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)",
                  backgroundColor: "white",
                  // backgroundColor:'red'
                  paddingLeft: "20px",
                }}
              >
                <div className={"personal-icon"}>
                  <img src={jessi} alt={"icon"} className={"personal-icon"} />
                </div>
                <div className={"personal-information"}>
                  <div
                    className={"personal-information-group"}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <label
                      className={"personal-information-label"}
                      style={{
                        width: "150px",
                        textAlign: "left",
                        paddingRight: "10px",
                      }}
                    >
                      Username:
                    </label>
                    <label
                      className={"personal-information-value"}
                      style={{ textAlign: "left" }}
                    >
                      {userData.Username}
                    </label>
                  </div>
                  <div
                    className={"personal-information-group"}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <label
                      className={"personal-information-label"}
                      style={{
                        width: "150px",
                        textAlign: "left",
                        paddingRight: "10px",
                      }}
                    >
                      Level:
                    </label>
                    <label
                      className={"personal-information-value"}
                      style={{ textAlign: "left" }}
                    >
                      {userData.level}
                    </label>
                  </div>
                  <div
                    className={"personal-information-group"}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <label
                      className={"personal-information-label"}
                      style={{ width: "150px" }}
                    >
                      Progress:
                    </label>
                    <progress
                      value={userData.level_progress}
                      max="100"
                      className={"level-progress"}
                    ></progress>
                    <label className={"personal-information-value"}>
                      {userData.level_progress}%
                    </label>
                  </div>
                  <div
                    className={"personal-information-group"}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <label
                      className={"personal-information-label"}
                      style={{ width: "150px" }}
                    >
                      Ranking:
                    </label>
                    <label className={"personal-information-value"}>
                      {userData.ranking}
                    </label>
                  </div>
                </div>

                <div
                  style={{
                    // backgroundColor: 'white',
                    borderRadius: "10px",
                    // boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)',
                    width: "300px",
                    height: "200px",
                    marginLeft: "auto",
                  }}
                >
                  <Graph />
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginRight: "40px",
                // border: '1px solid #364632',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "100px",
                width: "45%",
                height: "320px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
                flexDirection: "column",
                backgroundColor: "white",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "#495D44",
                }}
              >
                Activity Progress
              </label>
              {userAchievement && (
                // <div className={"current-accomplishment"}>
                <div className={"current-1"}>
                  <div className={"current-1-info"}>
                    {/*<img src={badges} alt={"badges"} className={"current-1-info-icon"}/>*/}
                    <div className={"current-1-info-column"}>
                      <div className={"current-1-info-title"}>
                        <label> Complete 10 quizzes </label>
                        <label> {userAchievement.quiz_completed}/10 </label>
                      </div>
                      <progress
                        value={userAchievement.quiz_completed}
                        max="10"
                      ></progress>
                    </div>
                    {!badgeLocks[0] ? ( // Check if badge is unlocked
                      <CheckCircleOutlineIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      // <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'auto',border:'none',height:'35px',backgroundColor:'#495D44',color:'#F8F5EE',marginLeft:'10px',borderRadius:'5px',boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)'}}>completed</button>
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'45px',height:'35px',backgroundColor:'#F8F5EE',color:'#495D44',cursor:'pointer'}}>completed</button>
                      <LockIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#F13535",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                      // <p style={{color:'#495D44',marginLeft:'10px'}}>Locked</p>
                    )}
                  </div>

                  <div className={"current-1-info"}>
                    {/*<img src={badges2} alt={"badges"} className={"current-1-info-icon"}/>*/}
                    <div className={"current-1-info-column"}>
                      <div className={"current-1-info-title"}>
                        <label> Complete 10 hours of learning </label>
                        <label> {userAchievement.lecture_hours}/10 </label>
                      </div>
                      <progress
                        value={userAchievement.lecture_hours}
                        max="10"
                      ></progress>
                    </div>
                    {!badgeLocks[1] ? ( // Check if badge is unlocked
                      <CheckCircleOutlineIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'auto',border:'none',height:'35px',backgroundColor:'#495D44',color:'#F8F5EE',marginLeft:'10px',borderRadius:'5px',boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)'}}>completed</button>
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'45px',height:'35px',backgroundColor:'#F8F5EE',color:'#495D44',cursor:'pointer'}}>completed</button>
                      <LockIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#F13535",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                      // <p style={{color:'#495D44',marginLeft:'10px'}}>Locked</p>
                    )}
                  </div>

                  <div className={"current-1-info"}>
                    {/*<img src={badges3} alt={"badges"} className={"current-1-info-icon"}/>*/}
                    <div className={"current-1-info-column"}>
                      <div className={"current-1-info-title"}>
                        <label> Complete 5 projects </label>
                        <label> {userAchievement.projects_completed}/5 </label>
                      </div>
                      <progress
                        value={userAchievement.projects_completed}
                        max="5"
                      ></progress>
                    </div>
                    {!badgeLocks[2] ? ( // Check if badge is unlocked
                      <CheckCircleOutlineIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'auto',border:'none',height:'35px',backgroundColor:'#495D44',color:'#F8F5EE',marginLeft:'10px',borderRadius:'5px',boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)'}}>completed</button>
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'45px',height:'35px',backgroundColor:'#F8F5EE',color:'#495D44',cursor:'pointer'}}>completed</button>
                      <LockIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#F13535",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                      // <p style={{color:'#495D44',marginLeft:'10px'}}>Locked</p>
                    )}
                  </div>

                  <div className={"current-1-info"}>
                    {/*<img src={badges4} alt={"badges"} className={"current-1-info-icon"}/>*/}
                    <div className={"current-1-info-column"}>
                      <div className={"current-1-info-title"}>
                        <label> Plant 6 crops </label>
                        <label> {userAchievement.crops_planted}/6 </label>
                      </div>
                      <progress
                        value={userAchievement.crops_planted}
                        max="6"
                      ></progress>
                    </div>
                    {!badgeLocks[3] ? ( // Check if badge is unlocked
                      <CheckCircleOutlineIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    ) : (
                      // <button onClick={() => handleBadgeClaim(0)} style={{width:'auto',border:'none',height:'35px',backgroundColor:'#495D44',color:'#F8F5EE',marginLeft:'10px',borderRadius:'5px',boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)'}}>completed</button>
                      <LockIcon
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#F13535",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                      // <p style={{color:'#495D44',marginLeft:'10px'}}>Locked</p>
                    )}

                    {/*)}*/}
                  </div>
                  {/*</div>*/}
                </div>
              )}
            </div>

            <div
              style={{
                width: "45%",
                height: "320px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                paddingLeft: "10px",
                overflowY: "auto",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "white",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "20px",
                  color: "#495D44",
                }}
              >
                Collected Badges
              </label>
              {renderBadgeItems()}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            marginLeft: "10px",
            height: "auto",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "100vh",
              overflowY: "auto",
              marginTop: "30px",
              marginBottom: "30px",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              style={{
                height: "30px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <label
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#495D44",
                }}
              >
                Ranking
              </label>
            </div>
            {/* Render gamification data */}
            {sortedGamificationData.map((data, index) => (
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  key={index}
                  style={{ width: "100%", borderRadius: "10px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "0 10px",
                    }}
                  >
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginRight: "10px",
                        color: "#495D44",
                      }}
                    >
                      {data.ranking}
                    </label>
                    <img
                      src={icon}
                      alt={"icon"}
                      style={{ width: "35px", height: "35px" }}
                    />
                    <label> {data.username}</label>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <label
                        style={{
                          marginLeft: "auto",
                          color: "#495D44",
                        }}
                      >
                        Level: {data.level}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;

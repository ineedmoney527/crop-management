

import React from 'react';
import './Learning2.css';
import {useNavigate} from 'react-router-dom';
import lesson from './images/Lesson.png';
import quiz from './images/Quiz.png'
import time from './images/Time.png';


const Learning2 = ({progress}) => {


    const navigate = useNavigate();

    const handleLessonClick = () => {
        navigate('Learning3');
    };

    const handleAIClick = () => {
        navigate('/');
    };
    const handleLearningClick = () => {
        navigate('Learning');
    };





    return (
        <div className="chat-container">
            <div className={"chat_sidebar"}>
                <div className={"chat-sidebar-box"}>
                    <button className={"sidebar-button"} onClick={handleAIClick}>AI Tools</button>
                    <button className={"sidebar-button"} onClick={handleLearningClick}>Learning</button>
                </div>
            </div>

            <div className="chat-messages">
                <div className="L2-title">
                    <p>Chapter 3 Overview: Tools Preparation</p>
                </div>
                <div className={"L2-learning-column"}>
                    <div className={"L2-learning-column-1"}>
                        <button className={"L2-learning-button"}>Introduction Video</button>
                    </div>
                    <div className={"L2-learning-column-2"}>
                        <label>Chapter Progress</label>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{width: `${progress}%`}}></div>
                        </div>
                        <div className={"L2-learning-column-2-label"}>
                            <img src={lesson} alt={"lesson"} className={"L2-learning-column-2-icon"}/>
                            <label>10 lessons</label>
                        </div>
                        <div className={"L2-learning-column-2-label"}>
                            <img src={quiz} alt={"quiz"} className={"L2-learning-column-2-icon"}/>
                            <label>2 quizzes</label>
                        </div>
                        <div className={"L2-learning-column-2-label"}>
                            <img src={time} alt={"time"} className={"L2-learning-column-2-icon"}/>
                            <label>2 hours of learning</label>
                        </div>
                    </div>
                </div>
                <div className={"L2-Lessons"}>
                    <label style={{fontWeight: "bold", fontSize: "20px"}}>Content</label>
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
                            <label className={"L2-Lessons-small-title-Label"}>3.2.1 balabala</label>
                            <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start</button>
                        </div>
                        <div className={"L2-Lessons-small-title"}>
                            <label className={"L2-Lessons-small-title-Label"}>3.2.2 balabala</label>
                            <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start</button>
                        </div>
                        <div className={"L2-Lessons-small-title"}>
                            <label className={"L2-Lessons-small-title-Label"}>3.2.3 balabala</label>
                            <button className={"L2-Lessons-Small-Title-button"} onClick={handleLessonClick}>Start</button>
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
                </div>

            </div>
        </div>
    );
};

export default Learning2;

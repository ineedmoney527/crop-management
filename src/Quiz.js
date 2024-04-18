// import React, { Component, useState } from "react";
// import Carousel from "react-spring-3d-carousel";
// import uuidv4 from "uuid";
// import { config } from "react-spring";
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import axios from 'axios'; // Import Axios library
//
// const Quiz = () => {
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [score, setScore] = useState(0);
//     const [quizEnded, setQuizEnded] = useState(false);
//
//     const handleCloseDialog = () => {
//         setCurrentQuestion(0);
//         setSelectedOption('');
//         setQuizEnded(false);
//
//         const updatedUserData = {
//             userId: 2,
//         };
//
//         // Use Axios to send a POST request to update quiz count
//         axios.post('http://localhost:5000/api/update-quiz-count', updatedUserData)
//             .then(response => {
//                 console.log('Quiz count updated successfully:', response.data);
//             })
//             .catch(error => {
//                 console.error('Error updating quiz count:', error);
//             });
//     };
//
//     const questions = [
//         {
//             question: 'What is the optimal pH range for most crops?',
//             options: ['5.5 - 6.5', '6.5 - 7.5', '7.0 - 8.0', '8.0 - 9.0'],
//             correctAnswer: '6.5 - 7.5'
//         },
//         {
//             question: 'Which nutrient is often deficient in sandy soils?',
//             options: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic matter'],
//             correctAnswer: 'Nitrogen'
//         },
//         {
//             question: 'What is a common symptom of iron deficiency in plants?',
//             options: ['Yellowing of leaves', 'Purple leaves', 'Wilting', 'Brown spots on leaves'],
//             correctAnswer: 'Yellowing of leaves'
//         },
//         // Add more questions as needed
//     ];
//
//     const handleOptionSelect = (option) => {
//         setSelectedOption(option);
//     };
//
//     const handleNextQuestion = () => {
//         if (selectedOption === questions[currentQuestion].correctAnswer) {
//             setScore(score + 1);
//         }
//
//         if (currentQuestion < questions.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//             setSelectedOption('');
//         } else {
//             setQuizEnded(true);
//         }
//     };
//
//     // Carousel Component
//     class Example extends Component {
//         state = {
//             goToSlide: 0,
//             offsetRadius: 2,
//             showNavigation: true,
//             config: config.gentle
//         };
//
//         slides = questions.map((question, index) => {
//             return {
//                 key: uuidv4(),
//                 content: (
//                     <div>
//                         <h2>{question.question}</h2>
//                         <ul>
//                             {question.options.map((option, i) => (
//                                 <li key={i}>{option}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ),
//                 onClick: () => this.setState({ goToSlide: index })
//             };
//         });
//
//         onChangeInput = (e) => {
//             this.setState({
//                 [e.target.name]: parseInt(e.target.value, 10) || 0
//             });
//         };
//
//         render() {
//             return (
//                 <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
//                     <Carousel
//                         slides={this.slides}
//                         goToSlide={this.state.goToSlide}
//                         offsetRadius={this.state.offsetRadius}
//                         showNavigation={this.state.showNavigation}
//                         animationConfig={this.state.config}
//                     />
//                     <div
//                         style={{
//                             margin: "0 auto",
//                             marginTop: "2rem",
//                             width: "50%",
//                             display: "flex",
//                             justifyContent: "space-around"
//                         }}
//                     >
//                         <div>
//                             <label>Go to slide: </label>
//                             <input name="goToSlide" onChange={this.onChangeInput} />
//                         </div>
//                         <div>
//                             <label>Offset Radius: </label>
//                             <input name="offsetRadius" onChange={this.onChangeInput} />
//                         </div>
//                         <div>
//                             <label>Show navigation: </label>
//                             <input
//                                 type="checkbox"
//                                 checked={this.state.showNavigation}
//                                 name="showNavigation"
//                                 onChange={e => {
//                                     this.setState({ showNavigation: e.target.checked });
//                                 }}
//                             />
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => {
//                                     this.setState({ config: config.gentle });
//                                 }}
//                                 disabled={this.state.config === config.gentle}
//                             >
//                                 Gentle Transition
//                             </button>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => {
//                                     this.setState({ config: config.slow });
//                                 }}
//                                 disabled={this.state.config === config.slow}
//                             >
//                                 Slow Transition
//                             </button>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => {
//                                     this.setState({ config: config.wobbly });
//                                 }}
//                                 disabled={this.state.config === config.wobbly}
//                             >
//                                 Wobbly Transition
//                             </button>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => {
//                                     this.setState({ config: config.stiff });
//                                 }}
//                                 disabled={this.state.config === config.stiff}
//                             >
//                                 Stiff Transition
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//     }
// }

import React, { useState } from "react";
import axios from 'axios';
import Example from "./example";
// import Button from '@mui/material/Button';
// import Sidebar from "./sidebar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
// import AppBar from "@mui/material/AppBar";


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);

    const handleCloseDialog = () => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setQuizEnded(false);

        const updatedUserData = {
            userId: 2,
        };

        axios.post('http://localhost:5000/api/update-quiz-count', updatedUserData)
            .then(response => {
                console.log('Quiz count updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating quiz count:', error);
            });
    };

    const questions = [
        // ... (same questions array)
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption('');
        } else {
            setQuizEnded(true);
        }
    };

    return (
        <div>
            {/* Quiz component JSX */}
        </div>
    );
};


const App = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <div style={{backgroundColor:'#E4E4E4'}}>
            <Example />
            <Quiz />
        </div>
    );
};

export default App;




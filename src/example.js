import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config as springConfig } from "react-spring";
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'; // Import axios
const questions = [
    {
            question: 'What is the optimal pH range for most crops?',
            options: ['5.5 - 6.5', '6.5 - 7.5', '7.0 - 8.0', '8.0 - 9.0'],
            correctAnswer: '6.5 - 7.5'
        },
        {
            question: 'Which nutrient is often deficient in sandy soils?',
            options: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic matter'],
            correctAnswer: 'Nitrogen'
        },
        {
            question: 'What is a common symptom of iron deficiency in plants?',
            options: ['Yellowing of leaves', 'Purple leaves', 'Wilting', 'Brown spots on leaves'],
            correctAnswer: 'Yellowing of leaves'
        },
];

const Example = () => {
    const [goToSlide, setGoToSlide] = useState(0);
    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showNavigation, setShowNavigation] = useState(true);
    const [config, setConfig] = useState(springConfig.gentle);
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(''));
    const [userScore, setUserScore] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOptionChange = (index, option) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[index] = option;
        setSelectedOptions(updatedSelectedOptions);
    };

    const handleEndQuiz = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedOptions[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setUserScore(correctAnswers);
        setOpenDialog(true); // Open dialog to show the score
    };

    const slides = questions.map((question, index) => {
        return {
            key: uuidv4(),
            content: (
                <div style={{
                    backgroundColor:'white',
                    borderRadius:'10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 2)',
                    paddingLeft:'20px',
                    height: '300px', // Fixed height
                    width: '450px', // Full width
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center content vertically
                }}>
                    <h2>{question.question}</h2>
                    <RadioGroup
                        value={selectedOptions[index]}
                        onChange={(e) => {
                            handleOptionChange(index, e.target.value);
                        }}
                    >
                        {question.options.map((option, i) => (
                            <FormControlLabel
                                key={i}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </div>
            ),
            onClick: () => setGoToSlide(index)
        };
    });

    const handleCloseDialog = () => {
        setSelectedOptions(Array(questions.length).fill('')); // Reset selected options
        setUserScore(0); // Reset user score
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

        setOpenDialog(false); // Close the dialog
    };

    return (
        <div style={{width: "auto", height: "400px", margin: "0 auto"}}>
            <style>
                {`
                    body {
                        background-color: #E4E4E4;
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
            <div style={{ backgroundColor: 'transparent', height: "100%", width: "100%" }}>
                <Carousel
                    slides={slides}
                    goToSlide={goToSlide}
                    offsetRadius={offsetRadius}
                    showNavigation={showNavigation}
                    animationConfig={config}
                />
                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEndQuiz}
                        style={{marginBottom: '100px'}}
                    >
                        End Quiz
                    </Button>
                </div>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Quiz Ended</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your Score: {userScore} out of {questions.length}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Example;

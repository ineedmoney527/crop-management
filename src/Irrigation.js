// IrrigationPage.js
import React, { useState, useEffect } from 'react';
import './irrigation.css'; // Import CSS file for styles
import {Box, Typography, Slider, Divider, Stack, Grid, Button, TextField, styled} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import WateringPointCheckboxes from './WateringPointCheckboxes';
import TimerSelection from './TimerSelection';
import Chip from '@mui/material/Chip';

// Function to determine color based on soil humidity level
function getHumidityColor(humidityLevel) {
    if (humidityLevel < 30) {
        return 'red'; // Low humidity color
    } else if (humidityLevel < 60) {
        return 'yellow'; // Moderate humidity color
    } else {
        return 'green'; // High humidity color
    }
}

const IrrigationPage = () => {
    const ButtonsThis = styled(Button)(({ theme }) => ({
        color: '#e8f5e9',
        backgroundColor: '#8BA766',
        '&:hover': {
            backgroundColor: '#9ccc65',
        }
    }));
    const [landInfo, setLandInfo] = useState({
        id: '1',
        name: 'Land A',
        cropType: 'Vegetables',
        cropVariety: 'Roma Tomatoes',
        soilHumidityLevel: 70,
        enabledStatus: true,
        wateringPoints: 40, // example watering points
        wateringLevels: {
            col1: 30,
            col2: 55,
            col3: 55,
            col4: 70,
            col5: 65,
        },
        durationHours: 0,
        durationMinutes: 15,
        durationSeconds: 30,
        selectedPoints: [], // initially empty array for selected points
        nextPatch: {
            startTime: '08:00 AM',
            durationHours: 1,
            durationMinutes: 0,
            durationSeconds: 0,
            repeatSetting: 'everyday', // options: never, every 2 days, everyday, every week
            status: true, // true for on, false for off
            startDate: '2024-04-01', // YYYY-MM-DD format
            endDate: '2024-06-30', // YYYY-MM-DD format
            wateringLevels: {
                col1: 10,
                col2: 25,
                col3: 90,
                col4: 30,
                col5: 85,
            },
            selectedPoints: [], // initially empty array for selected points in next patch
        },
    });
    const [remainingTime, setRemainingTime] = useState(
        landInfo.durationHours * 3600 + landInfo.durationMinutes * 60 + landInfo.durationSeconds
    );
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const defaultPercentage = 50; // Set your default percentage here
    const [enableStatus, setEnableStatus] = useState(true); // Default is true
    const [wateringLevels, setWateringLevels] = useState({ ...landInfo.wateringLevels });
    const [nextWateringLevels, setNextWateringLevels] = useState({ ...landInfo.nextPatch.wateringLevels });
    // State to track checkbox statuses
    const [checkboxes, setCheckboxes] = useState(Array.from({ length: landInfo.wateringPoints }, (_, index) => false));
    // Handler function to update checkboxes to all true
    const handleSelectAll = () => {
        setCheckboxes(Array.from({ length: landInfo.wateringPoints }, () => true));
    };
    const [nextPatchCheckboxes, setNextPatchCheckboxes] = useState(Array.from({ length: landInfo.wateringPoints }, () => false));
    const handleSelectAllNextPatch = () => {
        setNextPatchCheckboxes(Array.from({ length: landInfo.wateringPoints }, () => true));
    };

    const handleDurationChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = parseInt(value, 10); // Parse input value as integer

        // Check if the parsed value is a valid number
        if (!isNaN(parsedValue)) {
            // Validate and set limits based on the input field name
            switch (name) {
                case 'durationHours':
                    parsedValue = Math.max(0, Math.min(24, parsedValue)); // Limit hours between 0 and 24
                    break;
                case 'durationMinutes':
                case 'durationSeconds':
                    parsedValue = Math.max(0, Math.min(59, parsedValue)); // Limit minutes and seconds between 0 and 59
                    break;
                default:
                    break;
            }

            // Update the state with the validated value
            setLandInfo((prevSettings) => ({
                ...prevSettings,
                [name]: parsedValue,
            }));
        }
    };

    const DurationDisplay = ({ landInfo }) => {
        return (
            <div className="duration-display-container">
                <TextField
                    label="Duration Hours"
                    type="number"
                    name="durationHours"
                    value={landInfo.durationHours}
                    onChange={handleDurationChange} // Ensure this onChange is correctly handled in parent
                />
                <TextField
                    label="Duration Minutes"
                    type="number"
                    name="durationMinutes"
                    value={landInfo.durationMinutes}
                    onChange={handleDurationChange} // Ensure this onChange is correctly handled in parent
                />
                <TextField
                    label="Duration Seconds"
                    type="number"
                    name="durationSeconds"
                    value={landInfo.durationSeconds}
                    onChange={handleDurationChange} // Ensure this onChange is correctly handled in parent
                />
            </div>
        );
    };

    const handleWaterLevelChange = (column, newValue) => {
        setWateringLevels(prevLevels => ({
            ...prevLevels,
            [column]: newValue,
        }));
    };

    const handleNextWaterLevelChange = (column, newValue) => {
        setNextWateringLevels(prevLevels => ({
            ...prevLevels,
            [column]: newValue,
        }));
    };

    useEffect(() => {
        let timerInterval = null;
        const startCountdown = () => {
            timerInterval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerInterval);
                        return 0;
                    }
                    const newTime = prevTime - 1;
                    const elapsedSeconds =
                        landInfo.durationHours * 3600 +
                        landInfo.durationMinutes * 60 +
                        landInfo.durationSeconds -
                        newTime; // Calculate elapsed seconds
                    const percentage =
                        (elapsedSeconds /
                            (landInfo.durationHours * 3600 +
                                landInfo.durationMinutes * 60 +
                                landInfo.durationSeconds)) *
                        100; // Calculate completion percentage

                    setCompletionPercentage(percentage.toFixed(2));
                    return newTime;
                });
            }, 1000);
        };

        const resetCountdown = () => {
            clearInterval(timerInterval);
            setRemainingTime(
                landInfo.durationHours * 3600 +
                landInfo.durationMinutes * 60 +
                landInfo.durationSeconds
            ); // Set remaining time based on user-defined duration
            setCompletionPercentage(0); // Reset completion percentage
        };

        // Start or reset countdown based on enabled status
        if (landInfo.enabledStatus) {
            startCountdown();
        } else {
            resetCountdown();
        }

        // Clean up interval on component unmount or dependency changes
        return () => clearInterval(timerInterval);
    }, [
        landInfo.enabledStatus,
        landInfo.durationHours,
        landInfo.durationMinutes,
        landInfo.durationSeconds,
    ]);
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0'); // Ensure 2-digit format
        const formattedMins = String(mins).padStart(2, '0'); // Ensure 2-digit format
        const formattedSecs = String(secs).padStart(2, '0'); // Ensure 2-digit format
        return `${formattedHours}:${formattedMins}:${formattedSecs}`;
    };
    const formatDuration = (hours, minutes, seconds) => {
        const formattedHours = String(hours).padStart(2, '0'); // Ensure 2-digit format
        const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure 2-digit format
        const formattedSeconds = String(seconds).padStart(2, '0'); // Ensure 2-digit format
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    const handleToggle = () => {
        setLandInfo(prevInfo => ({
            ...prevInfo,
            enabledStatus: !prevInfo.enabledStatus,
        }));
    };
    const handleNextStatus = () => {
        setLandInfo((prevInfo) => ({
            ...prevInfo,
            nextPatch: {
                ...prevInfo.nextPatch,
                status: !prevInfo.nextPatch.status, // Toggle the status value
            },
        }));
    };


    return (
        <div className="irrigation-page">
            <h1 className="page-title">Land Information</h1>
            <Divider/>

            <div className="info-container">
                <Stack direction="row" spacing={10}>
                    <Stack direction="column">
                        <div className="info-row">
                            <span className="info-label">ID:</span>
                            <span className="info-value">{landInfo.id}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{landInfo.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Crop Type:</span>
                            <span className="info-value">{landInfo.cropType}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Crop Variety:</span>
                            <span className="info-value">{landInfo.cropVariety}</span>
                        </div>

                        <Stack direction="row" spacing={1}>
                            <div className="info-row">
                                <span className="info-label">Soil Humidity Level:</span>
                                <span className="info-value" style={{ color: getHumidityColor(landInfo.soilHumidityLevel) }}>
                                    {landInfo.soilHumidityLevel}%
                                </span>
                            </div>
                            <Box sx={{ width: 200 }}>
                                <Slider
                                    value={landInfo.soilHumidityLevel}
                                    aria-labelledby="humidity-level-slider"
                                    valueLabelDisplay="auto"
                                    // disabled // Disable slider interaction
                                    sx={{
                                        color:"#8BA766",
                                        // color: getHumidityColor(landInfo.soilHumidityLevel), // Set color based on humidity level
                                    }}
                                />
                            </Box>
                        </Stack>

                    </Stack>
                    <Stack direction="column">
                        <div className="info-row">
                            <span className="info-label">Watering Duration:</span>
                            <span className="info-value">{formatDuration(landInfo.durationHours, landInfo.durationMinutes, landInfo.durationSeconds)}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Remaining Time:</span>
                            <span className="info-value">{formatTime(remainingTime)}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Completion Percentage:</span>
                            <span className="info-value">{completionPercentage}%</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Enabled Status:</span>
                            <label className="switch">
                                <input type="checkbox" checked={landInfo.enabledStatus} onChange={handleToggle} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </Stack>
                </Stack>
            </div>

            <Divider> <Chip label="Adjustment Setting" size="small" />
            </Divider>

            <div className={"adjustContainer"}>
                <Stack direction="column"a spacing={5}>

                    <Stack direction="row" spacing={1} className={"firstrow"}>
                        <Stack direction="column" spacing={1} className={"st1col"}>
                            <h1 className={"patchTitle"} >This Patch</h1>
                                <WateringPointCheckboxes
                                    wateringPoints={landInfo.wateringPoints}
                                    checkboxes={checkboxes}
                                    setCheckboxes={setCheckboxes}
                                    handleSelectAll={handleSelectAll} // Pass the function down
                                />
                        </Stack>
                        <div className="watering-levels-container">
                            {[1, 2, 3, 4, 5].map((col) => (
                                <Box key={col} sx={{ mr: 15, width: 250 }} className="watering-level-box">
                                    <Typography id={`col-${col}-slider`} gutterBottom fontWeight="bold">
                                        Column {col} Watering Level: {wateringLevels[`col${col}`]}%
                                    </Typography>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={wateringLevels[`col${col}`]}
                                        onChange={(event, newValue) => handleWaterLevelChange(`col${col}`, newValue)}
                                        aria-labelledby={`col-${col}-slider`}
                                        disabled={!landInfo.enabledStatus}
                                        className="watering-level-slider" // Apply slider styles
                                    />
                                </Box>
                            ))}
                        </div>
                        <Stack direction="column" spacing={1} className={"rd3col"}>
                            <div className={"durationSetting"}>
                                <h2>Set Duration</h2>
                                <DurationDisplay landInfo={landInfo}/>
                            </div>
                            <ButtonsThis className={"buttons-this"}>Start Now</ButtonsThis>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} className={"sndrow"}>
                        <Stack direction="column" spacing={1} className={"st1col"}>
                            <Stack direction="row" spacing={1} >
                                <h1 className={"patchTitle"} >Next Patch</h1>
                                <label className="switch">
                                    <input type="checkbox" checked={landInfo.nextPatch.status} onChange={handleNextStatus} />
                                    <span className="slider round"></span>
                                </label>
                            </Stack>
                            <WateringPointCheckboxes
                                wateringPoints={landInfo.wateringPoints}
                                checkboxes={nextPatchCheckboxes} // Use nextPatchCheckboxes for checkboxes
                                setCheckboxes={setNextPatchCheckboxes} // Pass the setter function directly
                            />

                        </Stack>
                        <div className="watering-levels-container">
                            {[1, 2, 3, 4, 5].map((col) => (
                                <Box key={col} sx={{ mr: 15, width: 250 }} className="watering-level-box">
                                    <Typography id={`col-${col}-slider`} gutterBottom fontWeight="bold">
                                        Column {col} Watering Level: {nextWateringLevels[`col${col}`]}%
                                    </Typography>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={nextWateringLevels[`col${col}`]}
                                        onChange={(event, newValue) => handleNextWaterLevelChange(`col${col}`, newValue)}
                                        aria-labelledby={`col-${col}-slider`}
                                        disabled={!landInfo.nextPatch.status || !landInfo.enabledStatus}
                                        className="watering-level-slider" // Apply slider styles
                                    />
                                </Box>
                            ))}
                        </div>
                        <Stack direction="column" spacing={1} className={"rd3col"}>
                            <div className={"durationSetting"}>
                                <h2>Next Timer Setting</h2>
                                <div className="timer-selection-container">
                                    <TimerSelection landInfo={landInfo} />
                                </div>
                            </div>
                            <ButtonsThis className={"buttons-this"} >Save</ButtonsThis>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        </div>
    );
};

export default IrrigationPage;

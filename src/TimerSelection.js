import React, { useState } from 'react';
import {TextField, Select, MenuItem, Button} from '@mui/material';
import './irrigation.css'
import {styled} from "@mui/material/styles";
const TimerSelection = ({ landInfo }) => {
    const [timerSettings, setTimerSettings] = useState({
        startTime: landInfo.nextPatch.startTime,
        durationHours: 1,
        durationMinutes: 0,
        durationSeconds: 0,
        repeatSetting: landInfo.nextPatch.repeatSetting,
        startDate: landInfo.nextPatch.startDate,
        endDate: landInfo.nextPatch.endDate,
    });

    const handleTimerChange = (event) => {
        const { name, value } = event.target;
        setTimerSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Handle submission of timer settings
        console.log(timerSettings);
    };

    return (
        <div className="timer-selection-container">
            <TextField
                label="Start Time"
                type="time"
                name="startTime"
                value={timerSettings.startTime}
                onChange={handleTimerChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div>
                <TextField
                    label="Duration Hours"
                    type="number"
                    name="durationHours"
                    value={timerSettings.durationHours}
                    onChange={handleTimerChange}
                />
                <TextField
                    label="Duration Minutes"
                    type="number"
                    name="durationMinutes"
                    value={timerSettings.durationMinutes}
                    onChange={handleTimerChange}
                />
                <TextField
                    label="Duration Seconds"
                    type="number"
                    name="durationSeconds"
                    value={timerSettings.durationSeconds}
                    onChange={handleTimerChange}
                />
            </div>
            <Select
                label="Repeat Setting"
                value={timerSettings.repeatSetting}
                onChange={handleTimerChange}
                name="repeatSetting"
            >
                <MenuItem value="everyday">Everyday</MenuItem>
                <MenuItem value="everyweek">Every Week</MenuItem>
                {/* Add more repeat options as needed */}
            </Select>
            <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={timerSettings.startDate}
                onChange={handleTimerChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="End Date"
                type="date"
                name="endDate"
                value={timerSettings.endDate}
                onChange={handleTimerChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};

export default TimerSelection;

// WateringPointCheckboxes.js
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Typography, Button, Stack } from '@mui/material';
import './irrigation.css';
import { styled } from '@mui/material/styles';

const WateringPointCheckboxes = ({ wateringPoints, checkboxes, setCheckboxes, handleSelectAll }) => {
    const columns = 5; // Number of checkboxes per column
    const rows = Math.ceil(wateringPoints / columns); // Calculate number of rows
    const ButtonsThis = styled(Button)(({ theme }) => ({
        color: '#e8f5e9',
        backgroundColor: '#8BA766',
        '&:hover': {
            backgroundColor: '#9ccc65',
        }
    }));
    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };
    const renderCheckboxes = () => {
        let checkboxes = [];
        let pointCount = 1;
        for (let i = 0; i < rows; i++) {
            let rowCheckboxes = [];
            for (let j = 0; j < columns; j++) {
                if (pointCount <= wateringPoints) {
                    const formattedPoint = pointCount.toString().padStart(2, '0'); // Add leading zero for single-digit numbers
                    rowCheckboxes.push(
                        <Grid item key={pointCount} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={checkboxes[pointCount - 1]}
                                onChange={() => handleCheckboxChange(pointCount - 1)}
                                // defaultChecked={false}
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: 35 },
                                    color: '#495D44', // Border color
                                    '&.Mui-checked': {
                                        color: '#495D44', // Checked color
                                    },
                                }}
                                inputProps={{ 'aria-label': `Watering Point ${pointCount}` }}
                            />
                            <Typography>{formattedPoint}</Typography>
                        </Grid>
                    );
                    pointCount++;
                }
            }
            checkboxes.push(
                <Grid container spacing={2} key={i}>
                    {rowCheckboxes}
                </Grid>
            );
        }
        return checkboxes;
    };

    return (
        <div>
            {/* Button to select all checkboxes */}
            <Stack direction="row" spacing={1} className={"smallTitleBar"}>
                <h2 className={"smallTitle"}>Watering Point Selection</h2>
                <ButtonsThis className={"buttons-this"} onClick={handleSelectAll}>Select All</ButtonsThis>
            </Stack>
            {/* Grid container for checkboxes */}
            <Grid container spacing={2} className={"checkbox1"}>
                {renderCheckboxes()}
            </Grid>
        </div>
    );
};

export default WateringPointCheckboxes;

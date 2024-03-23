import React, { useState } from 'react';
import { Stack, Card, CardHeader, CardMedia, CardContent, IconButton, Typography, Collapse, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import './MarketStore.css';

export default function SeedCard({ seed, addToCart }) {
    const [expanded, setExpanded] = useState(false);
    const handleAddToCart= () =>{
        addToCart(seed);// Call the addToCart function passed as prop with the seed item
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 370, borderRadius:3 }}>
            <CardHeader
                title={<Typography variant="h5" fontWeight={"bold"}>{seed.name}</Typography>}
                subheader={
                    <Typography variant="body1" style={{ color: '#8BA766' }}>
                        {`Price: $${seed.price_per_unit}`}
                    </Typography>
                }
                className="Header2"
            />
            <CardMedia
                component="img"
                height="194"
                image={seed.image_url}
                alt={seed.name}
            />
            <CardContent>
                <Typography variant="body2" color="#808E7C">
                    {seed.description}
                </Typography>

            </CardContent>
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"} className={"cardButtons"}>
                <Button
                    onClick={handleAddToCart}
                    sx={{
                        margin:'10px',
                        borderRadius:1.8,
                        backgroundColor: '#CED581', // Background color
                        color: '#495D44', // Text color
                        '&:hover': {
                            backgroundColor: '#A4AD43', // Hover background color
                            color: '#FAE9AD', // Hover text color
                        },
                    }}
                >
                    Add to Cart
                </Button>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{
                        '&:hover': {
                            opacity: '10',
                            backgroundColor: 'rgba(139, 167, 102, 0.3)', // Background color with opacity
                        },
                        '&:hover::before': {
                            opacity: '10', // Adjust the opacity of the ripple effect
                            backgroundColor: '#8BA766', // Change the ripple color to #8BA766 on hover
                        },
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Stack>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant={"h6"} fontWeight={"bold"} color="#3F4736">Additional Info:</Typography>
                    <Typography paragraph color="#808E7C">
                        Category: {seed.category}
                    </Typography>
                    <Typography paragraph color="#808E7C">
                        Quantity in Stock: {seed.quantity_in_stock}
                    </Typography>
                        <Typography paragraph color="#808E7C">
                            Supplier: {seed.supplier} {/* Display supplier name */}
                        </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

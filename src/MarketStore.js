import React, {useState} from 'react';
import './MarketStore.css';
import {Box, Typography, Slider, Divider, Stack, Grid, Button, TextField, styled} from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { Checkbox, FormControlLabel, FormGroup,  Card, CardContent} from '@mui/material';
import SeedCard from './SeedCard'; // Import SeedCard component here
import basilImage from '../images/basil.jpeg';
import cucumberImage from '../images/cucumber.jpg';
import daissyImage from '../images/daissy.jpg';
import lavenderImage from '../images/Lavender.png';
import mintImage from '../images/mint.jpg';
import sageImage from '../images/sage.jpg';
import spinachImage from '../images/spinach.jpg';
import sunflowerImage from '../images/sunflower.jpg';
import zinniaImage from '../images/zinnia.jpg';
import tomatoImage from '../images/veg4.jpg'
import carrotImage from '../images/veg3.jpg'
import redRosesImage from '../images/redRoses.jpg';


function MarketStore(){
    const storeItems = [
        {
            "id": 1,
            "name": "Sunflower Seeds",
            "description": "Organic sunflower seeds for planting or snacking.",
            "category": "Flowers",
            "price_per_unit": 5.99,
            "quantity_in_stock": 1000,
            "image_url": sunflowerImage,
            "supplier": "Sunflower Farms"
        },
        {
            "id": 2,
            "name": "Tomato Seeds",
            "description": "Heirloom tomato seeds for home gardens.",
            "category": "Vegetables",
            "price_per_unit": 3.49,
            "quantity_in_stock": 750,
            "image_url": tomatoImage,
            "supplier": "Farm is Fun"
        },
        {
            "id": 3,
            "name": "Basil Seeds",
            "description": "Genovese basil seeds for culinary use.",
            "category": "Herbs",
            "price_per_unit": 2.99,
            "quantity_in_stock": 500,
            "image_url": basilImage,
            "supplier": "Farm is Fun"
        },
        // Include other items with their respective imported image variables
        {
            "id": 4,
            "name": "Carrot Seeds",
            "description": "Sweet and crunchy carrot seeds for home gardens.",
            "category": "Vegetables",
            "price_per_unit": 4.25,
            "quantity_in_stock": 1200,
            "image_url": carrotImage,
            "supplier": "John Doe"
        },
        {
            "id": 5,
            "name": "Lavender Seeds",
            "description": "Fragrant lavender seeds for gardens and aromatherapy.",
            "category": "Herbs",
            "price_per_unit": 6.99,
            "quantity_in_stock": 800,
            "image_url": lavenderImage,
            "supplier": "Emma Davis"
        },
        {
            "id": 6,
            "name": "Rose Seeds",
            "description": "Beautiful rose seeds for your garden.",
            "category": "Flowers",
            "price_per_unit": 49.99,
            "quantity_in_stock": 300,
            "image_url": redRosesImage,
            "supplier": "Farm is Fun"
        },
        {
            "id": 7,
            "name": "Spinach Seeds",
            "description": "Nutritious spinach seeds for home gardens.",
            "category": "Vegetables",
            "price_per_unit": 3.99,
            "quantity_in_stock": 600,
            "image_url": spinachImage,
            "supplier": "Green Leaf Farms"
        },
        {
            "id": 8,
            "name": "Mint Seeds",
            "description": "Refreshing mint seeds for culinary and medicinal uses.",
            "category": "Herbs",
            "price_per_unit": 2.49,
            "quantity_in_stock": 400,
            "image_url": mintImage,
            "supplier": "Minty Fresh Gardens"
        },
        {
            "id": 9,
            "name": "Zinnia Seeds",
            "description": "Colorful zinnia flower seeds to brighten your garden.",
            "category": "Flowers",
            "price_per_unit": 4.99,
            "quantity_in_stock": 900,
            "image_url": zinniaImage,
            "supplier": "Rainbow Blooms Co."
        },
        {
            "id": 10,
            "name": "Cucumber Seeds",
            "description": "Crunchy cucumber seeds for fresh salads and pickling.",
            "category": "Vegetables",
            "price_per_unit": 2.75,
            "quantity_in_stock": 1100,
            "image_url": cucumberImage,
            "supplier": "Crisp Veggies Inc."
        },
        {
            "id": 11,
            "name": "Sage Seeds",
            "description": "Aromatic sage seeds for culinary and medicinal purposes.",
            "category": "Herbs",
            "price_per_unit": 3.79,
            "quantity_in_stock": 550,
            "image_url": sageImage,
            "supplier": "Herbal Essence Farms"
        },
        {
            "id": 12,
            "name": "Daisy Seeds",
            "description": "Delicate daisy flower seeds for charming gardens.",
            "category": "Flowers",
            "price_per_unit": 5.49,
            "quantity_in_stock": 700,
            "image_url": daissyImage,
            "supplier": "Blossom Gardens Ltd."
        }
    ];

    const categoriesData = [
        { id: 1, name: 'Flowers', checked: false },
        { id: 2, name: 'Vegetables', checked: false },
        { id: 3, name: 'Herbs', checked: false },
    ];

    const [categories, setCategories] = useState(categoriesData);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [filteredItems, setFilteredItems] = useState(storeItems);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (seed) =>{
        setCartItems([...cartItems, seed]); //add selected seed to cartItems array
        console.log("Item added to cart:", seed);

    }

    const handleCategoryChange = (categoryId) => {
        const updatedCategories = categories.map((category) =>
            category.id === categoryId ? { ...category, checked: !category.checked } : category
        );
        setCategories(updatedCategories);

        // Check if all categories are unchecked
        const allUnchecked = updatedCategories.every((category) => !category.checked);

        if (allUnchecked){
            setFilteredItems(storeItems)
        }else {
            filterItems(updatedCategories, priceRange);
        }
    };

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
        filterItems(categories, newValue);
    };

    const handleApplyFilters = () => {
        // Handle applying filters based on categories and price range
        console.log("Categories:", categories);
        console.log("Price Range:", priceRange);
    };

    // const filterItems = (selectedCategories, priceRange) => {
    //     const filtered = storeItems.filter(item =>
    //         selectedCategories.some(category => category.checked && category.name === item.category) &&
    //         (item.price_per_unit >= priceRange[0] && item.price_per_unit <= priceRange[1])
    //     );
    //     setFilteredItems(filtered);
    // };

    const filterItems = (selectedCategories, priceRange) => {
        let filtered = [];

        if (selectedCategories.some(category => category.checked)) {
            // Filter by both categories and price range
            filtered = storeItems.filter(item =>
                selectedCategories.some(category => category.checked && category.name === item.category) &&
                (item.price_per_unit >= priceRange[0] && item.price_per_unit <= priceRange[1])
            );
        } else {
            // Filter only by price range
            filtered = storeItems.filter(item =>
                item.price_per_unit >= priceRange[0] && item.price_per_unit <= priceRange[1]
            );
        }

        setFilteredItems(filtered);
    };


    return(
        <div className={"marketStorePage"}>
            <Stack direction="row" justifyContent={"space-between"}>
                <h1 className={"StoreTitle"}>Store</h1>
                <input
                    className={"searchStore"}
                    type={"text"}
                    placeholder={"Search keywords"}
                />
                <Button className={"buttons-store"}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(139, 167, 102, 0.2)', // Background color with opacity
                            },
                        }}
                >
                    <CiShoppingCart size={30}/></Button>
            </Stack>

            <Stack direction="row" spacing={5} className={"mainContainerStore"}>
                <Stack direction="column" spacing={2} className={"filteringBox"}>
                    <Typography variant="h5" fontWeight={"bold"} className={"Header2"}>Filter By</Typography>
                    <Divider />
                    <Box mt={2}>
                        <Typography variant="subtitle1" fontWeight={"bold"} className={"Header2"}>Categories</Typography>
                        <FormGroup>
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category.id}
                                    control={
                                    <Checkbox
                                        checked={category.checked}
                                        onChange={() => handleCategoryChange(category.id)}
                                        sx={{
                                            color: '#495D44', // Change the checkbox color here
                                            '&.Mui-checked': {
                                                color: '#8BA766', // Change the checked color if needed
                                            },
                                        }}
                                    />}
                                    label={category.name}
                                    sx={{
                                        color: '#495D44', // Change the label color here
                                        '&.Mui-checked': {
                                            color: '#495D44', // Change the checked label color if needed
                                        },
                                    }}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="subtitle1" fontWeight={"bold"} className="Header2">Price Range</Typography>
                        <Slider
                            value={priceRange}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={10}
                            sx={{color:"#8BA766"}}
                        />
                        <Typography variant="body2" fontWeight={"bold"} className={"smallText"}>Price: ${priceRange[0]} - ${priceRange[1]}</Typography>
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleApplyFilters}
                                sx={{
                                    backgroundColor: '#8BA766', // Background color
                                    color: 'white', // Text color
                                    '&:hover': {
                                        backgroundColor: '#495D44', // Hover background color
                                        color: '#8BA766', // Hover text color
                                    },
                                }}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </Stack>

                {/*display the item pic and info */}
                <Grid container spacing={3}>
                    {filteredItems.length === 0 ? (
                        <Typography variant="body2" fontWeight="bold">No items match the filter criteria.</Typography>
                    ) : (
                        filteredItems.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <SeedCard seed={item} addToCart={addToCart}/>
                            </Grid>
                        ))
                    )}
                </Grid>

            </Stack>


        </div>
    );
}

export default MarketStore;
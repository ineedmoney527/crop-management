import React, { useState } from 'react';
import './Post.css';
import addIcon from '../images/Add.png'; // Import addIcon correctly
import './Post.css';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Dman from '../images/Dman.jpg';
import Aman from '../images/Aman.jpg';
import Bman from '../images/bMan.jpg';
import Cman from '../images/Cman.jpg';
import veg1 from '../images/veg1.jpg';
import veg2 from '../images/veg2.jpg';
import veg3 from '../images/veg3.jpg';
import veg4 from '../images/veg4.jpg';
import veg5 from '../images/veg5.jpg';
import Post from './Post'; // Import the Post component
import SearchPost from "./SearchPost";

function SearchPostList(){
    const drawerWidth = 240;

    const postersInfo = [
        {
            id: 1,
            username: 'Farmer97',
            avatar: Aman,
            timestamp: new Date(),
            images: [
                { url: veg1, alt: 'Post Image' },
                { url: veg4, alt: 'Post Image' },
            ],
            follower: '32k followers',
            sign: "A flower farmer - Princess Best Friend",
            caption: 'Just enjoying a sunny day! ☀️"Where words fail, music speaks." Music has a unique ability to convey emotions and messages that words alone often cannot express. It transcends language barriers and touches the deepest parts of our souls, connecting us on a profound level. "In the dance of life, find your rhythm." Life is a continuous journey filled with ups and downs, twists and turns. It\'s essential to discover your own pace, passions, and purpose amidst the chaos, just as a dancer finds harmony in movement. "Let your dreams be your wings." Dreams are not just fleeting thoughts; they are aspirations that give us direction and motivation. They empower us to reach for the stars, pushing boundaries and defying limits along the way.',
            // Add other post data such as media content (images/videos) if needed
        },
        {
            id: 2,
            username: 'Jane Smith_Farm owner',
            avatar: Bman,
            timestamp: new Date(),
            images: [
                { url: veg2, alt: 'Post Image' },
                { url: veg3, alt: 'Post Image' },
            ],
            caption: 'Dinner time with friends! 🍽️🥂 Thanks Farmer!',
            follower: '230k followers',
            sign: "Farm in the space",
            // Add other post data such as media content (images/videos) if needed
        },
        {
            id: 3,
            username: 'Farm is Fun',
            avatar: null,
            timestamp: new Date(),
            images:null,
            follower: '340 followers',
            sign: "Farming Full of Fun",
            caption: 'New book added to my collection! 📚',
            // Add other post data such as media content (images/videos) if needed
        },
        {
            id: 7,
            username: 'James Taylor',
            avatar: null,
            timestamp: new Date(),
            images: [
                { url: veg5, alt: 'Post Image' },
            ],
            follower: '3 followers',
            sign: null,
            caption: 'Carrot farmer and lover are here! Carrots are not just crunchy snacks but also packed with vitamins and nutrients essential for good health. The vibrant orange color of carrots comes from beta-carotene, which is beneficial for eye health. Grated carrots add a delightful crunch and sweetness to salads and coleslaws. Roasted carrots with a sprinkle of herbs make a delicious and healthy side dish for any meal.',
            // Add other post data such as media content (images/videos) if needed
        },
    ];

    return (
        <Stack direction="row" spacing={2} className={"containerPostUnder"}>
            <Drawer
                className="sidebarPost"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Stack direction="column" spacing={2} sx={{ backgroundColor: '#F7F8F9', height: '100%', width:'100%' }} className={"IndividualPostContent"}>
                <div className={"headerPostPage"}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <input
                            className={"searchBox"}
                            type={"text"}
                            placeholder={"Search keywords"}
                        />
                        <button className={"addPost"}>
                            <img src={addIcon} alt={"Add New Post"} className={"addNewBtn"}/>
                        </button>
                    </Grid>
                </div>

                <Stack direction="column" spacing={1}>
                    {postersInfo.map(posters => (
                        <div key={postersInfo.id} style={{ backgroundColor: '#FFFFFF', borderRadius:'20px' }}>
                            <SearchPost posters={posters} />
                        </div>
                    ))}
                </Stack>

                <Stack direction="column" spacing={3}>
                    {postersInfo.map(post => (
                        <div key={post.id} style={{ backgroundColor: '#FFFFFF', borderRadius:'20px' }}>
                            <Post post={post} />
                        </div>
                    ))}
                </Stack>
            </Stack>

        </Stack>
    );

}

export default SearchPostList;

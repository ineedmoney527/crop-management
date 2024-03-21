import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './AddNewPost.css';
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
import Avatar from '@mui/material/Avatar';
import Aman from '../images/Aman.jpg';
import sendIcon from '../images/send.png';
import veg1 from '../images/veg1.jpg';
import veg4 from '../images/veg4.jpg';
import UploadImage from '../images/UploadImage.png';
import Attach from '../images/Attach.png';
import AttachGIF from '../images/AttachGIF.png'
import { TiDelete } from "react-icons/ti";
// import UploadComponent from './UploadComponent';

const AddPost = ({onSend }) => {
    const drawerWidth = 240;

    const mainUser=[
        {
            id: 1,
            username: 'John Doe',
            avatar: Aman,
            timestamp: new Date(),
            images: [
                { url: veg1, alt: 'Post Image' },
                { url: veg4, alt: 'Post Image' },
            ],
            caption: 'Just enjoying a sunny day! ☀️"Where words fail, music speaks." Music has a unique ability to convey emotions and messages that words alone often cannot express. It transcends language barriers and touches the deepest parts of our souls, connecting us on a profound level. "In the dance of life, find your rhythm." Life is a continuous journey filled with ups and downs, twists and turns. It\'s essential to discover your own pace, passions, and purpose amidst the chaos, just as a dancer finds harmony in movement. "Let your dreams be your wings." Dreams are not just fleeting thoughts; they are aspirations that give us direction and motivation. They empower us to reach for the stars, pushing boundaries and defying limits along the way.',
        }
    ]

    // State for uploaded files
    const [files, setFiles] = useState([]);

    // Function to handle file deletion
    // const handleDelete = (indexToDelete) => {
    //     const updatedFiles = files.filter((file, index) => index !== indexToDelete);
    //     setFiles(updatedFiles);
    // };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*', // Accept only image files
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles]);
        },
        maxFiles: 20, // Maximum allowed files
    });

    const handleDelete = (indexToDelete) => {
        // Remove the file from the state
        const updatedFiles = files.filter((file, index) => index !== indexToDelete);
        setFiles(updatedFiles);

        // Trigger file selection again
        const inputElement = document.getElementById('hiddenFileInput');
        inputElement.click();
    };

    return(
        <Stack direction="row" spacing={2} className={"AddPostcontainer"}>
            <Drawer
                className="sidebar-AddPost"
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

            <Stack direction="column" spacing={2} sx={{height: '100%', width:'100%'}} className={"underContent-add"}>
                <div className={"IdvdSendHeader"}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Avatar alt={"Avatar"} src={Aman} className={"avatarAddPost"} style={{ width: '50px', height: '50px'}}/>
                        <button className={"sendPost"}>
                            <img src={sendIcon} alt={"Post it"} className={"sendBtn"}/>
                        </button>
                    </Grid>
                </div>

                <Stack direction="column" spacing={3}  sx={{height: '85vh', width:'95%' }} className={"Post-Info-Add"}>
                    <Stack direction="row" spacing={0.5}>
                        <button className={"buttons-AddPost"}>
                            <img src={UploadImage} alt={"Upload Image"} className={"UploadImageBtn"}/>
                        </button>
                        <button className={"buttons-AddPost"}>
                            <img src={Attach} alt={"Upload Attach"} className={"attachAddBtn"}/>
                        </button>
                        <button className={"buttons-AddPost"}>
                            <img src={AttachGIF} alt={"Upload GIF"} className={"GIFAddBtn"}/>
                        </button>
                    </Stack>
                    <label className={"captions-add"}>{mainUser[0]?.caption}</label>

                    <div
                        {...getRootProps()} className={`upload-container`}>
                        <input {...getInputProps()} />
                        <p>Drag & drop images here, or click to select images (Max 20 images)</p>
                        <div className="image-grid">
                            {files.map((file, index) => (
                                <div key={index} className="image-preview">
                                    <button onClick={() => handleDelete(index)} className="delete-btn"><TiDelete size={15}/></button>
                                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`}  className="uploaded-image" />
                                </div>
                            ))}
                        </div>
                        <input id="hiddenFileInput" type="file" style={{ display: 'none' }} />
                    </div>

                </Stack>

            </Stack>
        </Stack>
    );
}

export default AddPost;
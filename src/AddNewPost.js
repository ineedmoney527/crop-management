
//addNewPost.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import sa from './images/sa2.jpg';
import './AddNewPost.css';
import { Stack, Grid, Drawer, Toolbar, List, Divider, TextField, TextareaAutosize, Box } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Aman from './images/Aman.jpg';
import sendIcon from './images/send.png';
import veg1 from './images/veg1.jpg';
import veg4 from './images/veg4.jpg';
import { styled } from '@mui/system';
import { TiDelete } from "react-icons/ti";
import axios from 'axios';

const AddPost = ({onSend }) => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();


    const handleAddPost = async () => {
        if (!content) {
            console.error('Error adding new post: Content cannot be empty');
            alert("Content cannot be empty");
            return;
        }
        const postData = {
            UserID: 1, // Assuming UserID is hardcoded for simplicity
            Content: content,
            Media: files
        };

        const formData = new FormData();
        formData.append('content', content); // Ensure that 'content' is lowercase
        formData.append('UserID', 1); // Assuming UserID is hardcoded for simplicity
        files.forEach(file => {
            formData.append('media', file);
        });
        console.log("Caption inserted:", content);

        try {
            // const response = await axios.post("http://localhost:5050/AddNewPost", formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
        // });
            const response = await axios.post(`http://localhost:5050/AddNewPost`, { content: content });
            setContent(response.data);
            alert('Posted successfully!')
            console.log("Response data (insert new):", response.data); // Log the response data
            console.log("Response (insert new):", response); // Log the response data
            setContent("");
            navigate('/Forum');
        } catch (error) {
            console.error('Error adding new post:', error);
            alert("Failed to post: Internal server error");
        }
    }

    // Function to handle file uploads
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles]);
        },
        maxFiles: 20,
    });

    const handleDelete = (indexToDelete) => {
        const updatedFiles = files.filter((file, index) => index !== indexToDelete);
        setFiles(updatedFiles);
    };

    return(
        <Stack direction="row" spacing={2} className={"AddPostcontainer"}>
            <Stack direction="column" spacing={2} sx={{height: '100%', width:'100%'}} className={"underContent-add"}>
                <div className={"IdvdSendHeader"}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Avatar alt={"Avatar"} src={sa} className={"avatarAddPost"} style={{ width: '50px', height: '50px'}}/>
                        <button className={"sendPost"}>
                            <img src={sendIcon} alt={"Post it"} onClick={handleAddPost} className={"sendBtn"}/>
                        </button>
                    </Grid>
                </div>

                <Stack direction="column" spacing={3}  sx={{height: '85vh', width:'95%' }} className={"Post-Info-Add"}>
                    <Stack direction="column" spacing={0.5}>
                        <TextareaAutosize
                            className={"caption-here"}
                            placeholder={"Write something..."}
                            variant="plain"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                console.log("Content here:", e.target.value); // Add this console.log statement
                            }}
                            minRows={5} // Set minimum rows to show
                            style={{
                                width: '98%',
                                marginBottom: '10px',
                                padding: '10px', // Add padding
                                borderRadius: '8px', // Add border radius
                                border: 'transparent', // Add border
                                outline: 'none',
                                resize: 'none', // Allow vertical resize
                                '&:hover': {
                                    borderColor: 'red', // Change border color on hover and focus
                                },
                                '&:focus': {
                                    borderColor: 'red',
                                }
                            }}
                        />
                        <Box>
                            <div
                                {...getRootProps()} className={`upload-container`}>
                                {/*<input {...getInputProps()} type={"file"} name={"media"}*/}
                                {/*       onChange={(e) =>{*/}
                                {/*    setMedia(e.target.value);*/}
                                {/*    console.log("Media here:", e.target.value);}}*/}
                                {/*/>*/}
                                <input
                                    {...getInputProps()}
                                    type={"file"}
                                    name={"media"}
                                    onChange={(e) => {
                                        setFiles([...files, ...e.target.files]); // Update the state with selected files
                                        console.log("Media here:", e.target.files);
                                    }}
                                />
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
                        </Box>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    );
}

export default AddPost;
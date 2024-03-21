import React, { useState } from 'react';
import './Post.css';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import moment from "moment/moment";
import {ImageList, ImageListItem, Modal} from "@mui/material";
import {FaRegComment} from "react-icons/fa";
import {CiHeart, CiStar} from "react-icons/ci";

const SearchPost = ({ posters, onLike, onComment, onStar }) => {
    const getInitials = (name) => {
        const words = name.split(' ');
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        } else {
            return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
        }
    };

    return (
        <div className={"post"}>
            <Stack direction="column" spacing={0.5} className={"EachSingleAccount"}>
                <div className={"postHeader"}>
                    <Stack direction="row" spacing={3} className={"post-info"}>
                        {posters.avatar ? (
                            <Avatar alt="Avatar" src={posters.avatar} className="avatar" style={{ width: '50px', height: '50px' }} />
                        ) : (
                            <Avatar className="avatar" style={{ width: '50px', height: '50px' }}>
                                {getInitials(posters.username)}
                            </Avatar>
                        )}

                        <Stack direction="column" spacing={0.3} className={"poster-info"}>
                            <label className={"username"}>{posters.username}</label>
                            <label className={"signs"}>{posters.sign} • {posters.follower}</label>
                        </Stack>
                        <div className={"flwSection"}>
                            <button className={"followBtn"}>Follow</button>
                        </div>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
};

export default SearchPost;
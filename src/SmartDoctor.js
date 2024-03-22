import React, {useState,useEffect,useRef} from 'react';
import './SmartDoctor.css';
import person from './images/ion_person-circle-sharp.png';
import plant from './images/plant.png'
import {useNavigate} from 'react-router-dom';

const SmartDoctor = () => {
    const navigate = useNavigate();

    const handleLearningClick = () =>{
        navigate('./Learning')
    }

    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [photo, setPhoto] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setMediaStream(stream); // Set the mediaStream state
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (mediaStream) {
            const tracks = mediaStream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setMediaStream(null); // Reset the mediaStream state
        }
    };

    const takePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/jpeg');
            setPhoto(dataURL); // Set the captured photo in state
        }
    };


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown if the user clicks outside of it
    const handleOutsideClick = (e) => {
        if (!e.target.matches('.sd-dropbtn')) {
            setDropdownOpen(false);
        }
    };

    // Attach event listener to detect clicks outside dropdown
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    return (
        <div className="sd-chat-container">
            <div className={"sd-chat_sidebar"}>
                <div className={"chat-sidebar-box"}>
                    <button className={"sidebar-button"}>AI Tools</button>
                    <button className={"sidebar-button"} onClick={handleLearningClick}>Learning</button>
                </div>
            </div>

            <div className="sd-chat-messages">
                <div className="sd-message-received">
                    <button className="sd-dropbtn" onClick={toggleDropdown}>Smart Doctor 1.0 <i className="fa fa-caret-down"></i></button>
                    <div className={`sd-dropdown-content ${dropdownOpen ? "sd-show" : ""}`}>
                        <a href="./"> Chat Bot 1.0</a>
                    </div>
                </div>

                <div className={"sd-user-message"}>
                    <div className={"sd-user"}>
                        <img src={person} alt={"person"} className={"sd-icon"}/>
                        <label className={"sd-label"}>you</label>
                    </div>
                    <div className={"sd-question"}>
                        <label>
                            <img src={plant} alt={"plant"} className={"plant"}/>
                        </label>
                    </div>
                </div>

                <div className={"sd-message"}>
                    <div className={"smart-doctor"}>
                        <img src={person} alt={"person"} className={"smart-doctor-icon"}/>
                        <label className={"sd-label"}>smart doctor</label>
                    </div>

                    <div className={"sdd-answer"}>
                        <label>
                            Anthuriums, popularly known as flamingo flowers or laceleaf, are prized for their
                            striking, glossy foliage and vibrant, heart-shaped blooms. These tropical beauties boast a unique
                            appearance, with glossy, dark green leaves that often have a waxy texture, providing an elegant backdrop
                            to their colorful spathes,which can range from vibrant reds and pinks to softer shades of white and green.<br/>
                            Anthuriums are renowned for their long-lasting flowers, making them a favorite among indoor
                            plant enthusiasts.In terms of care, Anthuriums thrive in bright, indirect light, though they can tolerate
                            lower light conditions.They prefer temperatures between 65°F to 80°F (18°C to 27°C) and should be shielded from
                            drafts and extreme temperature fluctuations.Proper watering is crucial for Anthuriums, as they require consistently moist soil,<br/>
                            but overwatering should be avoided to prevent root rot. With the right conditions,Anthuriums can be rewarding houseplants, adding a touch of tropical elegance to any
                            indoor space.
                        </label>
                    </div>

                </div>

                <div className="sd-input-container">
                    <input type="file" accept="image/*"/>
                    <button onClick={startCamera}>Camera</button>
                    <button onClick={stopCamera}>Stop Camera</button>
                    <button onClick={takePhoto}>Take Photo</button>
                    <button>Send</button>
                    <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '300px' }}></video>
                    {photo && <img src={photo} alt="Captured" style={{ maxWidth: '300px' }} />}
                    {/*<video ref={videoRef} autoPlay muted style={{width: '100%', maxWidth: '300px'}}></video>*/}


                </div>
            </div>
        </div>
    );
};

export default SmartDoctor;

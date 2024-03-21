import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './AddNewPost.css';

const UploadComponent = ({ onFilesUpload }) => {
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        const newFiles = [...files, ...acceptedFiles.slice(0, 20 - files.length)];
        setFiles(newFiles);
        onFilesUpload(newFiles); // Pass uploaded files to parent component
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="upload-container">
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files (Max 20 files)</p>
            {files.map((file, index) => (
                <div key={index}>
                    {file.name} - {file.size} bytes
                </div>
            ))}
        </div>
    );
};

export default UploadComponent;

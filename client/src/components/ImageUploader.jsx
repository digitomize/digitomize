import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex gap-3 w-full h-24 max-w-lg">
            <label
                htmlFor="imageUpload"
                className="input h-24 flex-none border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer w-3/4 flex justify-center items-center"                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageChange}
                />
                <p className="text-gray-500">Drag & Drop or Click to Upload Image</p>
            </label>
            {selectedImage ?
                <div className="">
                    <Avatar
                        variant="rounded"
                        src={URL.createObjectURL(selectedImage)}
                        className="mb-2 self-center h-24"
                        sx={{ width: 100, height: 96, padding: 0 }}
                    />
                </div> : <div className="bg-gray-800 flex flex-col items-center justify-center">
                    <PersonIcon sx={{ width: 100, height: 96, padding: 0 }} color="primary"></PersonIcon>
                </div>
            }
        </div>
    );
};

export default ImageUploader;

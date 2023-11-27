import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ImageUploader = ({image, setFormData}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // converts image into binary data
    const getBinaryData = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsArrayBuffer(file);
        });
      }

    // update the image state in form data
    const setImage = async (file)=>{
        // const binaryData = await getBinaryData(file)
        let name = 'picture'
        console.log(name,"NAME");
        console.log(file);
        setFormData((prevData) => ({
            ...prevData,
            [name]: file,
          }));
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const { name } = event.target;
            setImage(file)
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(file);
            setImage(file)
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex gap-3 w-full h-24 max-w-lg">
            <label
                htmlFor="imageUpload"
                className="input h-24 flex-none border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer w-3/4 flex justify-center items-center"                
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageChange}
                    name='picture'
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
                    {image? <Avatar
                        variant="rounded"
                        src={image}
                        className="self-center h-24"
                        sx={{ width: 100, height: 96, padding: 0 }}
                    />:
                    <PersonIcon sx={{ width: 100, height: 96, padding: 0 }} color="primary"></PersonIcon>}
                    
                </div>
            }
        </div>
    );
};

export default ImageUploader;

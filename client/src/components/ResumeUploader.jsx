import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const ResumeUploader = ({ }) => {
    const [selectedResume, setSelectedResume] = useState(null);

    // update the resume state in form data
    const setResume = async (file) => {
        let name = "resume";
        setFormData((prevData) => ({
            ...prevData,
            [name]: file,
        }));
    };

    const handleResumeChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedResume(file);
            const { name } = event.target;
            setResume(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedResume(file);
            setResume(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex gap-3 w-full min-h-24 max-w-lg max-phone:flex-col-reverse items-center">
            <label
                htmlFor="resumeUpload"
                className="input h-24 flex-none border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer w-3/4 flex justify-center items-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    accept=".pdf, .doc, .docx"
                    id="resumeUpload"
                    className="hidden"
                    onChange={handleResumeChange}
                    name="picture"
                />
                <p className="text-gray-500">Drag & Drop or Click to Upload Resume</p>
            </label>

            {selectedResume && (
                <div className="flex flex-col items-center justify-center">
                    <FaRegCheckCircle size={30} />
                </div>
            )}
        </div>
    );
};

export default ResumeUploader;

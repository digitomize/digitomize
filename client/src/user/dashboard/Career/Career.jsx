import LoadingScreen from "../../../components/globals/LoadingScreen";
import Skills from "./Skills";



import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { submitUserFormData } from "../../../../api"; import Socials from "./Socials";
import SubmitBtn from "../Profile/SubmitBtn";
import { MetaData } from "../../../components/CustomComponents";
import { uniqueToast } from "../../../core/utils/unique-toast";


const socialFields = [
    { icon: <FaInstagram size={30} />, name: "instagram", placeholder: "https://instagram.com/digitomize" },
    { icon: <FaLinkedin size={30} />, name: "linkedin", placeholder: "https://linkedin.com/in/pranshu54" },
    { icon: <FaXTwitter size={30} />, name: "twitter", placeholder: "https://twitter.com/digitomize" },
];





function career() {

    const { personal_data, social } = useLoaderData();
    const [newSkill, setNewSkill] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const toastId = uniqueToast();
    const [skillData, setskillData] = useState(
        personal_data.skills.map((skill, index) => ({
            key: index, // Use the index as the key
            label: skill,
        })),
    );

    const [formData, setFormData] = useState({
        resume: personal_data.resume || "",
        skills: skillData.map((data) => data.label) || [],
        social: {
            linkedin: social?.linkedin || null,
            twitter: social?.twitter || null,
            instagram: social?.instagram || null,
        },
    });
    const handleSocialChange = (event) => {
        const { name, value } = event.target;
        // Update the formData.social state based on the name of the input field
        setFormData((prevData) => ({
            ...prevData,
            social: {
                ...prevData.social,
                [name]: value,
            },
        }));
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleDelete = (chipToDelete) => () => {
        setskillData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key),
        );
    };
    const handleAdd = (e) => {
        // console.log("handleAdd");
        e.preventDefault();

        if (newSkill.trim() !== "") {
            if (newSkill.length > 25) {
                toast.error("Length exceeding 25 characters",{
                    toastId
                });
                return;
            }
            setskillData((prevSkills) => [
                ...prevSkills,
                {
                    key: prevSkills.length
                        ? prevSkills[prevSkills.length - 1].key + 1
                        : 0,
                    label: newSkill,
                },
            ]);
            setNewSkill("");
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setIsDisabled(true);
        const res = await submitUserFormData(formData)
            .then(() => {
                toast.success("updated successfully!", {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    toastId: toastId
                });
                setIsDisabled(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    toastId: toastId
                });
                console.error(err);
                setIsDisabled(false);
            });

        // console.log(res);
    }
    const btnRef = useRef();
    useEffect(() => {
        // This code will run after setSkillData has completed

        if (skillData.length > 5) {
            toast.error("You cannot add more than 5 skills", {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                toastId: toastId
            });
            skillData.pop();
            btnRef.current.disabled = true;
        } else {
            btnRef.current.disabled = false;
        }
        setFormData((prevData) => ({
            ...prevData,
            skills: skillData.map((data) => data.label) || [],
        }));
    }, [skillData, btnRef]);






    //   if (loading) {
    //     return (
    //       <div className="w-full">

    //         <LoadingScreen />;
    //       </div>
    //     )
    //   }

    return (
        <>
            <MetaData path="u/dashboard/career" />
            <ToastContainer />
            <div className="bg-dashboardDarkColor font-['Geist']">
                <div className="flex justify-between items-center min-h-[40px]">
                    <div className="flex flex-shrink gap-2 mr-4 items-center min-w-0">
                        <p className="truncate font-medium text-gray-200 text-3xl max-w-[600px]">Career</p>
                    </div>
                </div>
                <form >

                    <Skills handleAdd={handleAdd} handleDelete={handleDelete} setNewSkill={setNewSkill} newSkill={newSkill} btnRef={btnRef} skillData={skillData} />

                    <Socials formData={formData} socialFields={socialFields} handleSocialChange={handleSocialChange} />
                    <SubmitBtn handleSubmit={handleSubmit} />
                </form>

            </div>
        </>
    );
}

export default career;
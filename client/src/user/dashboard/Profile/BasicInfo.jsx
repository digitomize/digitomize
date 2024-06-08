import { useUserAuth } from "../../../context/UserAuthContext";
import { useEffect, useState } from "react";
import React from "react";
import { submitUserImage } from "../../../../api";
import UploadPicture from "../../../components/UploadPicture";

// import ImageUploader from "../../../components/ImageUploader";
// import { useLoaderData } from 'react-router-dom';
// import { submitUserFormData } from "../../../../api";
// import { toast, ToastContainer } from 'react-toastify';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from "dayjs";


function BasicInfo({formData,setFormData,handleInputChange,handleInputChangeObjData}) {

    // const { personal_data, social } = useLoaderData();
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [formData, setFormData] = useState({
    //     email: personal_data.email,
    //     username: personal_data.username,
    //     name: personal_data.name || "",
    //     picture: personal_data.picture,
    //     dateOfBirth: {
    //         data: personal_data.dateOfBirth.data || "",
    //         showOnWebsite: personal_data.dateOfBirth.showOnWebsite || true,
    //     },
    //     bio: {
    //         data: personal_data.bio.data || "",
    //         showOnWebsite: personal_data.bio.showOnWebsite || true,
    //     },
    //     phoneNumber: {
    //         data: personal_data.phoneNumber.data || "",
    //         showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
    //     },
    // });

    // const dobChange = (date) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         dateOfBirth: {
    //             ...prevData.dateOfBirth,
    //             data: dayjs(date),
    //         },

    //     }));
    // };


    // const handleInputChangeObjData = (event) => {
    //     console.log("EVENT:", event);
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: {
    //             ...prevData[name],
    //             data: value,
    //         },
    //     }));
    // };
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };
    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     setIsDisabled(true);
    //     const res = await submitUserFormData(formData)
    //         .then(() => {
    //             toast.success("updated successfully!", {
    //                 position: "top-left",
    //                 autoClose: 1500,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //             });
    //             setIsDisabled(false);
    //         })
    //         .catch((err) => {
    //             toast.error(err.response.data.message, {
    //                 position: "top-left",
    //                 autoClose: 1500,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //             });
    //             console.log(err);
    //             setIsDisabled(false);
    //         });

        // console.log(res);
    // }
    // const { user } = useUserAuth();

    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [sendReqUserImage, setSendReqUserImage] = useState(false);

    useEffect(() => {
        if (sendReqUserImage) {
            formData.picture = selectedFile;
            submitUserImage(formData);
        }
    }, [sendReqUserImage]);

    const BIO_LIMIT = 250;

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <UploadPicture isPictureModalOpen={isPictureModalOpen} setIsPictureModalOpen={setIsPictureModalOpen} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setSendReqUserImage={setSendReqUserImage} />
                <div className="flex-1 mt-8">
                    <h3 className="text-base font-semibold text-gray-200">Basic account information</h3>
                    <p className="mt-3 font-light text-sm text-gray-500">Please enter your full name, or a display name you are comfortable with.</p>
                    <p className="mt-3 font-light text-sm text-gray-500">Click on the avatar to upload a custom one from your files..</p>
                </div>

                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div className="px-6 py-8 border-b border-jet">
                        <div className="flex flex-col sm:flex-row sm:space-x-5 items-center">

                            <div className="flex-0 px-4 flex flex-col justify-center items-center h-28">
                                <div className="relative text-center">
                                    <img src={selectedFile ? URL.createObjectURL(selectedFile) : formData.picture} alt="profile" className="w-16 rounded-full" />
                                    <label className="mt-5 text-xs font-medium text-secondary text-center cursor-pointer" htmlFor="useImageInput">Upload</label>
                                    <input type="file" id="useImageInput" accept="image/*" onChange={(event) => {
                                        setSelectedFile(event.target.files[0]);
                                        setIsPictureModalOpen(true);
                                    }} className="hidden" />
                                </div>
                            </div>


                            <div className="flex-1 w-full">
                                <label className="ml-1 mt-5 text-xs font-medium text-secondary" htmlFor="firstName">Display Name</label>
                                <input style={{ backgroundColor: "RGB(17, 19, 18)" }} placeholder="Bill" className="border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" required="required" type="text" value={formData.name} name="name" id="name" onChange={handleInputChange} maxLength={25} />
                            </div>

                        </div>

                    </div>
                    <div className="px-6 py-8 border-b border-jet">
                        <div className="sm:w-9/12">
                            <label className="ml-1 mt-5 text-xs font-medium text-secondary" htmlFor="email">E-mail</label>
                            <input readOnly style={{ backgroundColor: "RGB(17, 19, 18)" }} placeholder="bill.gates@example.com" autoComplete="email" value={formData.email} className="placeholder:text-gray-600 border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" type="email" name="email" id="email" />
                        </div>
                        <div className="mt-5">
                            <div className="sm:w-9/12">
                                <div className="mt-5">
                                    <label htmlFor="phoneNumber" className="ml-1 text-xs font-medium text-secondary">Phone</label>
                                    <input required style={{ backgroundColor: "RGB(17, 19, 18)" }} type="tel" placeholder="+32 460 23 47 50" name="phoneNumber" max={12} className="placeholder:text-gray-600 border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" id="phoneNumber" value={formData.phoneNumber.data} onChange={handleInputChangeObjData} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-8">
                        <div className="sm:w-9/12">
                            <div className="label">
                                <label className="text-xs font-medium text-secondary">Brief bio</label>
                                <label className="ml-1 text-xs font-medium text-secondary">{formData.bio?.data?.length || 0}/{BIO_LIMIT}</label>
                            </div>
                            <textarea style={{ backgroundColor: "RGB(17, 19, 18)" }} className="placeholder:text-gray-600 textarea textarea-bordered h-24 w-full" placeholder="Ex: Developer @ digitomize" maxLength={BIO_LIMIT} onChange={handleInputChangeObjData} value={formData.bio.data} name="bio" id="bio" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BasicInfo;
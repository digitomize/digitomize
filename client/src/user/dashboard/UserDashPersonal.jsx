import { Form, useOutletContext } from "react-router-dom"
import { useState } from "react"
import Checkbox from "../components/Checkbox"
import { submitUserFormData } from "../../../api"

export default function UserDashPersonal() {
    const contextData = useOutletContext().personal_data

    const [formData, setFormData] = useState({
        username: contextData.username,
        firstName: contextData.firstName || "",
        lastName: contextData.lastName || "",
        phoneNumber: {
            data: Number(contextData.phoneNumber.data) || 0,
            showOnWebsite: contextData.phoneNumber.showOnWebsite || true,
        },
        dateOfBirth: {
            data: contextData.dateOfBirth.data || "",
            showOnWebsite: contextData.dateOfBirth.showOnWebsite || true,
        },
        bio: {
            data: contextData.bio.data || "",
            showOnWebsite: contextData.bio.showOnWebsite || true,
        }
    });


    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleInputChangeObjData = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                data: value,
            },
        }));
    };
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(formData)
        const res = await submitUserFormData(formData);
        console.log(res);
    }


    return (
        <div className=' px-8 md:ps-12 py-12'>
            {/* <div className="w-full flex justify-center md:justify-end mb-12 md:mb-8">
            <Checkbox />
        </div> */}

            <Form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-2">
                    <div className="relative z-0 w-full md:w-3/4 mb-12 group">
                        <input type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-md md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" placeholder=" " value={contextData.firstName} required disabled />
                        <label htmlFor="firstName" className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full md:w-3/4 mb-12 group">
                        <input type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-md md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" placeholder=" " value={formData.lastName} onChange={handleInputChange} />
                        <label htmlFor="lastName" className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-2">
                    <div className="relative z-0 w-full md:w-3/4 mb-12 group">
                        <input type="tel" name="phoneNumber" id="phoneNumber" className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" placeholder=" " value={formData.phoneNumber.data} onChange={handleInputChangeObjData} required />
                        <label htmlFor="phoneNumber" className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                    </div>
                    <div className="relative z-0 w-full md:w-3/4 mb-12 group">
                        <input type="date" name="dateOfBirth" id="dateOfBirth" className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" value={formData.dateOfBirth.data} onChange={handleInputChangeObjData} required />
                        <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute md:text-lg text-gray-300 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                    </div>
                </div>
                <div className="relative z-0 w-full md:w-3/4 mb-12 group">
                    <input type="text" name="bio" id="bio" className="block py-2.5 px-0 w-full md:text-xl text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-700 focus:outline-none focus:ring-0 focus:border-fuchsia-700 peer" placeholder="" value={formData.bio.data} onChange={handleInputChangeObjData} required />
                    <label htmlFor="bio" className="peer-focus:font-medium absolute md:text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fuchsia-700 peer-focus:dark:text-fuchsia-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio</label>
                </div>

                <button type="submit" className="text-black bg-white font-medium rounded-lg md:text-xl w-full sm:w-auto px-5 py-2.5 text-center ">Update</button>
            </Form>

        </div>
    )
}

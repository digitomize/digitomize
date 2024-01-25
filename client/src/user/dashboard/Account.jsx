import { useEffect, useState } from "react";
// import FormInput from "../components/FormInput";
import { Form,useLoaderData } from "react-router-dom";
import { submitUserFormData } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
export async function loader() {
  try {
    const res = await userDashboardDetails();
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const UserDashBoardAccount = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {personal_data}=useLoaderData()
  console.log(personal_data)
  const [formData, setFormData]=useState({
    email :personal_data.email,
    phoneNumber: {
      data: personal_data.phoneNumber.data || "",
      showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
    }
  })
  console.log(formData)
  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        data: value,
      },
    }));
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
        });
        console.log(err);
        setIsDisabled(false);
      });

    // console.log(res);
  }
  return (
      <>
      <ToastContainer/>
        <div className="w-full flex flex-col space-y-[23px] bg-cardsColor font-['Geist']">
          <div className="sm:pt-[42px] sm:px-[70px] sm:pb-[24px] px-6 py-5 flex flex-col space-y-8 justify-start items-start w-full bg-[#ebebeb
1a] rounded-xl border border-white border-opacity-5">
        <p className="text-[40px] max-sm:text-2xl font-bold normal-case text-white">
          Manage your account
        </p>
        <div className="flex flex-col gap-8 max-md:w-full md:w-3/4 "> 
          <div className="form-control w-full ">
                  <label htmlFor="email" className="label">
                    <span className="label-text"> Email</span>
                  </label>
                  <div className="flex  items-center gap-3 ">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChangeObjData}
                      className="input input-bordered w-full max-w-lg "
                    />
                    
                  </div>
                </div>
          <div className="form-control w-full ">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="label-text"> Phone number</span>
                  </label>
                  <div className="flex  items-center gap-3 ">
                    <input
                      type="tel"
                      name="phoneNumber"
                      maxLength={10}
                      id="phoneNumber"
                      value={formData.phoneNumber.data}
                      onChange={handleInputChangeObjData}
                      className="input input-bordered w-full max-w-lg "
                    />
                    
                  </div>
                </div>
        </div>
        <div className="flex w-full max-md:flex-col gap-4 justify-between max-md:items-center">
          <p className="normal-case text-xl text-red-500 tracking-tight">
            Delete Account?
          </p>
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            type="submit"
            className={`text-white bg-buttonColor text-[24px] rounded-[10px] px-3 py-2 text-center ${
              isDisabled ? "cursor-not-allowed opacity-60" : null
            }`}
          >
           {isDisabled ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>
      {/* <div className="p-10 flex flex-col gap-8 justify-start items-start w-full h-3/4 bg-eerie-black-2 rounded-xl border border-white border-opacity-5">
        <p className="text-3xl max-phone:text-2xl font-bold normal-case text-white">
          Change your password
        </p>
        <div className="flex gap-8 flex-col md:flex-row md:justify-between w-full">
            <FormInput
              name="oldPassword"
              type="password"
              labelText="Old password"
              placeholderText="************"
              textArea={false}
              inputClass=" text-white"
            />
            <FormInput
              name="newPassword"
              type="password"
              labelText="New password"
              placeholderText="************"
              textArea={false}
            />
        </div>
        <div className="w-full flex justify-end">
          <button className="btn btn-success" disabled={isDisabled}>
            Change
          </button>
        </div>
      </div> */}
        </div>
      </>
    
  );
};

export default UserDashBoardAccount;

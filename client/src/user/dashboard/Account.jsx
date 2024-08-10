import { useEffect, useState } from "react";
// import FormInput from "../components/FormInput";
import { Form, useLoaderData } from "react-router-dom";
import { submitUserFormData } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "../../components/css/IndividualCard.css";
import { uniqueToast } from "../../core/utils/unique-toast";
export async function loader() {
  try {
    const res = await userDashboardDetails();
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const UserDashBoardAccount = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { personal_data } = useLoaderData();
  const toastId = uniqueToast();
  const [formData, setFormData] = useState({
    email: personal_data.email,
    phoneNumber: {
      data: personal_data.phoneNumber.data || "",
      showOnWebsite: personal_data.phoneNumber.showOnWebsite || true,
    },
  });
  const handleInputChangeObjData = (event) => {
    const { name, value } = event.target;
    if(name==='phoneNumber')
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        data: value,
      },
    }));
    else
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
  return (
    <>
      <ToastContainer />
      <div className="w-full flex border border-white rounded-xl flex-col space-y-[23px] bg-cardsColor font-['Geist']">
        <div
          className="sm:pt-[42px] sm:px-[70px] sm:pb-[24px] px-6 py-5 flex flex-col space-y-8 justify-start items-start w-full bg-[#ebebeb
1a] rounded-xl "
        >
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
          <div className="btn-div " style={{ boxShadow: `8px 8px #B55B52` }}>
              <button
              type="submit"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "17px",
                }}
              >
              Delete Account
              </button>
            </div>
            <div className="btn-div" style={{ boxShadow: `8px 8px #2E8D46` }}>
              <button disabled={isDisabled}
              onClick={handleSubmit}
              type="submit"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "17px",
                }}
                className={`${isDisabled ?"cursor-not-allowed  opacity-60":""}`}
              >
              {isDisabled ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
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

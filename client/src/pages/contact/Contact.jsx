import React, { useState } from "react";
import { MetaData } from "@components/CustomComponents";
import { BACKEND_URL } from "../../core/utils/const";
import { auth } from "../../../firebase";
import axios from "axios";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Contact() {
  const [btnState, setBtnState] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSuccessMsg("");
    setFormData((oldFormData) => {
      return {
        ...oldFormData,
        [id]: value,
      };
    });

    setBtnState(canSubmit());
  };

  const canSubmit = () => {
    return (
      formData.fullName != "" && formData.email != "" && formData.message != ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!canSubmit()) return;
    axios
      .post(`${BACKEND_URL}/contact/post`, {
        recipientEmail: formData.email,
        recipientName: formData.fullName,
        message: formData.message,
      })
      .then((res) => {
        setSuccessMsg("Contact email sent successfully");
        setFormData({ message: "", email: "", fullName: "" });
      })
      .catch((err) => {
        setSuccessMsg("Error submitting contact form: " + err);
        console.log(err);
      });
    // Here, you can perform any actions with the form data,
    // such as saving it to a database or displaying it on the page
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <MetaData path="contact" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "40px", color: "white", margin: "0" }}>
            Contact us{" "}
          </h1>
          <text style={{ fontSize: "20px" }}>
            <br></br> Need to get in touch with us? Fill out the form with your
            inquiry{" "}
          </text>
          <text style={{ textAlign: "center" }}>OR</text>
          <br />
          <text style={{ textAlign: "center" }}>
            {/* <a
              href="https://discord.com/invite/bsbBytBqBc"
              className="link hover:no-underline link-hover hover:text-white text-custom-blue hover:scale-110 transition-all text-lg"
              target="_blank"
              Style={{ fontSize: "26px" }}
            >
              JOIN US
            </a>{" "} */}
            <div className="flex gap-8 lg:gap-3">
              <a
                href="https://www.linkedin.com/company/digitomize"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  size={32}
                  className="fill-white hover:fill-custom-blue"
                />
                <span className="sr-only">linkedin link</span>
              </a>
              <a
                href="https://twitter.com/intent/follow?screen_name=digitomize&tw_p=followbutton"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter
                  size={26}
                  className="fill-white hover:fill-custom-blue"
                />
                <span className="sr-only">twitter link</span>
              </a>
              <a
                href="https://discord.com/invite/bsbBytBqBc"
                className="link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord
                  size={33}
                  className="fill-white hover:fill-custom-blue"
                />
                <span className="sr-only">discord link</span>
              </a>
              <a
                href="https://instagram.com/digitomize"
                className="link hover:no-underline link-hover text-white hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={32}
                  className="stroke-white group-hover:stroke-custom-blue"
                />
                <span className="sr-only">instagram link</span>
              </a>
            </div>
          </text>
        </div>
        <div
          className="mt-2 text-white max-md:text-4xl md:text-6xl flex flex-col w-full mt-5 mx-auto"
          style={{ width: "50%", flex: "2" }}
        >
          <div className="flex flex-col">
            <div className="w-full px-3">
              <label className="label">
                <p>
                  {/* <span className="label-text">{"#include"}</span> */}
                  <span className="label-text text-custom-blue">
                    {"Full Name*:"}
                  </span>
                </p>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="input input-bordered w-full bg-black border-2 border-jet"
                onChange={handleChange}
                value={formData.fullName}
                required
              />
            </div>
            <div className="w-full px-3">
              <label className="label">
                <p>
                  {/* <span className="label-text">{"import"}</span> */}
                  <span className="label-text text-custom-blue">
                    {"Email*:"}
                  </span>
                </p>
              </label>
              <div className="flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black border-2 border-jet">
                <input
                  type="email"
                  id="email"
                  className="bg-transparent border-none w-full input input-bordered"
                  onChange={handleChange}
                  placeholder="Email"
                  value={formData.email}
                  required
                />
              </div>
            </div>
            <div className="w-full px-3">
              <label className="label">
                <p>
                  {/* <span className="label-text">{"#include"}</span> */}
                  <span className="label-text text-custom-blue">
                    {"Message*:"}
                  </span>
                </p>
              </label>
              <textarea
                placeholder="Message"
                id="message"
                className="input input-bordered w-full bg-black border-2 border-jet"
                style={{ height: "200px" }}
                onChange={handleChange}
                required
                value={formData.message}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group min-w-2/5"
            style={{ margin: "20px auto 0 auto", width: "25%" }}
          >
            <span
              className={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[#4285f4] rounded-md group-hover:mt-0 group-hover:ml-0`}
            ></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span
              className={`absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#4285f4] rounded-md opacity-0 group-hover:opacity-100 `}
            ></span>
            <span className="relative text-black transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Send !
            </span>
          </button>
          {successMsg != "" && (
            <div
              style={{
                color: successMsg.includes("Error") ? "red" : "#4caf50",
                fontSize: "20px",
                textAlign: "center",
                paddingTop: "15px",
              }}
            >
              <p>{successMsg}</p>
            </div>
          )}
          {/* <button
            type="submit"
            style={{
              fontSize: "24px",
              width: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#2e58ff",
            }}
            className="text-black rounded-full"
          >
            Send
          </button> */}
          {/* <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <label htmlFor="name" style={{ fontSize: "22px" }}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full bg-black border-2 border-jet"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" style={{ fontSize: "22px" }}>
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input input-bordered w-full bg-black border-2 border-jet"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ fontSize: "22px" }}>
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full bg-black border-2 border-jet"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="message" style={{ fontSize: "22px" }}>
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="input input-bordered w-full bg-black border-2 border-jet"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </form> */}
        </div>
      </div>
    </>
  );
}

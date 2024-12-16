import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useState } from "react";

// import ImageUploader from "../../../components/ImageUploader";
// import { useLoaderData } from 'react-router-dom';
// import { submitUserFormData } from "../../../../api";
// import { toast, ToastContainer } from 'react-toastify';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { MenuItem, Select } from "@mui/material";

function GenderAndDOB({ formData, handleInputChange, dobChange }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
        <div className="flex-1 mt-8">
          <h3 className="text-base font-semibold text-gray-200">
            Date of Birth
          </h3>
          <p className="mt-3 font-light text-sm text-gray-500">
            Kindly provide your date of birth for accurate record-keeping.
          </p>
          {/* <p className="mt-3 font-light text-sm text-gray-500">Click on the avatar to upload a custom one from your files..</p> */}
        </div>

        <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
          <div className="px-6 py-8">
            {/* <div className="sm:w-9/12">
                            <div className="label">
                                <label className="text-xs font-medium text-secondary">Personal pronouns</label>
                            </div>
                            <Select className="w-full"
                                id="gender"
                                name="gender"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    backgroundColor: 'RGB(17, 19, 18)',
                                    fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">
                                    <em>Prefer not to say</em>
                                </MenuItem>
                                <MenuItem value={'He/Him'}>He/Him</MenuItem>
                                <MenuItem value={'She/Her'}>She/Her</MenuItem>
                                <MenuItem value={'They/Them'}>They/Them</MenuItem>
                            </Select>
                        </div> */}
            <div className="sm:w-9/12">
              <div className="label">
                <label className="text-xs font-medium text-secondary">
                  Date of Birth
                </label>
              </div>
              {!formData?.dateOfBirth?.data ? (
                <DatePicker
                  className="text-sm w-full"
                  onChange={dobChange}
                  name="dateOfBirth"
                  id="dateOfBirth"
                  sx={{
                    backgroundColor: "RGB(17, 19, 18)",
                    fontSize: ".875rem",
                    lineHeight: "1.25rem",
                  }}
                />
              ) : (
                <DatePicker
                  value={dayjs(formData?.dateOfBirth?.data)}
                  className="text-sm w-full"
                  onChange={dobChange}
                  name="dateOfBirth"
                  id="dateOfBirth"
                  sx={{
                    backgroundColor: "RGB(17, 19, 18)",
                    fontSize: ".875rem",
                    lineHeight: "1.25rem",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenderAndDOB;

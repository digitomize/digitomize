import TagFacesIcon from "@mui/icons-material/TagFaces";
import Chip from "@mui/material/Chip";
import React from "react";


function Skills({ handleAdd, handleDelete, setNewSkill, newSkill, btnRef, skillData }) {

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <div className="flex-1 mt-8">
                    <h3 className="text-base font-semibold text-gray-200">Select your Tags</h3>
                    <p className="mt-3 font-light text-sm text-gray-500">Enter tags that represent your skills, tools, and preferred roles.</p>
                    {/* <p className="mt-3 font-light text-sm text-gray-500">Please enter one tag at a time in the input box!</p> */}
                </div>

                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div className="px-6 py-8">
                        <div className="sm:w-9/12">
                            <label htmlFor="phoneNumber" className="phone:ml-1 text-xs font-medium text-secondary">Please enter one tag at a time in the input box!</label>
                            <div className="mt-2 flex items-center gap-3">
                                <input
                                    type="text"
                                    name="skills"
                                    id="skills"
                                    style={{ backgroundColor: "RGB(17, 19, 18)" }}
                                    className="placeholder:text-gray-600 border border-jet rounded px-3 py-[10px] w-full text-sm"
                                    placeholder="Example: Mobile Developer, Node.js, etc."
                                    value={newSkill}
                                    maxLength={25}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                />
                                <button onClick={handleAdd}
                                    ref={btnRef}
                                    type="submit"
                                    className="btn btn-outline border-jet hover:bg-jet hover:text-white btn-sm"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="skillchips w-full max-sm:text-sm  max-w-3xl min-h-12 mt-2 flex flex-wrap gap-1">
                                {skillData.length > 0 ? (
                                    skillData.map((data) => {
                                        let icon;
                                        if (data.label === "React") {
                                            icon = <TagFacesIcon />;
                                        }

                                        return (
                                            <div key={data.key} className="max-sm:text-sm my-2  inline-block">
                                                <Chip
                                                    variant="outlined"
                                                    color="primary"
                                                    icon={icon}
                                                    label={data.label}
                                                    onDelete={handleDelete(data)}
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="ml-1 text-xs font-medium text-secondary">No tag added.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Skills;
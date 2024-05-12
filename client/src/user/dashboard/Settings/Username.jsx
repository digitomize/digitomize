import React from 'react'
function Username({ username, handleInputChange, handleSubmit, isDisabled }) {

    return (
        <>
            <div className="noCursor flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <div class="flex-1 mt-8">
                    <h3 class="text-base font-semibold text-gray-200">Change username</h3>
                    <p class="mt-3 font-light text-sm text-gray-500">You can change your username to another username that is not currently in use.</p>
                </div>

                <div className="noCursor flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div class="p-6 sm:w-9/12">
                        <label class="phone:ml-1 mt-5 text-xs font-medium text-secondary" htmlFor="firstName">Username</label>
                        <input style={{ backgroundColor: 'RGB(17, 19, 18)' }}
                            autoComplete="off"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="noCursor placeholder:text-gray-600 border border-jet rounded px-3 py-[10px] w-full text-sm"
                        />
                        <label class="phone:l-1 mt-5 text-xs text-gray-500" htmlFor="firstName">
                            Profile:
                            <span className="noCursor text-gray-400 mx-1">digitomize.com/u/{username}
                            </span>
                        </label>
                    </div>
                </div>
            </div >

            <div className="noCursor flex space-x-20 mt-10">
                <div className="noCursor flex-1 max-phone:hidden phone:block">
                </div>
                <div className="noCursor flex-2">
                    <button disabled={isDisabled} type="submit" onClick={handleSubmit} className="noCursor btn btn-outline border-jet hover:bg-jet hover:text-white">{isDisabled ? "Saving Changes..." : "Save Changes"}</button>
                </div>
            </div>
        </>
    )
}

export default Username;
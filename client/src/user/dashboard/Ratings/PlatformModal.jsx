import * as React from 'react';
import Dialog from '@mui/material/Dialog';



export default function PlatformModal({ btnText = "Connect", platform, handleSubmit, handleInputChangeObjData, formData }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit();
        setOpen(false); // Close the dialog directly intead of calling function
        
    };

    return (
        <React.Fragment>
            {
                platform.active ?
                    <button className="btn btn-outline border-jet hover:bg-jet hover:text-white" onClick={handleClickOpen}>
                        {btnText}
                    </button> :
                    <button className="btn btn-outline border-jet hover:bg-jet hover:text-white" disabled>
                        Coming Soon
                    </button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <div className="sm:w-96 bg-dashboardColor">
                    <div className="border rounded-t-lg border border-jet px-4 py-6 w-full">
                        <div className="flex flex-col items-center mb-2">
                            <div className="rounded-full bg-dashboardDarkerColor p-3">

                                <img src={platform.icon} alt="" className="w-12" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-200 mt-2">{platform.title}</h3>
                            {/* <p className="text-gray-gray1k font-semibold text-sm mt-4 mb-1">{platform.title}</p> */}
                            <p className="font-light text-sm text-gray-500">{platform.subTitle}</p>

                        </div>
                        <div>
                            <div className="border border-jet rounded px-3 py-1 w-full text-sm transition duration-150 ease-in-out flex items-center flex font-light overflow-hidden bg-dashboardDarkerColor">
                                <label htmlFor="Instagram" className="select-none text-gray placeholder-gray-gray4 ">
                                    <div className="flex items-center text-gray-500">
                                        <div className="w-4 h-4 flex items-center justify-center mr-2">
                                            <img alt="Instagram Logo" loading="lazy" width="22" height="22" decoding="async" data-nimg="1" src={platform.icon} />
                                        </div>
                                        {platform.url}
                                    </div>
                                </label>
                                <input autoComplete="off" type="text" className="placeholder:text-gray-600 outline-none border-0 rounded-md font-medium w-full bg-dashboardDarkerColor text-sm px-0" value={formData[platform.name]?.username} placeholder="" onChange={handleInputChangeObjData} name={platform.name} id={platform.name} />
                            </div>
                        </div>
                        <label className="ml-1 text-xs font-medium text-secondary">{platform.note}</label>

                    </div>
                    <div className="flex items-center px-4 py-3 rounded-b-lg border-t justify-between shadow bg-dashboardColor border border-jet">
                        <button className="btn btn-ghost hover:text-white btn-sm" type="button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn-outline border-jet hover:bg-jet hover:text-white btn-sm" type="submit" onClick={handleModalSubmit}>
                            Save</button>
                    </div>

                </div>
            </Dialog>
        </React.Fragment >
    );
}
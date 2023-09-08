import React from 'react'

export default function NewUserProfile() {
    return (
        <>
            <div className="mt-4 mx-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex justify-center rounded-md ">
                        <div className='flex flex-col pt-4 ps-4 items-start w-full rounded-md bg-[#191919] min-h-screen'>
                            <div className="flex flex-col md:flex-row justify-center md:items-center gap-3" >
                                <div className='Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full'>
                                    <img src="https://www.svgrepo.com/show/446517/avatar.svg" alt="avatar" />
                                </div>
                                <div className='ms-2 flex flex-col'>
                                    <h2 className='text-2xl normal-case'>{`Anurag Sharma`}</h2>
                                    <p className='text-gray-400'>sharma.anurag0225@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center rounded-md">
                        <div className='flex flex-col pt-4 ps-4 items-start w-full rounded-md bg-[#191919] min-h-screen'>

                        </div>
                    </div>
                    <div className="flex justify-center rounded-md">
                        <div className='flex flex-col pt-4 ps-4 items-start w-full rounded-md bg-[#191919] min-h-screen'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

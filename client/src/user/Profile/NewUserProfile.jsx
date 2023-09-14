import React from 'react'
import Timeline from './components/Timeline'

export default function NewUserProfile() {
    return (
        <>
            <div className="mt-4 mx-4">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                    <div className="flex flex-col pt-4 rounded-md bg-[#191919] w-full min-h-screen">
                        <div className='flex justify-center rounded-md '>
                            <div className="flex flex-col  justify-center items-center gap-3" >
                                <div className='Ellipse3 w-[60px] h-[60px] bg-pink-700 rounded-full'>
                                    <img src="https://www.svgrepo.com/show/446517/avatar.svg" alt="avatar" />
                                </div>
                                <div className='ms-2'>
                                    <h2 className='text-3xl text-center normal-case'>{`Anurag Sharma`}</h2>
                                    <p className='text-center md:text-left text-gray-400'>sharma.anurag0225@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mt-12 items-center md:px-4 gap-2'>
                            <h2 className='lowercase text-2xl font-medium text-blue-500'>About myself :</h2>
                            <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt recusandae pariatur quos vitae in vel, illo odit odio molestias voluptatibus modi quod dolore necessitatibus nisi maiores autem hic magni!</p>
                        </div>
                        <div className='flex flex-col mt-12 items-center md:px-4 gap-2'>
                            <h2 className='lowercase text-2xl font-medium text-blue-500'>Education :</h2>
                            <div className='mt-4 ps-4'>
                                <Timeline />
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

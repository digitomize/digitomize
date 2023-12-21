import React from 'react'

const ComingSoonLoader = ({ value }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center antialiased">
                <h1 className="my-0 text-white text-4xl text-center capitalize">
                    <span style={{ textShadow: '5px 5px 5px rgba(21, 132, 255, 0.9)' }}>
                        {value} {''}
                    </span>
                    Coming Soon
                </h1>
                {/* <progress className="progress w-56 mt-12"></progress> */}
            </div>
        </div>
    )
}

export default ComingSoonLoader
import React from 'react'
import { auth } from '../../../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SignoutButton({ btnName, isDisabled, onClickFunction }) {

    return (
        <div className="w-full flex justify-end px-4 py-4">
            <button onClick={onClickFunction} disabled={isDisabled} className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
                <span className="relative text-black transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">{btnName}</span>
            </button>
        </div>

    )
}

export default SignoutButton
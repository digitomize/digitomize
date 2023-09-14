import React from 'react'

function Timeline() {
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2022-2026</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Guru Gobind Singh Indraprastha University, Delhi</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">B.Tech in Computer Science</p>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">CGPA - 8.44</p>

            </li>
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2019-2021</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delhi Public School, Ranchi</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">High School Diploma</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">CGPA - 87%</p>
            </li>

        </ol>

    )
}

export default Timeline
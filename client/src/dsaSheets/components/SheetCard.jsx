import React from 'react'

const SheetCard = ({ name, link }) => {
    return (
        <div className='bg-eerie-black-2 border border-jet rounded-xl p-4'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-2xl normal-case text-[#F0ECE5] font-bold tracking-tight'>{name}</h3>
                <a href={link} className='text-custom-blue hover:text-custom-blue-light'>View Sheet</a>
            </div>
        </div>
    )
}

export default SheetCard
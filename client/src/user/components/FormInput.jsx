import React from 'react'

const FormInput = ({ labelText, placeholderText, type, inputClass, labelClass, textArea, name, value, handleInputChangeObjData, handleInputChange }) => {
    if (textArea) {
        return (
            <div className="form-control w-full">
                <label className="label">
                    <span className={`label-text ${labelClass ? labelClass : null}`}>{labelText}</span>
                </label>
                <textarea name={name} value={value} onChange={handleInputChangeObjData || handleInputChange} className={`textarea textarea-bordered ${inputClass ? inputClass : null}`} placeholder={`${placeholderText}`}></textarea>
            </div>

        )
    }
    else {

        return (
            <div className="form-control w-full">
                <label className="label">
                    <span className={`label-text ${labelClass ? labelClass : null}`}>{labelText}</span>
                </label>
                <input type={`${type}`} name={name} value={value} onChange={handleInputChange || handleInputChangeObjData} placeholder={`${placeholderText}`} className={`input input-bordered w-full md:w-[75%] min-w-full ${inputClass ? inputClass : null}`} />
            </div>
        )
    }
}

export default FormInput
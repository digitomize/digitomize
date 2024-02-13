function SubmitBtn({handleSubmit}) {
    return (
        <>
            <div className="flex space-x-20 mt-10">

                <div className="flex-1 block">

                </div>
                <div className="flex-2">

                    <button type="submit" onClick={handleSubmit} className="btn btn-outline border-jet hover:bg-jet hover:text-white">Save changes</button>
                </div>
            </div>
        </>
    )
}

export default SubmitBtn
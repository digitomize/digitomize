function SubmitBtn({ handleSubmit }) {
    return (
        <>
            <div className="noCursor flex space-x-20 mt-10">

                <div className="noCursor flex-1 max-phone:hidden phone:block">

                </div>
                <div className="noCursor flex-2">

                    <button type="submit" onClick={handleSubmit} className="noCursor btn btn-outline border-jet hover:bg-jet hover:text-white">Save changes</button>
                </div>
            </div>
        </>
    )
}

export default SubmitBtn
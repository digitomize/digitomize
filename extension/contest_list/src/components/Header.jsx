import logo from "../assets/digitomizeLogo.png";
function Header() {
    return (
        <>
            <div className="noCursor bg-cardsColor ">

                <img src={logo} alt="Logo" className="noCursor w-40 mx-auto p-4" />

                <div className="noCursor text-white text-xl mx-auto text-center">
                    <span>One place for all your</span>
                    <span className="noCursor block mt-1 relative">
                        <span className="noCursor bg-digitomize-bg px-1 relative">
                            <span className="noCursor relative z-10">
                                coding platforms
                            </span>
                        </span>{" "}
                        needs
                    </span>{" "}
                </div>
                <div className="noCursor divider w-3/4 mx-auto my-4"></div>
            </div>
        </>
    )
}

export default Header;
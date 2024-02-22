import logo from "../assets/digitomizeLogo.png";
function Header() {
    return (
        <>
            <div className="bg-cardsColor my-2">

                <img src={logo} alt="Logo" className="w-40 mx-auto mt-4 p-4" />

                <div className="text-white text-xl mx-auto text-center">
                    <span>One place for all your</span>
                    <span className="block mt-1 relative">
                        <span className="bg-digitomize-bg px-1 relative">
                            <span className="relative z-10">
                                coding platforms
                            </span>
                        </span>{" "}
                        needs
                    </span>{" "}
                </div>
                <div className="divider w-3/4 mx-auto my-4"></div>
            </div>
        </>
    )
}

export default Header;
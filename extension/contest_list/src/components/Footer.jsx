// import { dynamicLogo } from "../assets/D_white.svg";

// import GitHubButton from "react-github-btn";
import { FaLinkedin, FaDiscord, FaInstagram, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const copyrightDate = new Date().getFullYear();

export default function Footer() {
    return (
        <>
            <footer className="noCursor w-80 bg-cardsColor p-4 rounded-b-xl mx-auto">
                <div className="noCursor footer">
                    <nav className="noCursor flex mx-auto">
                        <div className="noCursor flex gap-8 lg:gap-3 items-center p-2">
                            <a
                                href="https://digitomize.com"
                                className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGlobe
                                    size={18}
                                    className="noCursor fill-white hover:fill-custom-blue"
                                />
                                <span className="noCursor sr-only">website link</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/digitomize"
                                className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin
                                    size={20}
                                    className="noCursor fill-white hover:fill-custom-blue"
                                />
                                <span className="noCursor sr-only">linkedin link</span>
                            </a>
                            <a
                                href="https://twitter.com/intent/follow?screen_name=digitomize&tw_p=followbutton"
                                className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaXTwitter
                                    size={20}
                                    className="noCursor fill-white hover:fill-custom-blue"
                                />
                                <span className="noCursor sr-only">twitter link</span>
                            </a>
                            <a
                                href="https://discord.com/invite/bsbBytBqBc"
                                className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDiscord
                                    size={20}
                                    className="noCursor fill-white hover:fill-custom-blue"
                                />
                                <span className="noCursor sr-only">discord link</span>
                            </a>
                            <a
                                href="https://instagram.com/digitomize"
                                className="noCursor link hover:no-underline link-hover text-white hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram
                                    size={20}
                                    className="noCursor stroke-white group-hover:stroke-custom-blue"
                                />
                                <span className="noCursor sr-only">instagram link</span>
                            </a>
                        </div>
                    </nav>
                </div>
                <p className="noCursor text-center w-full text-xs">
                    &copy; {copyrightDate} <a href="https://digitomize.com"> Digitomize</a>.{" "}
                    <a
                        href="https://github.com/digitomize/digitomize/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="noCursor underline"
                    >
                        MIT Licensed
                    </a>
                    . Contribute on{" "}
                    <a
                        href="https://github.com/digitomize/digitomize"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="noCursor underline"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </footer >
        </>
    );
}

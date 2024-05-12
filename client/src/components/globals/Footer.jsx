import { dynamicLogo } from "../AllAssets";
import GitHubButton from "react-github-btn";
import { FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const copyrightDate = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="noCursor font-['Geist'] bg-cardsColor pb-10 mt-6">
      <div className="noCursor footer lg:max-w-7xl mx-auto p-10 text-base-content md:items-center flex flex-col md:flex-row justify-center items-start">
        <aside className="noCursor flex flex-col items-center justify-center mx-auto sm:mx-0 sm:ml-0 md:mr-8 text-center sm:text-start mb-4 sm:mb-0">
          <Link
            to="/home"
            className="noCursor flex flex-col items-center justify-center"
          >
            <img
              src={dynamicLogo}
              alt="logo"
              className="noCursor max-w-[7rem] max-h-[7rem] mb-2"
            />
            <h2 className="noCursor text-2xl my-3">Digitomize</h2>
          </Link>

          <p className="noCursor text-base-content text-md max-w-[230px] mb-5">
            Explore upcoming coding contests and dynamically create developer
            portfolios
          </p>

          <GitHubButton
            href="https://github.com/digitomize/digitomize"
            data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light;"
            data-size="large"
            data-show-count="true"
            aria-label="Star digitomize/digitomize on GitHub"
          >
            Star
          </GitHubButton>

          <div className="noCursor flex justify-center mt-2">
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg"
                alt="Deploys by Netlify"
                className="noCursor w-[18] h-10"
              />
            </a>
          </div>
        </aside>

        <div className="noCursor lg:flex-1 flex flex-col sm:flex-row sm:flex-wrap mx-auto justify-between gap-8 mb-4 sm:mb-0">
          <nav className="noCursor flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="noCursor text-white font-medium text-2xl mb-2">
              Competitions
            </header>
            <a
              href="/contests"
              className="noCursor link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Contests
            </a>
            <a
              href="/challenges"
              className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Challenges
            </a>
          </nav>
          <nav className="noCursor hidden sm:!flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="noCursor text-white font-medium text-2xl mb-2">
              Opportunities
            </header>
            <a
              href="/hackathons"
              className="noCursor link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Hackathons
            </a>
            <a
              href="/internships"
              className="noCursor link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Internship
            </a>
            <a
              href="/jobs"
              className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Jobs
            </a>
          </nav>
          <nav className="noCursor flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="noCursor text-white font-medium text-2xl mb-2">
              Connect
            </header>
            <a
              href="/feedback"
              className="noCursor link link-hover hover:no-underline hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Feedback
            </a>
            <a
              href="/contact"
              className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              About Digitomize
            </a>
            <a
              href="https://discord.com/invite/bsbBytBqBc"
              className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg"
            >
              Join our Discord
            </a>
          </nav>
          <nav className="noCursor flex justify-center items-center sm:!items-start flex-col gap-3 w-full sm:!w-[45%] xl:!w-fit">
            <header className="noCursor text-white font-medium text-2xl mb-2">
              Social
            </header>
            <div className="noCursor flex gap-8 lg:gap-3">
              <a
                href="https://www.linkedin.com/company/digitomize"
                className="noCursor link hover:no-underline link-hover hover:text-custom-blue hover:scale-110 transition-all text-lg m-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  size={32}
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
                  size={26}
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
                  size={33}
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
                  size={32}
                  className="noCursor stroke-white group-hover:stroke-custom-blue"
                />
                <span className="noCursor sr-only">instagram link</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <p className="noCursor text-center w-full text-sm">
        &copy; {copyrightDate} Digitomize.{" "}
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
    </footer>
  );
}
